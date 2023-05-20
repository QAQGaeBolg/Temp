<template>
    <el-scrollbar>
        <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        @select="handleSelect"
        >
        <!-- <el-sub-menu index="1">
            <template #title>
            <el-icon><location /></el-icon>
            <span>Navigator One</span>
            </template>
            <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
        </el-sub-menu> -->
        <el-menu-item index="2">
            <el-icon><icon-menu /></el-icon>
            <span>上传</span>
        </el-menu-item>
        <!-- <el-menu-item index="3" disabled>
            <el-icon><document /></el-icon>
            <span>Navigator Three</spashangchuann>
        </el-menu-item> -->
        <el-menu-item index="4">
            <el-icon><setting /></el-icon>
            <span>检索</span>
        </el-menu-item>
        </el-menu>
    </el-scrollbar>
</template>
    
<script setup lang = 'ts'>
import {
    Menu as IconMenu,
    Setting,
} from '@element-plus/icons-vue'
// import {
//     Document,
//     Location,
// } from '@element-plus/icons-vue'
const emits = defineEmits(['selection'])
const handleSelect = (index: string) => {
    if (index === "2") {
        emits('selection', "Upload")
    } else if (index === "4") {
        emits('selection', "Search")
    }
}

</script>

<style>

</style>