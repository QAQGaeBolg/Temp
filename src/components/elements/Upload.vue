<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action="#"
      :headers="headers"
      list-type="picture"
      :http-request="uploadAction"
      :on-exceed="handleExceed"
      :before-upload="beforeUpload"
      :file-list="fileListCopy.data"
      :on-change="handleChange"
      ref="upload"
      :multiple="false"
      :data="{url: imageUrl}"
      :show-file-list="false"
      :limit="1"
      name="file"
      :auto-upload="false"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    <el-button type="success" @click="onClickSubmit" class="success-button">上传</el-button>
  </div>
  <div class="cut">
   <vue-cropper
     ref="cropper"
     :img="data1.option.img"
     :output-size="data1.option.size"
     :output-type="data1.option.outputType"
     :info="true"
     :full="data1.option.full"
     :fixed="data1.fixed"
     :fixed-number="data1.fixedNumber"
     :can-move="data1.option.canMove"
     :can-move-box="data1.option.canMoveBox"
     :fixed-box="data1.option.fixedBox"
     :original="data1.option.original"
     :auto-crop="data1.option.autoCrop"
     :auto-crop-width="data1.option.autoCropWidth"
     :auto-crop-height="data1.option.autoCropHeight"
     :center-box="data1.option.centerBox"
     @real-time="realTime"
     :high="data1.option.high"
     @img-load="imgLoad"
     mode="cover">
   </vue-cropper>
   <!--div class="show-preview" :style="{'width': data1.previews.w + 'px', 'height': data1.previews.h + 'px',  'overflow': 'hidden', 'margin': '5px'}">
     <div :style="data1.previews.div">
       <img :src="data1.previews.url" :style="data1.previews.img">
     </div>
   </div-->
 </div>
 <div class="test-button">
   <button @click="changeImg" class="btn">changeImg</button>
   <label class="btn" for="uploads">upload</label>
   <input
     type="file"
     id="uploads"
     style="position:absolute; clip:rect(0 0 0 0);"
     accept="image/png, image/jpeg, image/gif, image/jpg"
     @change="uploadImg($event, 1)"
   >
   <button @click="startCrop" v-if="!data1.crap" class="btn">开始</button>
   <button @click="stopCrop" v-else class="btn">结束</button>
   <button @click="clearCrop" class="btn">清空</button>
   <button @click="refreshCrop" class="btn">刷新</button>
   <button @click="changeScale(1)" class="btn">放大</button>
   <button @click="changeScale(-1)" class="btn">缩小</button>
   <button @click="rotateLeft" class="btn">向右旋转90</button>
   <button @click="rotateRight" class="btn">向左旋转90</button>
   <button @click="finish('base64')" class="btn">预览(base64)</button>
   <button @click="finish('blob')" class="btn">预览(blob)</button>
   <a @click="down('base64')" class="btn">下载(base64)</a>
   <a @click="down('blob')" class="btn">下载(blob)</a>
   <div style="display:block; width: 100%;color: #000;">
     <label class="c-item">
       <span>上传图片是否显示原始宽高 (针对大图 可以铺满)</span>
       <input type="checkbox" v-model="data1.option.original">
       <span>original: {{ data1.option.original}}</span>
     </label>
     <label class="c-item">
       <span>能否拖动图片</span>
       <input type="checkbox" v-model="data1.option.canMove">
     </label>
     <label class="c-item">
       <span>能否拖动截图框</span>
       <input type="checkbox" v-model="data1.option.canMoveBox">
       <span>canMoveBox: {{ data1.option.canMoveBox}}</span>
     </label>
     <label class="c-item">
       <span>截图框固定大小</span>
       <input type="checkbox" v-model="data1.option.fixedBox">
       <span>fixedBox: {{ data1.option.fixedBox}}</span>
     </label>
     <label class="c-item">
       <span>是否输出原图比例的截图</span>
       <input type="checkbox" v-model="data1.option.full">
       <span>full: {{ data1.option.full}}</span>
     </label>
     <label class="c-item">
       <span>是否自动生成截图框</span>
       <input type="checkbox" v-model="data1.option.autoCrop">
       <span>autoCrop: {{ data1.option.autoCrop}}</span>
     </label>
     <label class="c-item">
       <span>是否根据dpr生成适合屏幕的高清图片</span>
       <input type="checkbox" v-model="data1.option.high">
       <span>high: {{ data1.option.high}}</span>
     </label>
     <label class="c-item">
       <span>截图框是否限制在图片里(只有在自动生成截图框时才能生效)</span>
       <input type="checkbox" v-model="data1.option.centerBox">
       <span>centerBox: {{ data1.option.centerBox}}</span>
     </label>
     <label class="c-item">
       <p>输出图片格式</p>
       <label>jpg
         <input type="radio" name="type" value="jpeg" v-model="data1.option.outputType">
       </label>
       <label>png
         <input type="radio" name="type" value="png" v-model="data1.option.outputType">
       </label>
       <label>webp
         <input type="radio" name="type" value="webp" v-model="data1.option.outputType">
       </label>
     </label>
   </div>
 </div>
  <Describtion v-bind:title="title" v-bind:keywords="keywords" v-bind:abstract="abstract"/>  
</template>

<script lang="ts" setup>
import { ref, reactive, triggerRef } from 'vue'
import { Delete, Plus, ZoomIn } from '@element-plus/icons-vue'
import Describtion from './Describtion.vue'
import 'vue-cropper/dist/index.css'
//组件中使用
import { VueCropper }  from "vue-cropper";
import axios from 'axios'
const data1 = reactive({
      model: false,
      modelSrc: '',
      crap: false,
      previews: {},
      lists: [
        {
          img: 'https://qn-qn-kibey-static-cdn.app-echo.com/goodboy-weixin.PNG'
        },
        {
          img: 'https://avatars2.githubusercontent.com/u/15681693?s=460&v=4'
        }
      ],
      option: {
        // 裁剪图片的地址
        img: 'https://qn-qn-kibey-static-cdn.app-echo.com/goodboy-weixin.PNG',
        // 裁剪生成图片的质量
        size: 1,
        // 输出原图比例截图 props名full
        full: false,
        // 裁剪生成图片的格式
        outputType: 'png',
        // 上传图片是否可以移动
        canMove: true,
        // 固定截图框大小 不允许改变
        fixedBox: false,
        // 上传图片按照原始比例渲染
        original: false,
        // 截图框能否拖动
        canMoveBox: true,
        // 是否默认生成截图框
        autoCrop: false,
        // 只有自动截图开启 宽度高度才生效
        // 默认生成截图框宽度
        autoCropWidth: 200,
        // 默认生成截图框高度
        autoCropHeight: 150,
        // 截图框是否被限制在图片里面
        centerBox: false,
        // 是否按照设备的dpr 输出等比例图片
        high: true
      },
      show: true,
      // 是否开启截图框宽高固定比例
      fixed: false,
      // 截图框的宽高比例
      fixedNumber: [1, 2],
      // 裁剪框的大小信息
      info: true,
      // canScale 图片是否允许滚轮缩放
      canScale: true,
      // infoTrue  true 为展示真实输出图片宽高 false 展示看到的截图框宽高:
      infoTrue: true,
      // maxImgSize  限制图片最大宽度和高度
      maxImgSize: 2000,
      // enlarge 图片根据截图框输出比例倍数
      enlarge: 1,
      // mode  图片默认渲染方式
      mode: 'contain'
    }
)
const cropper = ref()

const changeImg = () => {
      data1.option.img = data1.lists[~~(Math.random() * data1.lists.length)].img
    }
const startCrop = () => {
      // start
      data1.crap = true
      cropper.value.startCrop()
    }
const stopCrop = () => {
      //  stop
      data1.crap = false
      cropper.value.stopCrop()
    }
const clearCrop = () => {
      // clear
      cropper.value.clearCrop()
    }
const refreshCrop = () => {
      // clear
      cropper.value.refresh()
    }
const changeScale = (num) => {
      num = num || 1
      cropper.value.changeScale(num)
    }
const rotateLeft = () => {
      cropper.value.rotateLeft()
    }
const rotateRight = () => {
      cropper.value.rotateRight()
    }
const finish = (type) => {
      // 输出
      // var test = window.open('about:blank')
      // test.document.body.innerHTML = '图片生成中..'
      if (type === 'blob') {
        cropper.value.getCropBlob((data) => {
          console.log(data)
          var img = window.URL.createObjectURL(data)
          data1.model = true
          data1.modelSrc = img
        })
      } else {
        cropper.value.getCropData((data) => {
          data1.model = true
          data1.modelSrc = data
        })
      }
    }
    // 实时预览函数
const realTime = (data) => {
      data1.previews = data
      // data1.$emit('', data1.previews)
      console.log(data)
    }

const finish2 = (type) => {
      data1.$refs.cropper2.getCropData((data) => {
        data1.model = true
        data1.modelSrc = data
      })
    }
const finish3 = (type) => {
      data1.$refs.cropper3.getCropData((data) => {
        data1.model = true
        data1.modelSrc = data
      })
    }
const down = (type) => {
      // event.preventDefault()
      var aLink = document.createElement('a')
      aLink.download = 'demo'
      // 输出
      if (type === 'blob') {
        cropper.value.getCropBlob((data) => {
          data1.downImg = window.URL.createObjectURL(data)
          aLink.href = window.URL.createObjectURL(data)
          aLink.click()
        })
      } else {
        cropper.value.getCropData((data) => {
          data1.downImg = data
          aLink.href = data
          aLink.click()
        })
      }
    }
const uploadImg = (e, num) => {
      // 上传图片
      // data1.option.img
      var file = e.target.files[0]
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
        return false
      }
      var reader = new FileReader()
      reader.onload = (e) => {
        let data
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        if (num === 1) {
          data1.option.img = data
        } else if (num === 2) {
          data1.example2.img = data
        }
      }
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file)
    }
const imgLoad = (msg) => {
      console.log(msg)
    }

const title = ref("Post Title")
const keywords = ref("Keywords")
const abstract = ref("Abstract")
const imageUrl = ref('')
const dialogVisible = ref(false)

const previewVisible = ref(false);
const dialogImageUrl = ref('');
const fileListCopy = reactive({
  data: []
});
const onece = ref(false);
const myChangeFile = ref('');
const changeFileIndex = ref(-1);
const uploadImgArr = reactive({
  data: []
});
const headers = reactive({'Content-Type': 'multipart/form-data'});
const upload = ref()
// 文件上传数量限制
const handleExceed = (files, fileList) => {
  console.log(files)
  console.log(fileList)
  handleChange(files[0], fileList, true)
}

// 上传请求
const uploadAction = (opt) => {
  let formdata = new FormData()
  fileListCopy.data.forEach(
    (val, index) => {
      formdata.append("file", val.raw);
    }
  )
  axios
  .post("http://10.25.203.28:8080/upload", formdata)
  .then((responce) => {
    console.log(response.data)
  })
  .catch((er) => {
    console.log(er)
  })
}
// 格式大小的限制
const beforeUpload = (file) => {
  let isJPG = false,
  fileType = file.type.split('/')[0];
  if(file.type === "image/jpeg" || file.type === "image/png") {
    isJPG = true;
  } else {
    isJPG = false;
  }
  const isLt2M = file.size / 1024 / 1024;

  if (fileType != 'image' || isLt2M > 2) {
    console.error("请上传2M以内的图片文件!");
    return false
  }
  return true;
};
const handleChange = (file, fileList, exceed=false) => {
  console.log("change")
  console.log(file)
  console.log(fileList)
  fileListCopy.data = [file]
  // imageUrl.value = exceed ? URL.createObjectURL(new Blob([file])) : file.url
  // console.log(imageUrl.value)
  data1.option.img = exceed ? URL.createObjectURL(new Blob([file])) : file.url
  // dialogVisible.value = true
}
const onClickSubmit = () => {
  upload.value.submit()
  cropper.value.getCropBlob((data) => {
    imageUrl.value = URL.createObjectURL(data)
  })
}
</script>

<style scoped>
.avatar-uploader {
  display: inline;
}
.avatar-uploader .avatar {
  width: 100%;
  height: 100%;
  display: block;
}
.success-button {
  width: 80px;
  height: 50px;
  font-size: 22px;
  margin-left: 50px;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
  }
  .cut {
    width: 500px;
    height: 500px;
    margin: 30px auto;
  }
  .c-item {
    max-width: 800px;
    margin: 10px auto;
    margin-top: 20px;
  }
  .content {
    margin: auto;
    max-width: 1200px;
    margin-bottom: 100px;
  }
  .test-button {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
  }
  .btn {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #c0ccda;
    color: #1f2d3d;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin:20px 10px 0px 0px;
    padding: 9px 15px;
    font-size: 14px;
    border-radius: 4px;
    color: #fff;
    background-color: #50bfff;
    border-color: #50bfff;
    transition: all .2s ease;
    text-decoration: none;
    user-select: none;
  }
  .des {
    line-height: 30px;
  }
  code.language-html {
    padding: 10px 20px;
    margin: 10px 0px;
    display: block;
    background-color: #333;
    color: #fff;
    overflow-x: auto;
    font-family: Consolas, Monaco, Droid, Sans, Mono, Source, Code, Pro, Menlo, Lucida, Sans, Type, Writer, Ubuntu, Mono;
    border-radius: 5px;
    white-space: pre;
  }
  .show-info {
    margin-bottom: 50px;
  }
  .show-info h2 {
    line-height: 50px;
  }
  .title {
    display: block;
    text-decoration: none;
    text-align: center;
    line-height: 1.5;
    margin: 20px 0px;
    background-image: -webkit-linear-gradient(left,#3498db,#f47920 10%,#d71345 20%,#f7acbc 30%,#ffd400 40%,#3498db 50%,#f47920 60%,#d71345 70%,#f7acbc 80%,#ffd400 90%,#3498db);
    color: transparent;
    -webkit-background-clip: text;
    background-size: 200% 100%;
    animation: slide 5s infinite linear;
    font-size: 40px;
  }
  .test {
    height: 500px;
  }
  .model {
    position: fixed;
    z-index: 10;
    width: 100vw;
    height: 100vh;
    overflow: auto;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
  }
  .model-show {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
  }
  .model img {
    display: block;
    margin: auto;
    max-width: 80%;
    user-select: none;
    background-position: 0px 0px, 10px 10px;
    background-size: 20px 20px;
    background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%),linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);
  }
  .c-item {
    display: block;
    user-select: none;
  }
  @keyframes slide {
    0%  {
      background-position: 0 0;
    }
    100% {
      background-position: -100% 0;
    }
  }
</style>