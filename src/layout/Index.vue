<template>
  <n-layout style="min-height: 400px;" :native-scrollbar="false">
    <n-layout has-sider>
        <aside-page/>
      <n-layout style="width: calc(100vw - 240px)">
        <header-page/>
        <n-layout :native-scrollbar="false" class="mainContainer">

           <div class="mainContent">
<!--              <content  class="mainContent"/>-->
<!--            </div>-->
          <transition-component>
<!--            <content class="mainContent"/>-->
          </transition-component>
           </div>

        </n-layout>
      </n-layout>
    </n-layout>
  </n-layout>
</template>

<script setup>
import {NIcon, NLayout, NLayoutSider, NMenu, NLayoutFooter, NLayoutHeader, NButton} from 'naive-ui'
import AsidePage from './aside/Aside.vue'
import Content from './Content.vue'
import HeaderPage from './header/Header.vue'
import TransitionComponent from '@/components/TransitionComponent.vue'

</script>

<style scoped>

.mainContainer {
  height: calc(100vh - 66px); /* 16+50  */
  margin-left: 16px;
}
.mainContent {
  background: #ffffff;
  margin: 16px 16px 60px 0;
  padding: 20px;
  border-radius: var(--border-radius);
}
</style>
