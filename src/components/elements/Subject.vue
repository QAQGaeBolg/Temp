<template>
    <Upload v-bind="attrs" v-if="props.selection=='Upload'"/>
    <Search v-else/>
    <Describtion/>
</template>

<script lang="ts" setup>
import { useAttrs } from 'vue'
import Search from './Search.vue'
import Upload from './Upload.vue'
import Describtion from './Describtion.vue';
interface Props {
  selection: string;
}
const props = withDefaults(defineProps<Props>(), {
    selection: 'Upload'
});
const attrs = useAttrs()

</script>

<style scoped>

</style>

<style>

</style>
