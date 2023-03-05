<template>
  <div class="asideContainer">
    <div class="logo"></div>
    <n-layout-sider
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :native-scrollbar="false"
        class="aside"
    >
      <menu-page/>
    </n-layout-sider>
    <action-tool/>
  </div>
</template>

<script setup>
import {NLayoutSider} from "naive-ui";
import MenuPage from './Menu.vue'
import ActionTool from "./Action.vue";


</script>

<style scoped>
.asideContainer {
  background: #ffffff;
  box-shadow: 0 0 12px rgba(0, 0, 0, .12);
  border-radius: 6px;
  overflow: hidden;
  height: calc(100vh - var(--header-height));
  margin: 16px 0 16px 16px;
}
.logo {
  height: 50px;
  background: #fff;
}
.aside {
  height: calc(100% - 90px);
  border: 1px solid rgb(239, 239, 245);
  border-width: 1px 0;
}
</style>
