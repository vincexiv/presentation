<template>
  <div>
    <NavBar/>
    <div class="main-area">
      <CanvasComponent
        :canvasArray="data"
        :updateCanvas="updateCanvas"
        :updateActiveObjectInfo="updateActiveObjectInfo"
        :layoutList="layoutList"
        :activeLayout="activeLayout"
        @update-active-layout="(layout)=>updateActiveLayout(layout)"
        @add-slide="addSlide()"/>
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
      activeLayout: layoutList[layoutList.length-1],
      activeObjectInfo: {
        canvasId: null,
        objectId: null,
        objectContent: {}
      },
      idCount: canvasObjects.length // will be used to ensure ids of new slides dont clash
    }
  },
  components: {
    NavBar,
    CanvasComponent
  },
  methods: {
    updateActiveLayout: function(layout){
      this.activeLayout = layout
    },
    addSlide(){
      this.idCount += 1
      const newId = this.activeLayout.id + `-${this.idCount}`
      const newSlide = {...this.activeLayout, id: newId}
      this.data = [...this.data, newSlide]
    },
    updateCanvas: function(newContent){
      const targetCanvasId = this.activeObjectInfo.canvasId
      const targetObjectId = this.activeObjectInfo.objectId

      const targetCanvas = this.data.find(canvas => canvas.id === targetCanvasId)
      const targetObject = targetCanvas.find(object => object.id === targetObjectId)

      targetObject.content = {...newContent, ...targetObject}
    },
    updateActiveObjectInfo: function(newInfo){
      this.activeObjectInfo = {...this.activeObjectInfo, ...newInfo}
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
