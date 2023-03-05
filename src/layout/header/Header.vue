<template>
  <n-layout-header bordered class="headerContainer">
    <tool-view/>
    <span>Header Header Header</span>
  </n-layout-header>
</template>

<script setup>
import {NLayoutHeader} from "naive-ui";
import ToolView from "@/layout/header/ToolView.vue";

</script>

<style scoped>
.headerContainer {
  margin: 16px 16px 0;
  height: var(--header-height);
  display: flex;
  align-items: center;
  border-radius: var(--border-radius);
}
</style>