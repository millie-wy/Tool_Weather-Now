<script>
export default {
  props: {
    height: Number,
    width: Number
  },
  computed: {
    cssProps() {
      return {
        '--height': this.height ? this.height - 5 + 'px' : '14.5px',
        '--width': this.width ? this.width + 'px' : '200px'
      }
    }
  }
}
</script>

<template>
  <div class="half-transparent" :style="cssProps"></div>
</template>

<style scoped>
div {
  width: var(--width);
  height: var(--height);
  margin-top: 5px;
  animation: pulse-bg 1s infinite;
}

@keyframes pulse-bg {
  0% {
    background: #ffffff60;
  }
  50% {
    background: #d6d6d660;
  }
  100% {
    background: #ffffff60;
  }
}
</style>
