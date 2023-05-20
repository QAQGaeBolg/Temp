<template>
    <el-upload
      class="avatar-uploader"
      action=""
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  import { Plus } from '@element-plus/icons-vue'
  
  const imageUrl = ref('')
  
  const handleAvatarSuccess = (
    response: any,
    uploadFile: any
  ) => {
    response
    console.log("onSuccess")
    imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  }
  
  const beforeAvatarUpload = (rawFile: any) => {
    if (rawFile.type !== 'image/jpeg') {
      window.Error('Avatar picture must be JPG format!')
      return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        window.Error('Avatar picture size can not exceed 2MB!')
      return false
    }
    return true
  }
  </script>
  
  <style scoped>
  .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
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

<!-- <template>
    <el-upload action=""
               :http-request="handleRequest"
               :show-file-list="false">
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          <template #tip>
          <div v-if="!imageUrl"
              class="el-upload__tip">只能上传 jpg/png 文件</div>
          </template>
      </el-upload>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  import { Plus } from '@element-plus/icons-vue'
  import axios from 'axios'
  const imageUrl = ref('')
  const handleRequest = (e: any) => {
      const fd = new FileReader()
      fd.readAsDataURL(e.file)
      // 将文件转化为base64格式传入后端
      fd.onload = () => {
      axios
        .post('http://127.0.0.1:7001/upload', {
          imgUrl: fd.result,
        })
        .then((res) => {
          imageUrl.value = res.data.data
        })
      }
      // 上传blob格式
      axios
      .post('http://127.0.0.1:7001/upload', {
          imgUrl: URL.createObjectURL(e.file),
      })
      .then((res) => {
          imageUrl.value = res.data.data
      })
  }
  
  </script>
  
  <style scoped>
  .avatar-uploader .avatar {
      width: 178px;
      height: 178px;
      display: block;
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
  </style> -->