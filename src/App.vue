<script setup>
import { RouterView } from 'vue-router'
import HeaderView from './HeaderView.vue'
import { useDataStore } from './store/DataStore'

const store = useDataStore()
</script>

<template>
  <HeaderView :tempScale="store.$state.tempScale" />
  <RouterView :data="store.$state" />
</template>
