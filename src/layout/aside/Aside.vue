<template>
  <div class="asideContainer">
    <div class="logo">
      <n-gradient-text
          :size="36"
          :gradient="{
            deg: 90,
            from: '#0ba360',
            to: '#3cba92'
          }"
      >
        BookMarks
      </n-gradient-text>
    </div>
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
import {NLayoutSider, NGradientText} from "naive-ui";
import MenuPage from './Menu.vue'
import ActionTool from "./Action.vue";


</script>

<style scoped>
.asideContainer {
  background: #ffffff;
  box-shadow: 0 0 12px rgba(0, 0, 0, .12);
  border-radius: var(--border-radius);
  overflow: hidden;
  height: calc(100vh - 32px);
  margin: 16px 0 16px 16px;
}
.logo {
  height: 50px;
  background: #fff;
  margin-left: 10px;
  display: flex;
  align-items: center;
}
.aside {
  height: calc(100% - 110px);
  border: 1px solid rgb(239, 239, 245);
  border-width: 1px 0;
}
</style>
