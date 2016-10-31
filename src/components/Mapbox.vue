<template>
  <div id="map">
    <p id="latLng">Lat: {{lat}} Lng: {{lng}}</p>
    <form id="mapType">
      <label>Change Map Type</label>
      <input type="radio" name="mapType" value="default" v-model="mapType" v-on:change="changeMapType" /> Default <br />
      <input type="radio" name="mapType" value="satellite" v-model="mapType" v-on:change="changeMapType" /> Satellite <br />
    </form>
  </div>
</template>

<script>
const config = require('../../config/app.config').default
const mapboxgl = require('mapbox-gl')

const mapStyles = {
  default: 'mapbox://styles/ryanhamley/ciuxgnhff00jo2irrvml8bfjk',
  satellite: 'mapbox://styles/mapbox/satellite-v9'
}
const defaultLatLng = {
  lat: 37.7720566,
  lng: -122.4099524
}
const defaultOptions = {
  container: 'map',
  style: mapStyles.default,
  center: [defaultLatLng.lng, defaultLatLng.lat],
  zoom: 15,
  pitch: 45,
  attributionControl: false
}

mapboxgl.accessToken = config.mapboxToken

export default {
  data() {
    return {
      lat: defaultLatLng.lat,
      lng: defaultLatLng.lng,
      mapType: 'default'
    }
  },
  mounted() {
    let map = new mapboxgl.Map(defaultOptions);
    this.map = map;

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
      this.lat = e.lngLat.lat.toFixed(7);
      this.lng = e.lngLat.lng.toFixed(7);
    }.bind(this));
  },
  methods: {
    changeMapType: function (event) {
      this.map.setStyle(mapStyles[this.mapType]);
    }
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

#mapType {
  background: white;
  border-radius: 5px;
  box-sizing: border-box;
  display: inline;
  padding: 5px;
  top: 10px;
  right: 10px;
  position: absolute;
  z-index: 200;

  label {
    display: block;
    font-weight: bold;
  }
}
</style>
