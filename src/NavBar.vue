<script>
import { useRouter } from 'vue-router'

export default {
  props: {
    path: String
  },
  methods: {
    getPath() {
      const route = useRouter()
      return route.currentRoute.value.path
    }
  }
}
</script>

<template>
  <nav>
    <RouterLink to="/change-location" v-if="getPath() === '/'">Change location</RouterLink>
    <RouterLink to="/" v-else>Back</RouterLink>
  </nav>
</template>

<style>
.pageContainer {
  min-height: calc(100vh - 60px);
  display: flex;
  align-items: center;
}
</style>
