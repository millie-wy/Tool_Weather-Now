<script>
import { IconChevronRight, IconHelpOctagon } from '@tabler/icons-vue'
import { fetchWeather } from '../helper'
import { useDataStore } from '../store/DataStore'

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
      const res = await fetchWeather(this.location)
      if (!res.ok)
        return (this.error =
          res.result === 'Bad Request' ? 'No matching location found' : res.result)
      this.updateLocationState(this.location)
      this.updateLs(this.location)
      return this.$router.push('/')
    },
    updateLocationState(location) {
      const store = useDataStore()
      return (store.$state.location = location)
    },
    updateLs(location) {
      return localStorage.setItem('weather.now.location', JSON.stringify(location))
    }
  }
}
</script>

<template>
  <div class="page-container">
    <form @submit.prevent="onSubmit">
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
          Enter US Zipcode, UK Postcode, Canada Postalcode, IP address, Latitude/Longitude (decimal
          degree) or city name.
        </p>
      </Transition>

      <button>Change location <IconChevronRight size="12px" class="icon" /></button>
    </form>
  </div>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: center;
}

input {
  background: none;
  border: none;
  border-bottom: 1px solid #fff;
  width: 180px;
  height: 26px;
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
  top: 31px;
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
