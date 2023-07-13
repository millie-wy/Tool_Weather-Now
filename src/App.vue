<script setup>
import { RouterView } from 'vue-router'
import NavBar from './NavBar.vue'
</script>

<template>
  <header>
    <!-- <nav>
      <RouterLink to="/change-location" v-if="path === '/'">About</RouterLink>
      <RouterLink to="/" v-else>Back</RouterLink>
    </nav> -->
    <NavBar />
  </header>

  <RouterView />
</template>

<style scoped>
nav {
  text-align: end;
  max-height: 20px;
}
</style>
