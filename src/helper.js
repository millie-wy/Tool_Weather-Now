import { useDataStore } from './store/DataStore'

export const fetchWeather = async (location) => {
  if (!location) return
  await fetch(
    `http://api.weatherapi.com/v1/forecast.json?days=3&q=${location}&key=${
      import.meta.env.VITE_API_KEY
    }`
  ).then((res) => {
    res.json().then((json) => {
      if (json.error) return json.error
      return updateWeatherDataState(json)
    })
  })
}

export const updateWeatherDataState = (jsonData) => {
  const store = useDataStore()
  return (store.$state.weatherData = jsonData)
}
