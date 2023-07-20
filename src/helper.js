import { useDataStore } from './store/DataStore'

export const fetchWeather = async (location) => {
  if (!location) return
  let res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?days=3&q=${location}&key=${
      import.meta.env.VITE_API_KEY
    }`
  )
  const ok = res.ok
  const result = ok ? updateWeatherDataState(await res.json()) : res.statusText
  return { ok, result }
}

export const updateWeatherDataState = (jsonData) => {
  const store = useDataStore()
  return (store.$state.weatherData = jsonData)
}
