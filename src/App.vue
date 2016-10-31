<template>
  <div id="app">
    <mapbox></mapbox>
  </div>
</template>

<script>
import Mapbox from './components/Mapbox.vue'

export default {
  name: 'app',
  components: {
    Mapbox
  }
}
</script>

<style>
  body {
    margin: 0;
  }
</style>
