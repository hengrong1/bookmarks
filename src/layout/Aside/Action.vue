<template>
  <div id="actionTool">
    <n-space justify="center">
      <n-popover :arrow-point-to-center="true">
        <template #trigger>
          <n-icon-wrapper :size="26" :color="'rgba('+BtnColor.info+', .2)'"
                          @dragover="iconDragOverHandle"
                          @drop="iconDropHandle"
                          @click="importFile"
          >
            <n-icon size="18" :color="'rgba('+BtnColor.info+', .8)'" :component="Import"></n-icon>
          </n-icon-wrapper>
        </template>
        <input type="file" style="display: none" id="importFileControl" accept="text/html">
        <span style="font-size: 12px">导入书签</span>
      </n-popover>
      <n-popover :arrow-point-to-center="true">
        <template #trigger>
          <n-icon-wrapper :size="26" :color="'rgba('+BtnColor.info+', .2)'">
            <n-icon size="18" :color="'rgba('+BtnColor.info+', .8)'" :component="Export"></n-icon>
          </n-icon-wrapper>
        </template>
        <span style="font-size: 12px">导出书签</span>
      </n-popover>
      <n-popover :arrow-point-to-center="true">
        <template #trigger>
          <n-icon-wrapper :size="26" :color="'rgba('+BtnColor.error+', .2)'">
            <n-icon size="18" :color="'rgba('+BtnColor.error+', .8)'" :component="FolderDel"></n-icon>
          </n-icon-wrapper>
        </template>
        <span style="font-size: 12px">删除该文件夹</span>
      </n-popover>
      <n-popover :arrow-point-to-center="true">
        <template #trigger>
          <n-icon-wrapper :size="26" :color="'rgba('+BtnColor.primary+', .2)'">
            <n-icon size="18" :color="'rgba('+BtnColor.primary+', .8)'" :component="FolderAdd"></n-icon>
          </n-icon-wrapper>
        </template>
        <span style="font-size: 12px">新建文件夹</span><br><span>Ctrl+R</span>
      </n-popover>
    </n-space>
  </div>
</template>

<script setup>
import {NSpace, NIcon, NIconWrapper, NPopover} from "naive-ui";
import {useNotification} from 'naive-ui'
import {
  Folder24Filled as Folder,
  ArrowUpload24Filled as Import,
  ArrowDownload24Filled as Export,
  FolderProhibited24Filled as FolderDel,
  FolderAdd24Filled as FolderAdd
} from "@vicons/fluent";
import {analysisBookmarksStr} from '@/utils/bookmark'
import {useBookmarkStore} from "@/stores/counter";

const Bookmark = useBookmarkStore()

const notification = useNotification()
const BtnColor = {
  info: '64,152,252',
  primary: '14,122,13',
  error: '208,48,80'
}
const importFile = () => {
  const importFileEl = document.querySelector("#importFileControl")
  importFileEl.click()

  importFileEl.addEventListener('change', (e)=> {
    e = e || window.event
    let file = e.target.files[0]
    if (file.type !== "text/html") {
      notification['error']({
        content: '出错了',
        meta: '文件格式不正确, 请重新选择文件',
        duration: 5000,
        keepAliveOnHover: true
      })
    }
    const reader = new FileReader()
    reader.readAsText(file, 'utf-8')
    reader.onload = () => {
      // console.log(reader.result)
      const re = analysisBookmarksStr(reader.result)
      console.log('--====:',re)
      Bookmark.bookmark = [...re]
    }

    reader.onerror = () => {
      console.log('err')
    }
  })
}
const iconDragOverHandle = (e) => {
  e = e || window.event
  e.preventDefault()
}

const iconDropHandle = (e) => {
  e = e || window.event
  console.log('drop:', e)
  e.preventDefault();
  const files = e.dataTransfer.files;
  console.log(files)
}

const fileCheck = () => {

}

</script>

<style scoped>
#actionTool {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
}

</style>
