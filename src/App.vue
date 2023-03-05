<script setup>
import Layout from '@/layout/Index.vue'
import {NNotificationProvider} from 'naive-ui'
</script>

<template>
  <n-notification-provider>
    <layout/>
  </n-notification-provider>
</template>

<style>
.n-layout {
  background: none;
}
</style>
