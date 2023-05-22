<template>
    <div class="demo-image">
        <el-radio-group v-model="radio1" @change="onChange">
            <div class="blank">
            <el-radio v-for="index in [1, 2, 3, 4, 5]" :label="index" style="width: 200px; height: 200px">
                <div class="block">
                <!-- <span class="demonstration">{{ fit }}</span> -->
                <el-image style="width: 200px; height: 200px" :src="url[index - 1]" fit="contain" />
                </div>
            </el-radio>                
            </div>
            <div class="blank">
            <el-radio v-for="index in [6, 7, 8, 9, 10]" :label="index" style="width: 200px; height: 200px">
                <div class="block">
                <!-- <span class="demonstration">{{ fit }}</span> -->
                <el-image style="width: 200px; height: 200px" :src="url[index - 1]" fit="contain" />
                </div>
            </el-radio>                
            </div>
        </el-radio-group>        
    </div>
  <div class="demo-pagination-block">
    <el-pagination
      v-model:current-page="currentPage3"
      v-model:page-size="pageSize3"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="prev, pager, next, jumper"
      :total="1000"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
  <Describtion v-bind:title="title" v-bind:keywords="keywords" v-bind:abstract="abstract"/>  
</template>

<script setup lang = 'ts'>
import { ref, reactive } from 'vue'
import axios from 'axios'
import Describtion from './Describtion.vue'
axios.defaults.baseURL = ''
axios.defaults.crossDomain = true
const currentPage3 = ref(1)
const pageSize3 = ref(100)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const radio1 = ref(1)
const title = ref("Post Title")
const keywords = ref("Keywords")
const abstract = ref("Abstract")
const _response = reactive({})
let url = reactive(['', '', '', '', '', '', '', '', '', ''])
const tempurl =
  'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
const onChange = () => {
  axios
  .get("http://10.25.203.28:8080/view", {
      params: {
          page: currentPage3.value
      }
  })
  .then(function (response) {
      console.log(response.data)
      console.log(response.data[0])
      _response = response
      url = []
      for (let i = 0; i < response.data.length; i++) {
        console.log(i)
        console.log(response.data[i].file)
        url.push('data:image/png;base64,' + response.data[i].file)
      }
      title.value = response.data[currentPage3.value - 1].title
      keywords.value = response.data[currentPage3.value - 1].topic
      abstract.value = response.data[currentPage3.value - 1].summary
  })
  .catch(function (error) {
      console.log(error)
  });
}

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
  title.value = _response.data[currentPage3.val - 1].title
  keywords.value = _response.data[currentPage3.val - 1].keywords
  abstract.value = _response.data[currentPage3.val - 1].abstract
}
// const fits = ['fill', 'contain', 'cover', 'none', 'scale-down']
// const fits = [1,'scale-down', 2,'scale-down', 3,'scale-down', 4,'scale-down', 5,'scale-down']
onChange(currentPage3.value)
</script>

<style scoped>
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
.demo-image .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 20%;
  box-sizing: border-box;
  vertical-align: top;
}
.demo-image .block:last-child {
  border-right: none;
}
.demo-image .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
.blank {
  padding: 20px 0;
}
</style>