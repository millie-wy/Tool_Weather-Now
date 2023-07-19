<script>
import FooterView from '../FooterView.vue'
import SkeletonLoader from '../components/SkeletonLoader.vue'
import { fetchWeather } from '../helper'

//TODO: local storage
export default {
  props: {
    data: {
      weatherData: Object, // TODO
      tempScale: String,
      location: String // TODO
    }
  },
  data() {
    return {
      error: false
    }
  },
  async mounted() {
    await fetchWeather(this.data.location)

    if (await fetchWeather(this.data.location).error) {
      return (this.error = true)
    }
  },
  components: {
    FooterView,
    SkeletonLoader
  },
  computed: {
    tempScaleSymbol() {
      return this.data.tempScale === 'celsius' ? '°C' : '°F'
    },
    hasWeatherData() {
      console.log(this.data.weatherData)
      return Object.keys(this.data.weatherData).length > 0
    }
  }
}
</script>

<template>
  <div class="page-container">
    <h4 v-if="hasWeatherData" class="green">
      {{ data.weatherData.location.region + ', ' + data.weatherData.location.country }}
    </h4>
    <SkeletonLoader v-else />

    <h1 v-if="hasWeatherData">{{ data.weatherData.location.name }}</h1>
    <SkeletonLoader v-else height="39" />

    <img
      v-if="hasWeatherData"
      src="../assets/weather-icons/176.png"
      alt="weather-condition-icon"
      class="w-icon"
    />
    <SkeletonLoader v-else width="64" height="64" class="w-icon" />
    <h4 v-if="hasWeatherData">{{ data.weatherData.current.condition.text }}</h4>
    <SkeletonLoader v-else width="100" />
    <p v-if="hasWeatherData" class="sm-text">
      Feels like
      {{
        data.tempScale === 'celsius'
          ? data.weatherData.current.feelslike_c + tempScaleSymbol
          : data.weatherData.current.feelslike_f + tempScaleSymbol
      }}
    </p>
    <SkeletonLoader v-else width="100" />
    <h2 v-if="hasWeatherData">
      {{
        data.tempScale === 'celsius'
          ? data.weatherData.current.temp_c + tempScaleSymbol
          : data.weatherData.current.temp_f + tempScaleSymbol
      }}
    </h2>
    <SkeletonLoader v-else width="100" height="45" />

    <div class="details row">
      <div class="d-tab">
        <h4 class="green label sm-text">UV Index</h4>
        <p v-if="hasWeatherData">{{ data.weatherData.current.uv }}</p>
        <SkeletonLoader v-else width="90" />
      </div>
      <div class="d-tab">
        <h4 class="green label sm-text">Wind</h4>
        <p v-if="hasWeatherData">
          {{ data.weatherData.current.wind_dir + ' ' + data.weatherData.current.wind_kph }} km/h
        </p>
        <SkeletonLoader v-else width="90" />
      </div>
      <div class="d-tab">
        <h4 class="green label sm-text">Wind Gust</h4>
        <p v-if="hasWeatherData">{{ data.weatherData.current.gust_kph }} km/h</p>
        <SkeletonLoader v-else width="90" />
      </div>
      <div class="d-tab">
        <h4 class="green label sm-text">Cloud Cover</h4>
        <p v-if="hasWeatherData">{{ data.weatherData.current.cloud }}%</p>
        <SkeletonLoader v-else width="90" />
      </div>
      <div class="d-tab">
        <h4 class="green label sm-text">Visibility</h4>
        <p v-if="hasWeatherData">{{ data.weatherData.current.vis_km }} km</p>
        <SkeletonLoader v-else width="90" />
      </div>
      <div class="d-tab">
        <h4 class="green label sm-text">Humidity</h4>
        <p v-if="hasWeatherData">{{ data.weatherData.current.humidity }}%</p>
        <SkeletonLoader v-else width="90" />
      </div>
    </div>

    <div class="forcast-div row">
      <div class="f-col align-right">
        <h4>Tomorrow</h4>
        <h4 v-if="hasWeatherData">{{ data.weatherData.forecast.forecastday[2].date }}</h4>
        <SkeletonLoader v-else width="75" />
      </div>
      <div class="f-col">
        <img src="../assets/weather-icons/176.png" alt="weather--icon-tomorrow" width="20" />
        <img
          src="../assets/weather-icons/176.png"
          alt="weather-icon-day-after-tomorrow"
          width="20"
        />
      </div>
      <div class="f-col">
        <p v-if="hasWeatherData">
          {{
            data.tempScale === 'celsius'
              ? data.weatherData.forecast.forecastday[1].day.mintemp_c +
                ' - ' +
                data.weatherData.forecast.forecastday[1].day.maxtemp_c +
                tempScaleSymbol
              : data.weatherData.forecast.forecastday[1].day.mintemp_f +
                ' - ' +
                data.weatherData.forecast.forecastday[1].day.maxtemp_f +
                tempScaleSymbol
          }}
        </p>
        <SkeletonLoader v-else width="75" />
        <p v-if="hasWeatherData">
          {{
            data.tempScale === 'celsius'
              ? data.weatherData.forecast.forecastday[2].day.mintemp_c +
                ' - ' +
                data.weatherData.forecast.forecastday[2].day.maxtemp_c +
                tempScaleSymbol
              : data.weatherData.forecast.forecastday[2].day.mintemp_f +
                ' - ' +
                data.weatherData.forecast.forecastday[2].day.maxtemp_f +
                tempScaleSymbol
          }}
        </p>
        <SkeletonLoader v-else width="75" />
      </div>
    </div>
  </div>
  <FooterView />
</template>

<style scoped>
h2 {
  font-size: 30px;
}

.w-icon {
  margin: 12px auto;
}

.details {
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  margin: 36px auto;
  gap: 15px 20px;
}

.d-tab {
  min-width: 90px;
  max-width: 90px;
  white-space: nowrap;
}

.label {
  margin-bottom: 5px;
}

.forcast-div {
  gap: 15px;
}

.f-col {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
</style>
