<script>
import FooterView from '../FooterView.vue'

export default {
  components: {
    FooterView
  }
}
</script>
<template>
  <div class="page-container">
    <h4 class="title">Västra Götaland, Sweden</h4>
    <h1>Gothenburg</h1>
    <img src="../assets/weather-icons/176.png" alt="weather icon!!" class="w-icon" />
    <h4>Partly cloudy</h4>
    <p class="sm-text">Feels like 18°C</p>
    <h2>18°C</h2>

    <div class="details row">
      <div class="d-tab">
        <h4 class="title sm-text">UV Index</h4>
        <p>4 Moderate</p>
      </div>
      <div class="d-tab">
        <h4 class="title sm-text">Wind</h4>
        <p>WSW 19.1 km/h</p>
      </div>
      <div class="d-tab">
        <h4 class="title sm-text">Wind Gust</h4>
        <p>20.2 km/h</p>
      </div>
      <div class="d-tab">
        <h4 class="title sm-text">Cloud Cover</h4>
        <p>50%</p>
      </div>
      <div class="d-tab">
        <h4 class="title sm-text">Visibility</h4>
        <p>10 km</p>
      </div>
      <div class="d-tab">
        <h4 class="title sm-text">Humidity</h4>
        <p>73%</p>
      </div>
    </div>

    <div class="forcast-div row">
      <div class="f-col align-right">
        <h4>Tomorrow</h4>
        <h4>15/7</h4>
      </div>
      <div class="f-col">
        <img src="../assets/weather-icons/176.png" alt="weather icon!!" width="20px" />
        <img src="../assets/weather-icons/176.png" alt="weather icon!!" width="20px" />
      </div>
      <div class="f-col">
        <p>12 - 24°C</p>
        <p>12.9 - 19.8°C</p>
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

.forcast-div {
  gap: 15px;
}

.f-col {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
</style>
