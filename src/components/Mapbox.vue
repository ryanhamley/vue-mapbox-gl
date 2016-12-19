<template>
  <div id='map'>
    <p id='latLng'>Lat: {{lat}} Lng: {{lng}}</p>
  </div>
</template>

<script>
const config = require('../../config/app.config').default
const mapboxgl = require('mapbox-gl')
const Draw = require('mapbox-gl-draw')

const defaultLatLng = {
  lat: 37.7720566,
  lng: -122.4099524
}
const defaultOptions = {
  container: 'map',
  style: config.mapStyles.default,
  center: [defaultLatLng.lng, defaultLatLng.lat],
  zoom: 15,
  attributionControl: false
}

mapboxgl.accessToken = config.mapboxToken

export default {
  data() {
    return {
      route: [],
      lat: defaultLatLng.lat,
      lng: defaultLatLng.lng,
      mapType: 'default'
    }
  },
  mounted() {
    console.log('this', this);
    this.loadData();
  },
  methods: {
    changeMapType (event) {
      this.map.setStyle(config.mapStyles[this.mapType]);
    },
    loadData () {
      let map;
      let vm = this;

      vm.$http.get('http://api.open-notify.org/iss-now.json')
      .then((res) => {
        let issPosition = res.body.iss_position;
        let issLat = parseFloat(issPosition.latitude, 10);
        let issLng = parseFloat(issPosition.longitude, 10);
        vm.lat = issLat;
        vm.lng = issLng;
        vm.route.push([issLng, issLat]);
        defaultOptions.center = [issLng, issLat];
        defaultOptions.zoom = 4;

        map = new mapboxgl.Map(defaultOptions);
        vm.map = map;

        let nav = new mapboxgl.NavigationControl({position: 'bottom-right'})

        map.addControl(nav)

        map.on('load', () => {
          map.addSource('points', {
            'type': 'geojson',
            'data': {
              'type': 'FeatureCollection',
              'features': [{
                'type': 'Feature',
                'geometry': {
                  'type': 'Point',
                  'coordinates': [issLng, issLat]
                },
                'properties': {
                  'title': 'ISS',
                  'icon': 'rocket'
                }
              }]
            }
          });

          map.addLayer({
            'id': 'points',
            'type': 'symbol',
            'source': 'points',
            'layout': {
              'icon-image': '{icon}-15',
              'text-field': '{title}',
              'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
              'text-offset': [0, 0.6],
              'text-anchor': 'top'
            }
          });
        });

        map.on('mousemove', (e) => {
          vm.lat = e.lngLat.lat.toFixed(7);
          vm.lng = e.lngLat.lng.toFixed(7);
        });
      });

      setTimeout(function () {
        vm.updateMap();
      }, 5000);
    },
    updateMap () {
      let vm = this;

      vm.$http.get('http://api.open-notify.org/iss-now.json')
      .then((res) => {
        let issPosition = res.body.iss_position;
        let issLat = parseFloat(issPosition.latitude, 10);
        let issLng = parseFloat(issPosition.longitude, 10);
        vm.route.push([issLng, issLat]);
        vm.lat = issLat;
        vm.lng = issLng;

        vm.map.flyTo({
          center: [
            issLng,
            issLat
          ]
        });

        requestAnimationFrame(() => {
          vm.map.getSource('points').setData({
            "type": "FeatureCollection",
            "features": [{
              "type": "Feature",
              "properties": {
                'title': 'ISS',
                'icon': 'rocket'
              },
              "geometry": {
                'type': 'Point',
                'coordinates': [issLng, issLat]
              }
            }]
          })
        });

        setTimeout(function () {
          vm.updateMap();
        }, 5000);
      });
    }
  }
}
</script>

<style scoped lang='scss'>
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
