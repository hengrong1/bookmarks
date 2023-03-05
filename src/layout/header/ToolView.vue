<template>
  <div class="toolView">

    <div class="breadcrumb">
      <n-breadcrumb>
        <n-breadcrumb-item separator=">">北京总行</n-breadcrumb-item>
        <n-breadcrumb-item separator=">">天津分行</n-breadcrumb-item>
        <n-breadcrumb-item separator=">">平山道支行</n-breadcrumb-item>
      </n-breadcrumb>
    </div>
    <div class="cardViewType">
      <n-space>
        <n-popover :arrow-point-to-center="true">
          <template #trigger>
            <n-icon-wrapper :size="26" :color="'rgba('+ (showCardType === 0 ? BtnColor.primary:BtnColor.info) +', .2)'"
                            @click="changeShowType(0)"
            >
              <n-icon size="18" :color="'rgba('+(showCardType === 0 ? BtnColor.primary:BtnColor.info)+', .8)'" :component="ShowType0"></n-icon>
            </n-icon-wrapper>
          </template>
          <input type="file" style="display: none" id="importFileControl" accept="text/html">
          <span style="font-size: 12px">宽松</span>
        </n-popover>
        <n-popover :arrow-point-to-center="true">
          <template #trigger>
            <n-icon-wrapper :size="26" :color="'rgba('+(showCardType === 1 ? BtnColor.primary:BtnColor.info)+', .2)'"
                            @click="changeShowType(1)"
            >
              <n-icon size="18" :color="'rgba('+(showCardType === 1 ? BtnColor.primary:BtnColor.info)+', .8)'" :component="ShowType1"></n-icon>
            </n-icon-wrapper>
          </template>
          <input type="file" style="display: none" id="importFileControl" accept="text/html">
          <span style="font-size: 12px">紧凑</span>
        </n-popover>
        <n-popover :arrow-point-to-center="true">
          <template #trigger>
            <n-icon-wrapper :size="26" :color="'rgba('+(showCardType === 2 ? BtnColor.primary:BtnColor.info)+', .2)'"
                            @click="changeShowType(2)"
            >
              <n-icon size="18" :color="'rgba('+(showCardType === 2 ? BtnColor.primary:BtnColor.info)+', .8)'" :component="ShowType2"></n-icon>
            </n-icon-wrapper>
          </template>
          <input type="file" style="display: none" id="importFileControl" accept="text/html">
          <span style="font-size: 12px">列表</span>
        </n-popover>
      </n-space>
    </div>
  </div>
</template>

<script setup>
import {NSpace, NIconWrapper, NIcon, NPopover, NBreadcrumb, NBreadcrumbItem} from "naive-ui";
import {
  Grid24Filled as ShowType0,
  GridDots24Filled as ShowType1,
  TextBulletListLtr24Filled as ShowType2,
} from "@vicons/fluent";
import {useBookmarkStore} from '@/stores/counter'
import {storeToRefs} from "pinia";

const store = useBookmarkStore()
const {showCardType} = storeToRefs(store)
console.log(showCardType.value)

const BtnColor = {
  info: '64,152,252',
  primary: '14,122,13',
  error: '208,48,80'
}

const changeShowType = (type) => {
  store.showCardType = type
  console.log(type)
}
</script>

<style scoped>
.toolView {
  display: flex;
  align-items: center;
}
.breadcrumb, .cardViewType{
  margin: 0 15px;
  min-width: 102px;
}
</style>