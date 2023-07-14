<script>
import { IconChevronRight, IconHelpOctagon } from '@tabler/icons-vue'

export default {
  components: { IconChevronRight, IconHelpOctagon },
  data() {
    return {
      error: '',
      location: '',
      hover: false
    }
  },
  watch: {
    location() {
      if (this.location !== '' && this.error !== '') {
        return (this.error = '')
      }
    }
  },
  methods: {
    async onSubmit() {
      if (this.location === '') return (this.error = 'Please input a location')
      await fetch(
        `http://api.weatherapi.com/v1/forecast.json?days=3&q=${this.location}&key=${
          import.meta.env.VITE_API_KEY
        }`
      )
        .then((res) => res.json())
        .then((json) => (json.error ? (this.error = json.error.message) : console.log(json)))
        .catch((err) => console.error(err))
    }
  }
}
</script>

<template>
  <div class="page-container">
    <form @submit.prevent="onSubmit">
      <div class="input-div">
        <span>
          <input type="text" v-model="location" />
          <IconHelpOctagon
            size="15px"
            class="icon green"
            @mouseover="hover = true"
            @mouseleave="hover = false"
          />
        </span>
        <p class="error sm-text" v-show="error">{{ error }}</p>
        <Transition class="helper" v-show="hover">
          <p>
            Enter US Zipcode, UK Postcode, Canada Postalcode, IP address, Latitude/Longitude
            (decimal degree) or city name.
          </p>
        </Transition>
      </div>
      <button>Change location <IconChevronRight size="12px" class="icon" /></button>
    </form>
  </div>
</template>

<style scoped>
.input-div {
  position: relative;
}

input {
  background: none;
  border: none;
  border-bottom: 1px solid #fff;
  width: 180px;
  color: inherit;
  font-family: inherit;
  font-size: 15px;
}

input:hover {
  border-bottom: 1px solid #b6e6bd;
}

input:focus {
  outline: none;
  border-bottom: 1px solid #b6e6bd;
}

.icon:hover {
  color: #fff;
  cursor: pointer;
}

.error {
  color: #f0c9c9;
  position: absolute;
  right: left;
  max-width: 180px;
  bottom: -18px;
}

.helper {
  position: absolute;
  background: #ffffff30;
  font-size: 10px;
  width: 160px;
  padding: 9px;
  right: -80px;
  top: -80px;
}

button {
  margin-top: 30px;
}
</style>
