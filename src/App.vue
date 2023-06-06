<template>
  <div>
    <NavBar/>
    <CanvasComponent :objectArray="data"  />
  </div>
</template>

<script>
import NavBar from './components/NavBar/NavBar.vue'
import CanvasComponent from './components/Canvas/CanvasComponent.vue';

export default {
  name: 'App',
  data(){
    return {
      data: [
        {id: 1, type: "text", style: {position: "absolute", top: "5rem", padding: "0.5rem", left: "7rem", width: "5rem", height: "2rem"}, content: "This is awesome"},
        {id: 2, type: "text", style: {position: "absolute", top: "10rem", padding: "0.5rem", left: "7rem", width: "10rem", height: "5rem"}, content: "This is awesome"}
      ]
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
  margin-top: 60px;
}
</style>
