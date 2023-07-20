import { defineStore } from 'pinia'

const locationInLs = localStorage.getItem('weather.now.location')

export const useDataStore = defineStore('data', {
  state: () => ({
    weatherData: {},
    tempScale: 'celsius',
    location: locationInLs ? locationInLs : 'Gothenburg'
  })
})
