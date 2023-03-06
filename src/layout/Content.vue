<template>
  <div class="content">
    <ul>
      <li v-for="item in currentData" :key="item">item - {{ item.id }}</li>
    </ul>
    <div class="flex">
      <div class="flex-item" v-for="(item, i) in currentData" :key="i">
        
        <div class="item-view">
          <div class="item-icon">1</div>
          <div class="item-text">
            <n-ellipsis>
              {{item.name}}
            </n-ellipsis>
            
            </div>
          <div class="item-url">3</div>
        </div>
        <div class="item-action">
          <div class="item-action-edit"></div>
          <div class="item-action-del"></div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script setup>
import {useBookmarkStore} from '@/stores/counter'
import {storeToRefs} from "pinia";
import {computed, ref, watch} from "vue";
import {findItemById} from '@/utils/bookmark'
import {NEllipsis} from "naive-ui";


const currentData = ref()

const store = useBookmarkStore()

const {bookmark, menuSelected} = storeToRefs(store)
console.log('pinia值:', bookmark, menuSelected)
if (bookmark.value.length > 0) {
  currentData.value =  [...findItemById(menuSelected.value[0], bookmark.value).children]
}

watch(menuSelected, (n, o) => {
  try {
    currentData.value = [...findItemById(menuSelected.value[0], bookmark.value).children]
  } catch (e) {
    console.log(e);
  }
})




</script>

<style scoped>

.flex {
  display: flex;
  flex-wrap: wrap;
}
.flex-item {
  width: 200px;
  height: 80px;
  border: 1px solid #f50;
  margin: 10px;
  display: flex;
}
.item-view {
  width: 90%;
  height: 100%;
  display: flex;
  border-right: 1px solid #18a058;
  padding: 16px;
}
.item-icon {
  width: 24px;
  height: 24px;
}
.item-text {
  width: 100%;
}
.item-url {
  display: none;
}
</style>
