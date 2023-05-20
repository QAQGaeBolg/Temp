<template>
    <h3>{{ title }}</h3>
    <table class="post-table">
        <tr>
            <td class="post-td-title">Keyword</td>
            <td class="post-td"></td>
        </tr>
        <tr>
            <td class="post-td-title">Abstract</td>
            <td class="post-td"></td>
        </tr>
    </table>
</template>

<script setup lang = 'ts'>
import { ref } from 'vue'
const title = ref("Post Title")
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