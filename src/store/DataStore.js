import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', {
  state: () => ({ weatherData: {}, tempScale: 'celsis', location: 'gothenburg' })
})
