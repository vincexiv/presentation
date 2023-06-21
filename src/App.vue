<template>
  <div>
    <NavBar/>
    <div class="main-area">
      <CanvasComponent
        :canvasArray="data"
        :updateCanvas="updateCanvas"
        :updateCanvasLayouts="updateCanvasLayouts"
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
      data: [layoutList[0]],
      layoutList: layoutList,
      activeLayout: layoutList[layoutList.length-1],
      activeObjectInfo: {
        canvasId: null,
        objectId: null,
        objectContent: null
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
      const newId = this.idCount
      const newSlide = {...this.activeLayout, id: newId}
      this.data.push(newSlide)
    },
    updateCanvas: function(newContent){
 
      const targetCanvasId = this.activeObjectInfo.canvasId
      const targetObjectId = this.activeObjectInfo.objectId


      let newData = this.data.map(canvas => {
        if(canvas.id !== targetCanvasId){
          return canvas
        }else{
          const updatedCanvas = {
              ...canvas,
              structure: canvas.structure.map(object => {
                if(object.id !== targetObjectId){
                  return object
                }else {
                  return {...object, content: newContent }
                }
            })
          }

          return updatedCanvas
  
        }
      })

      this.data = newData
    },
    updateCanvasLayouts: function(newLayouts){
      let newData = []
      newLayouts.forEach(layout => {
        const targetId = layout.id
        const targetCanvas = this.data.find(canvas => {
          return canvas.id === targetId
        })

        layout.structure.forEach(s => {
          const targetObjectId = s.id
          const targetObject = targetCanvas.structure.find(object => object.id === targetObjectId)
          targetObject.style = s.style
        })

        newData.push(targetCanvas)
      })

      this.data = newData
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
  font-family: Avenir, Helvetica, Arial, sans-serif;

  box-sizing: border-box;
  margin-left: 0;
  margin-right: 0;
  background-color: #f7f7ff;
}
</style>
