<template>
  <div class="content">
    <ul>
      <li v-for="item in currentData" :key="item">item - {{ item.id }}</li>
    </ul>
<!--    <n-grid cols="2 400:4 600:6">
      <n-grid-item>
        <div class="light-green">
          1
        </div>
      </n-grid-item>
      <n-grid-item>
        <div class="green">
          2
        </div>
      </n-grid-item>
      <n-grid-item>
        <div class="light-green">
          3
        </div>
      </n-grid-item>
      <n-grid-item>
        <div class="green">
          4
        </div>
      </n-grid-item>
      <n-grid-item>
        <div class="light-green">
          5
        </div>
      </n-grid-item>
      <n-grid-item>
        <div class="green">
          6
        </div>
      </n-grid-item>
    </n-grid>-->
  </div>
</template>

<script setup>
import {useBookmarkStore} from '@/stores/counter'
import {storeToRefs} from "pinia";
import {computed, ref, watch} from "vue";
import {findItemById} from '@/utils/bookmark'
import {NGrid, NGridItem} from "naive-ui";
import TransitionComponent from '@/components/TransitionComponent.vue'


const currentData = ref()

const store = useBookmarkStore()

const {bookmark, menuSelected} = storeToRefs(store)
console.log('pinia值:', bookmark, menuSelected)
// currentData.value = computed(() => {
//   // if (menuSelected.value && bookmark.value)
  console.log(findItemById(menuSelected.value[0], bookmark.value).children);
currentData.value =  [...findItemById(menuSelected.value[0], bookmark.value).children]
//   // else return []
// })

watch(menuSelected, (n, o) => {
  console.log(n, o)
  try {
    currentData.value = [...findItemById(menuSelected.value[0], bookmark.value).children]
  } catch (e) {
    console.log(e);
  }
})




</script>

<style scoped>
.light-green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
}
.green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.24);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>