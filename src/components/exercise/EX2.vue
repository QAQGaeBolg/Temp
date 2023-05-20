<template>
    <div>
        <form>
            <input v-model="form.name" type = "text">
            <br/>
            <input v-model = "form.age" type = "text">
            <br/>
            <button @click.prevent = "submit">submit</button>
        </form>
        <ul>
            <!-- <li v-for = "item in list">{{ item }}</li> -->
            <li v-for = "item in list.arr">{{ item }}</li>
        </ul>
        <button @click="add">add</button>
        <br/>
        <button @click="check">check</button>
    </div>
</template>

<script setup lang = 'ts'>
import { reactive, readonly } from 'vue'
//shallow第一个属性
const submit = () => {
    console.log(form)
}
type M = {
    name: string,
    age: number
}

let form = reactive<M>({
    name: "zyf",
    age: 22
})

// let list = reactive<string[]>([])
let list = reactive<{
    arr: string[]
}>(
    {arr: []}
)

// 不能直接赋值，破坏相应对象
// 数组push加解构, 或添加对象
const add = () => {
    setTimeout(() => {
        let res = ["aaa", "ccc", "www"]
        //list = res
        // list.push(...res)
        list.arr = res
        console.log(list)
    }, 1000)
}

let obj = reactive({ name: "zyf"})

const read = readonly(obj)

const check = () => {
    obj.name = "aaa"
    console.log(obj, read)
}

</script>

<style>

</style>