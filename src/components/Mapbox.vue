<template>
  <div id="map">
  </div>
</template>

<script>
const mapboxgl = require('mapbox-gl')
mapboxgl.accessToken = 'pk.eyJ1IjoicnlhbmhhbWxleSIsImEiOiJjaWszbmluaG8wMDAzdTBrc2Q3Ymk3b3l1In0.BxdMyaYKg_0-LwANjPybNA'

export default {
  mounted() {
    let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/ryanhamley/ciuxgnhff00jo2irrvml8bfjk',
        center: [-122.40995240000001, 37.7720566],
        zoom: 13,
        pitch: 45
    });
  }
}
</script>

<style lang="scss">
#map {
  position:absolute;
  top:0;
  bottom:0;
  width:100%;
}
</style>
