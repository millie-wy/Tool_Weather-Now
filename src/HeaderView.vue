<script>
import { IconChevronLeft } from '@tabler/icons-vue'
import { useRouter } from 'vue-router'
import { useDataStore } from './store/DataStore'

export default {
  props: {
    tempScale: { type: String }
  },
  components: { IconChevronLeft },
  methods: {
    isHome() {
      const route = useRouter()
      return route.currentRoute.value.path === '/'
    },
    updateTempScale(value) {
      const store = useDataStore()
      return (store.$state.tempScale = value)
    }
  },
  computed: {
    isCelsis() {
      return this.tempScale === 'celsis'
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
      <button @click="updateTempScale('celsis')" :class="isCelsis ? 'chosen' : 'half-transparent'">
        °C
      </button>
      <p class="half-transparent">/</p>
      <button
        @click="updateTempScale('fahrenheit')"
        :class="!isCelsis ? 'chosen' : 'half-transparent'"
      >
        °F
      </button>
    </div>
  </header>
</template>

<style scoped>
header {
  max-height: 40px;
}

.chosen {
  color: #fff;
}

.setting {
  justify-content: end;
  gap: 3px;
}
</style>
