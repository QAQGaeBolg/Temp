<template>
  <TopicModel/>
</template>

<script setup lang="ts">
import TopicModel from './components/TopicModel.vue';

</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
:deep(.el-header){
  --el-header-padding: 0 0;
}
:deep(.el-footer){
  --el-footer-padding: 0 0;
  --el-footer-height: 150px;
}
</style>
