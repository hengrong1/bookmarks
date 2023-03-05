<template>
  <transition appear name="fade" mode="out-in">
    <keep-alive>
      <component
          :is="Content"
          :key="menuSelectedId"
          :index="menuSelectedId">
      </component>
    </keep-alive>
  </transition>
</template>

<script setup>
import {useBookmarkStore} from "@/stores/counter";
import {storeToRefs} from "pinia";
import Content from '@/layout/Content.vue'
import {ref, watch} from "vue";


const store = useBookmarkStore()
const {menuSelected} = storeToRefs(store)
const menuSelectedId = ref(menuSelected.value[0])

console.log(menuSelectedId)
watch(menuSelected, (n, o) => {
  console.log('=====>', n);
  menuSelectedId.value = n[0]
})
</script>

<style>
.fade-enter-from,
.fade-leave-to {
  /*定义进入开始和离开结束的透明度为0*/
  opacity: 0;
}
.fade-leave-to {
  transform: translateX(120px);
}
.fade-enter-to {
  /*transform: translateX(-120px);*/
}
.fade-enter-to,
.fade-leave-from {
  /*定义进入结束和离开开始的透明度为1*/
  opacity: 1;
}
.fade-leave-active{
  transition: all 0s ease-out;
}
.fade-enter-active {
  transition: all 0.5s ease-out;
}

</style>