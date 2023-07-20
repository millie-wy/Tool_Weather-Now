<script>
export default {
  props: {
    content: String,
    label: String
  }
}
</script>

<template>
  <div class="d-tab">
    <h4 class="green label sm-text">{{ label }}</h4>
    <p>{{ content }}</p>
  </div>
</template>

<style scoped>
.d-tab {
  min-width: 90px;
  max-width: 90px;
  white-space: nowrap;
}

.label {
  margin-bottom: 5px;
}
</style>
