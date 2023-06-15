<template>
  <div>
    <NavBar/>
    <div class="main-area">
      <CanvasComponent
        :canvasArray="data"
        :layoutList="layoutList"
        :activeLayout="activeLayout"
        @update-active-layout="(layout)=>updateActiveLayout(layout)"/>
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar/NavBar.vue'
import CanvasComponent from './components/Canvas/CanvasComponent.vue';
import canvasObjects from './utilities/data/sampleData';
import layoutList from './utilities/data/layoutlist';

export default {
  name: 'App',
  data(){
    return {
      data: canvasObjects,
      layoutList: layoutList,
      activeLayout: layoutList[-1]
    }
  },
  components: {
    NavBar,
    CanvasComponent
  },
  methods: {
    updateActiveLayout: function(layout){
      this.activeLayout = layout
    }
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

* {
  box-sizing: border-box;
  margin-left: 0;
  margin-right: 0;
}
</style>
