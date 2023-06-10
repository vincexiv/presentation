<template>
  <div>
    <NavBar/>
    <div class="main-area">
      <CanvasComponent :canvasArray="data"  />
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar/NavBar.vue'
import CanvasComponent from './components/Canvas/CanvasComponent.vue';
import canvasObjects from './utilities/data/sampleData';

export default {
  name: 'App',
  data(){
    return {
      data: canvasObjects
    }
  },
  components: {
    NavBar,
    CanvasComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
