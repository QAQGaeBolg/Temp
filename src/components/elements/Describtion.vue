<template>
    <h3 v-bind = "attrs1">{{ props.title }}</h3>
    <table class="post-table">
        <tr>
            <td class="post-td-title">Keywords</td>
            <td class="post-td">{{ props.keywords }}</td>
        </tr>
        <tr>
            <td class="post-td-title">Abstract</td>
            <td class="post-td">{{ props.abstract }}</td>
        </tr>
    </table>
</template>

<script setup lang = 'ts'>
import { ref, useAttrs } from 'vue'

interface Post {
  title: string
  keywords: string
  abstract: string
}
const props = withDefaults(defineProps<Post>(), {
  title: "",
  keywords: "",
  abstract: ""
});
const attrs1 = useAttrs()
</script>

<style scoped>
.post-table {
    border: 1px solid #ebeef5;
}
.post-td-title {
    border: 1px solid #ebeef5;
    background-color: #f5f7fa;
    min-width: 200px;
    height: 50px;
    text-align: center;
}
.post-td {
    border: 1px solid #ebeef5;
    min-width: 500px;
    height: 50px;
    text-align: center;
}
</style>