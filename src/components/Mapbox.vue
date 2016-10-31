<template>
  <div id="map">
    <p id="latLng">Lat: {{lat}} Lng: {{lng}}</p>
  </div>
</template>

<script>
const config = require('../../config/app.config').default
const mapboxgl = require('mapbox-gl')

const defaultOptions = {
  container: 'map',
  style: 'mapbox://styles/ryanhamley/ciuxgnhff00jo2irrvml8bfjk',
  center: [-122.40995240000001, 37.7720566],
  zoom: 15,
  pitch: 45,
  attributionControl: false
}

mapboxgl.accessToken = config.mapboxToken

export default {
  data: function () {
    return {
      lat: '37.7720566',
      lng: '-122.4099524'
    }
  },
  mounted() {
    let map = new mapboxgl.Map(defaultOptions);

    let nav = new mapboxgl.NavigationControl({position: 'top-left'})

    map.addControl(nav)

    map.on('load', function () {
        // the 'building' layer in the mapbox-streets vector source contains building-height
        // data from OpenStreetMap.
        map.addLayer({
            'id': '3d-buildings',
            'source': 'composite',
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],
            'type': 'fill',
            'minzoom': 15,
            'paint': {
                'fill-color': '#aaa',
                'fill-extrude-height': {
                    'type': 'identity',
                    'property': 'height'
                },
                'fill-extrude-base': {
                    'type': 'identity',
                    'property': 'min_height'
                },
                'fill-opacity': .6
            }
        });
    });

    map.on('mousemove', function (e) {
      console.log('e', JSON.stringify(e.lngLat));
      this.lat = e.lngLat.lat.toFixed(7);
      this.lng = e.lngLat.lng.toFixed(7);
    }.bind(this));
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

#latLng {
  background: transparentize(white, 0.2);
  bottom: 0;
  box-sizing: border-box;
  display: inline;
  left: 10px;
  padding: 5px;
  pointer-events: none;
  position: absolute;
  z-index: 200;
}
</style>
