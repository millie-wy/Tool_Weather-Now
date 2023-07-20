<script>
import { IconEggCracked } from '@tabler/icons-vue'
export default {
  components: { IconEggCracked },
  async mounted() {
    setTimeout(() => this.$router.push('/'), 3000)
  }
}
</script>

<template>
  <div class="page-container">
    <IconEggCracked size="80px" stroke-width=".5" class="big-icon" />
    <h3>Something went wrong!</h3>
    <p>You will be redirected to home in 3 seconds</p>
  </div>
</template>

<style scope>
.page-container {
  gap: 8px;
}

.big-icon {
  margin-bottom: 8px;
}
</style>
