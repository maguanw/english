<template>
  <div id="app">
    <!-- <Share /> -->
     <router-view></router-view>
  </div>
</template>

<script>
import Share from './components/share.vue'

export default {
  name: 'app',
  components: {
    Share
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  body{
    margin:0;
  }
</style>
