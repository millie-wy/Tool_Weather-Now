<script>
import FooterView from '../FooterView.vue'
import SkeletonLoader from '../components/SkeletonLoader.vue'

//TODO: local storage
export default {
  props: {
    data: {
      weatherData: Object, // TODO
      tempScale: String,
      location: String // TODO
    }
  },

  components: {
    FooterView,
    SkeletonLoader
  },
  computed: {
    tempScaleSymbol() {
      return this.data.tempScale === 'celsis' ? '°C' : '°F'
    },
    hasWeatherData() {
      return Object.keys(this.data.weatherData).length > 0
    }
  }
}
</script>

<template>
  <div class="page-container">
    <h4 v-if="hasWeatherData" class="green">Västra Götaland, Sweden</h4>
    <SkeletonLoader v-else />

    <h1 v-if="hasWeatherData">{{ data.location }}</h1>
    <!-- TODO -->
    <SkeletonLoader v-else height="39" />

    <img
      v-if="hasWeatherData"
      src="../assets/weather-icons/176.png"
      alt="weather icon!!"
      class="w-icon"
    />
    <SkeletonLoader v-else width="64" height="64" class="w-icon" />
    <h4 v-if="hasWeatherData">Partly cloudy</h4>
    <SkeletonLoader v-else width="100" />
    <p v-if="hasWeatherData" class="sm-text">Feels like 18{{ tempScaleSymbol }}</p>
    <SkeletonLoader v-else width="100" />
    <h2 v-if="hasWeatherData">18{{ tempScaleSymbol }}</h2>
    <SkeletonLoader v-else width="100" height="45" />

    <div class="details row">
      <div class="d-tab">
        <h4 class="green label sm-text">UV Index</h4>
        <p v-if="hasWeatherData">4 Moderate</p>
        <SkeletonLoader v-else width="90" />
      </div>
      <div class="d-tab">
        <h4 class="green label sm-text">Wind</h4>
        <p v-if="hasWeatherData">WSW 19.1 km/h</p>
        <SkeletonLoader v-else width="90" />
      </div>
      <div class="d-tab">
        <h4 class="green label sm-text">Wind Gust</h4>
        <p v-if="hasWeatherData">20.2 km/h</p>
        <SkeletonLoader v-else width="90" />
      </div>
      <div class="d-tab">
        <h4 class="green label sm-text">Cloud Cover</h4>
        <p v-if="hasWeatherData">50%</p>
        <SkeletonLoader v-else width="90" />
      </div>
      <div class="d-tab">
        <h4 class="green label sm-text">Visibility</h4>
        <p v-if="hasWeatherData">10 km</p>
        <SkeletonLoader v-else width="90" />
      </div>
      <div class="d-tab">
        <h4 class="green label sm-text">Humidity</h4>
        <p v-if="hasWeatherData">73%</p>
        <SkeletonLoader v-else width="90" />
      </div>
    </div>

    <div class="forcast-div row">
      <div class="f-col align-right">
        <h4>Tomorrow</h4>
        <h4 v-if="hasWeatherData">15/7</h4>
        <SkeletonLoader v-else width="75" />
      </div>
      <div class="f-col">
        <img src="../assets/weather-icons/176.png" alt="weather icon!!" width="20px" />
        <img src="../assets/weather-icons/176.png" alt="weather icon!!" width="20px" />
      </div>
      <div class="f-col">
        <p v-if="hasWeatherData">12 - 24{{ tempScaleSymbol }}</p>
        <SkeletonLoader v-else width="75" />
        <p v-if="hasWeatherData">12.9 - 19.8{{ tempScaleSymbol }}</p>
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
