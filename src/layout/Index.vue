<template>
  <n-layout style="min-height: 400px;" :native-scrollbar="false">
    <n-layout has-sider>
        <aside-page/>
      <n-layout>
        <n-layout-header bordered style="height: var(--header-height);" class="headerContainer">
          Header Header Header
        </n-layout-header>
        <n-layout :native-scrollbar="false" class="mainContainer">

          <transition name="slide-left">
            <div>
              <n-button >add</n-button>
              <ul>
                <li v-for="item in 80" :key="item">asdfghqwert</li>
              </ul>
            </div>

          </transition>

        </n-layout>
      </n-layout>
    </n-layout>
<!--    <n-layout-footer bordered>
      Footer Footer Footer
    </n-layout-footer>-->
  </n-layout>
</template>

<script setup>
import {NIcon, NLayout, NLayoutSider, NMenu, NLayoutFooter, NLayoutHeader, NButton} from 'naive-ui'
import AsidePage from './Aside/Aside.vue'

</script>

<style scoped>
.headerContainer {
  margin: 16px 16px 0;
}
.mainContainer {
  height: calc(100vh - 82px); /* 16+50+16  */
  margin: 16px 0 0 16px;
}
.slide-left-enter-active {
  animation: slideLeft 0.3s;
}
/****自定义动画**/
@keyframes slideLeft {
  from {
    transform: translate3d(100%, 0, 0);/*横坐标,纵坐标,z坐标*/
    visibility: visible;
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}
</style>
