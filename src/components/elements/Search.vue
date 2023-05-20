<template>
    <div class="demo-image">
        <el-radio-group v-model="radio1" @change="onChange">
            <div>
            <el-radio v-for="index in [1, 2, 3, 4, 5]" :label="index" style="width: 200px; height: 200px">
                <div class="block">
                <!-- <span class="demonstration">{{ fit }}</span> -->
                <el-image style="width: 200px; height: 200px" :src="url" fit="contain" />
                </div>
            </el-radio>                
            </div>
            <div>
            <el-radio v-for="index in [6, 7, 8, 9, 10]" :label="index" style="width: 200px; height: 200px">
                <div class="block">
                <!-- <span class="demonstration">{{ fit }}</span> -->
                <el-image style="width: 200px; height: 200px" :src="url" fit="contain" />
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
</template>

<script setup lang = 'ts'>
import { ref } from 'vue'
import axios from 'axios'

const currentPage3 = ref(1)
const pageSize3 = ref(100)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const radio1 = ref(1)
const emits = defineEmits(['title', 'abstract', 'keyword'])

const onChange = () => {
    axios
    .get("", {
        params: {
            
        }
    })
    .then(function (response) {
        console.log(response.data);
        emits('title', response.data.title)
        emits('abstract', response.data.abstract)
        emits('keyword', response.data.keyword)
    })
    .catch(function (error) {
        console.log(error);
    });
}

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
// const fits = ['fill', 'contain', 'cover', 'none', 'scale-down']
// const fits = [1,'scale-down', 2,'scale-down', 3,'scale-down', 4,'scale-down', 5,'scale-down']
const url =
  'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
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
</style>