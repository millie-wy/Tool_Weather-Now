<script>
import FooterView from '../FooterView.vue'
import SkeletonLoader from '../components/SkeletonLoader.vue'
import { fetchWeather } from '../helper'

//TODO: local storage
export default {
  props: {
    data: {
      weatherData: Object,
      tempScale: String, // Bug found: not updating when switching setting
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
    d() {
      return this.data.weatherData
    },
    tempScaleSymbol() {
      return this.data.tempScale === 'celsius' ? '°C' : '°F'
    },
    hasWeatherData() {
      return Object.keys(this.d).length > 0
    },
    forecastTempTomorrow() {
      const day = this.d.forecast.forecastday[1].day
      return this.data.tempScale === 'celsius'
        ? day.mintemp_c + ' - ' + day.maxtemp_c + this.tempScaleSymbol
        : day.mintemp_f + ' - ' + day.maxtemp_f + this.tempScaleSymbol
    },
    forecastTempDayAfterTmw() {
      const day = this.d.forecast.forecastday[2].day
      return this.data.tempScale === 'celsius'
        ? day.mintemp_c + ' - ' + day.maxtemp_c + this.tempScaleSymbol
        : day.mintemp_f + ' - ' + day.maxtemp_f + this.tempScaleSymbol
    },
    uvIndex() {
      const index = this.d.current.uv
      const category = index < 3 ? 'Low' : index < 6 ? 'Moderate' : index > 7 ? 'Very High' : 'High'
      return index + ' ' + category
    },
    formattedDate() {
      const date = new Date(this.d.forecast.forecastday[2].date)
      return date.getDate() + '/' + (date.getMonth() + 1)
    }
  },
  methods: {
    getWeatherIcon(iconLink) {
      let iconNumber = iconLink
      iconNumber = iconNumber.slice(-7, -4)
      return '../src/assets/weather-icons/' + iconNumber + '.png'
    }
  }
}
</script>

<template>
  <div class="page-container">
    <h4 v-if="hasWeatherData" class="green">
      {{ d.location.region + ', ' + d.location.country }}
    </h4>
    <SkeletonLoader v-else />

    <h1 v-if="hasWeatherData">{{ d.location.name }}</h1>
    <SkeletonLoader v-else height="39" />

    <img
      v-if="hasWeatherData"
      :src="getWeatherIcon(d.current.condition.icon)"
      alt="weather-condition-icon"
      class="w-icon"
    />
    <SkeletonLoader v-else width="64" height="64" class="w-icon" />
    <h4 v-if="hasWeatherData">{{ d.current.condition.text }}</h4>
    <SkeletonLoader v-else width="100" />
    <p v-if="hasWeatherData" class="sm-text">
      Feels like
      {{
        data.tempScale === 'celsius'
          ? d.current.feelslike_c + tempScaleSymbol
          : d.current.feelslike_f + tempScaleSymbol
      }}
    </p>
    <SkeletonLoader v-else width="100" />
    <h2 v-if="hasWeatherData">
      {{
        data.tempScale === 'celsius'
          ? d.current.temp_c + tempScaleSymbol
          : d.current.temp_f + tempScaleSymbol
      }}
    </h2>
    <SkeletonLoader v-else width="100" height="45" />

    <div class="details row">
      <div class="d-tab">
        <h4 class="green label sm-text">UV Index</h4>
        <p v-if="hasWeatherData">{{ uvIndex }}</p>
        <SkeletonLoader v-else width="90" />
      </div>
      <div class="d-tab">
        <h4 class="green label sm-text">Wind</h4>
        <p v-if="hasWeatherData">{{ d.current.wind_dir + ' ' + d.current.wind_kph }} km/h</p>
        <SkeletonLoader v-else width="90" />
      </div>
      <div class="d-tab">
        <h4 class="green label sm-text">Wind Gust</h4>
        <p v-if="hasWeatherData">{{ d.current.gust_kph }} km/h</p>
        <SkeletonLoader v-else width="90" />
      </div>
      <div class="d-tab">
        <h4 class="green label sm-text">Cloud Cover</h4>
        <p v-if="hasWeatherData">{{ d.current.cloud }}%</p>
        <SkeletonLoader v-else width="90" />
      </div>
      <div class="d-tab">
        <h4 class="green label sm-text">Visibility</h4>
        <p v-if="hasWeatherData">{{ d.current.vis_km }} km</p>
        <SkeletonLoader v-else width="90" />
      </div>
      <div class="d-tab">
        <h4 class="green label sm-text">Humidity</h4>
        <p v-if="hasWeatherData">{{ d.current.humidity }}%</p>
        <SkeletonLoader v-else width="90" />
      </div>
    </div>

    <div class="forcast-div row">
      <div class="f-col align-right">
        <h4>Tomorrow</h4>
        <h4 v-if="hasWeatherData">{{ formattedDate }}</h4>
        <SkeletonLoader v-else width="75" />
      </div>
      <div class="f-col">
        <img
          v-if="hasWeatherData"
          :src="getWeatherIcon(d.forecast.forecastday[1].day.condition.icon)"
          alt="weather--icon-tomorrow"
          width="20"
        />
        <SkeletonLoader v-else width="20" />
        <img
          v-if="hasWeatherData"
          :src="getWeatherIcon(d.forecast.forecastday[2].day.condition.icon)"
          alt="weather-icon-day-after-tomorrow"
          width="20"
        />
        <SkeletonLoader v-else width="20" />
      </div>
      <div class="f-col">
        <p v-if="hasWeatherData">{{ forecastTempTomorrow }}</p>
        <SkeletonLoader v-else width="75" />
        <p v-if="hasWeatherData">{{ forecastTempDayAfterTmw }}</p>
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
