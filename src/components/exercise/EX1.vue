<template>
    <div> Ref: {{ obj }}</div>
    <hr/>
    <div ref = "dom">DOM</div>
    <hr/>
    <button @click="change">change</button>
</template>

<script setup lang = "ts">
import { ref, customRef } from "vue"
const dom = ref<HTMLDivElement>()
const change = () => {
    obj.value = "changed"
    console.log(obj)
    console.log(dom.value?.innerText)
}
function MyRef<T> (value:T) {
    let timer: any
    return customRef(
        (track, trigger) => {
            return {
                get() {
                    track()
                    return value
                },
                set(newVal: T) {
                    clearTimeout(timer)
                    timer = setTimeout(() => {
                        console.log("changed")
                        value = newVal
                        timer = null
                        trigger()
                    }, 500)
                }
            }
        }
    )
}
const obj = MyRef<string>('zyf')
</script>