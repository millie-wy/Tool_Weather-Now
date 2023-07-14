<script>
import { IconChevronLeft } from '@tabler/icons-vue'
import { useRouter } from 'vue-router'

export default {
  components: { IconChevronLeft },
  methods: {
    isHome() {
      const route = useRouter()
      return route.currentRoute.value.path === '/'
    }
  }
}
</script>

<template>
  <header :class="isHome() && 'align-right'">
    <nav>
      <RouterLink to="/change-location" v-if="isHome()" class="half-transparent"
        >Change location</RouterLink
      >
      <RouterLink to="/" v-else><IconChevronLeft size="12px" class="icon" />Back</RouterLink>
    </nav>
    <div class="setting row" v-show="isHome()">
      <p href="#">°C</p>
      <p>/</p>
      <p href="#">°F</p>
    </div>
  </header>
</template>

<style scoped>
header {
  max-height: 40px;
}

.setting {
  justify-content: end;
  gap: 3px;
}
</style>
