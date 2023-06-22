<template>
  <div>
    <NavBar/>
    <div class="main-area">
      <CanvasComponent
        :canvasArray="data"
        :updateCanvas="updateCanvas"
        :saveData="saveData"
        :updateText="updateText"
        :updateActiveObjectInfo="updateActiveObjectInfo"
        :exportToPowerPoint="exportToPowerPoint"
        :layoutList="newCopy(layoutList)"
        :activeLayout="activeLayout"
        :updateRenderedCharts="updateRenderedCharts"
        :updateTextStyle="updateTextStyle"
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
import getLayouts from './utilities/functions/getlayouts';
import pptxgen from "pptxgenjs";
import {getContents, getPositions} from './utilities/functions/createppt';

export default {
  name: 'App',
  data(){
    return {
      data: [this.newCopy(layoutList[0])],
      layoutList: layoutList,
      activeLayout: layoutList[layoutList.length-1],
      activeObjectInfo: {
        canvasId: null,
        objectId: null,
        objectContent: {}
      },
      idCount: canvasObjects.length, // will be used to ensure ids of new slides dont clash
      renderedCharts: []
    }
  },
  components: {
    NavBar,
    CanvasComponent
  },
  methods: {
    updateTextStyle: function(newStyle){
      console.log("new style: ", newStyle)

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
                  return {...object, content: {...object.content, style: newStyle} }
                }
            })
          }

          return updatedCanvas
        }
      })

      this.data = newData
    },
    saveData: function(){
      // Since we have been moving things around, resizing, etc
      // update the information we have first
      this.updateCanvasLayouts(getLayouts())


      // WRITE CODE FOR SENDING THE DATA TO THE BACKEND HERE
    },
    exportToPowerPoint: async function(){
      // 1. Create a Presentation
      let pres = new pptxgen();
 
      for(let i = 0; i < this.data.length; i++){
        // 2. Add a Slide to the presentation
        let slide = pres.addSlide();

        // this.data == canvas/slide. The positions and contents
        // here are the position and contents in that canvas/slide
        let positions = getPositions(this.data[i])
        let contents = getContents(this.data[i], this.renderedCharts)

        console.log("positions: ", positions)
        console.log("contents: ", contents)

        for(let j = 0; j < this.data[i].structure.length; j++){
          const content = contents[`object-${this.data[i].structure[j].id}`]
          const position = positions[`object-${this.data[i].structure[j].id}`]
          console.log("what the fuckc ontents: ", JSON.stringify(contents))
          if(content.type === "text"){
          
            console.log("the text: ", position)
            slide.addText(content.content, position )
          } else if(content.type === 'chart'){
            console.log()
            // Export the highcart objects content to b64 image first
            const response = await fetch("https://export.highcharts.com/", {
              "headers": {
                "content-type": "application/json",
              },
              "body": JSON.stringify({
                          "infile": content.content,
                          "b64": true
                        }),
              "method": "POST",
              "mode": "cors"
            })

            let highchartB64 = await response.text()
            highchartB64 += "data:image/png;base64," 
            
            slide.addImage({data: highchartB64, options: position})
            console.log("higchart b64: ", highchartB64)
          }
        }
      }

      pres.writeFile({fileName: "what"})
    },
    updateRenderedCharts: function (chart, canvasId, objectId){
      
      this.renderedCharts.push(
        {
          canvasId: canvasId,
          objectId: objectId,
          chart: chart,
        }
      )

    },
    updateText(canvasId, objectId, newText){
      const targetCanvas = this.data.find(canvas => canvasId === canvas.id)
      const targetObject = targetCanvas.structure.find(object => objectId === object.id)
      
      // update the text content
      if(targetObject?.content){
        targetObject.content.text = newText
      }else {
        const oldContent = targetObject.content
        targetObject.content = {...oldContent, text: newText}
      }
    },
    updateActiveLayout: function(layout){
      this.activeLayout = this.newCopy(layout)
    },
    newCopy: function(object){
      return JSON.parse(JSON.stringify(object))
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
      // Gets updated canvas layouts (since we probably have
      // moved around and resized the objects)
      
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
