<script lang="ts" setup>
import TheHeader from '@/components/the-header.vue'
import TheFooter from '@/components/the-footer.vue'
</script>
<template>
  <a-layout id="components-layout-demo-top-side-2">
    <the-header></the-header>
    <router-view />
    <the-footer></the-footer>
  </a-layout>
</template>
