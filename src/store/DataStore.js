import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', {
  state: () => ({ weatherData: {}, tempScale: 'celsius', location: 'gothenburg' })
})
