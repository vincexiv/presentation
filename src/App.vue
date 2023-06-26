<template>
  <div>
    <NavBar/>
    <div class="main-area">
      <CanvasComponent
        :canvasArray="data"
        :changeMode="changeMode"
        :mode="mode"
        :updateCanvas="updateCanvas"
        :saveData="saveData"
        :updateText="updateText"
        :activeObjectInfo="activeObjectInfo"
        :updateActiveObjectInfo="updateActiveObjectInfo"
        :exportToPowerPoint="exportToPowerPoint"
        :layoutList="newCopy(layoutList)"
        :activeLayout="activeLayout"
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
import {getContents, getPositions, getPptxCompatibleStyle} from './utilities/functions/createppt';

export default {
  name: 'App',
  data(){
    return {
      data: [this.newCopy(layoutList[0])],
      mode: 'edit', // mode can be edit or preview. Will determine how slides will be displayed
      layoutList: layoutList,
      activeLayout: layoutList[layoutList.length-1],
      activeObjectInfo: {
        canvasId: null,
        objectId: null,
        type: "",
        objectContent: {}
      },
      idCount: canvasObjects.length, // will be used to ensure ids of new slides dont clash
    }
  },
  components: {
    NavBar,
    CanvasComponent
  },
  methods: {
    changeMode: function(newMode){
      this.mode = newMode
    },
    updateTextStyle: function(newStyle){

      const targetCanvasId = this.activeObjectInfo.canvasId
      const targetObjectId = this.activeObjectInfo.objectId

      let newData = this.data.map(canvas => {
        if(canvas.id !== targetCanvasId){
          return canvas
        }else{
          const updatedCanvas = {
              ...this.newCopy(canvas),
              structure: canvas.structure.map(object => {
                if(object.id !== targetObjectId){
                  return object
                }else {
                  return {...this.newCopy(object), content: {...this.newCopy(object).content, style: {...this.newCopy(object).content?.style, ...newStyle}} }
                }
            })
          }

          return updatedCanvas
        }
      })

      this.data = newData
    },
    saveData: function(){
      // "saveReadyData" represents our slides with everything updated
      // such that initializing the program with the data will get us
      // our work as it looked at that point 
      this.data = this.getSaveReadyData()

      // WRITE CODE FOR SENDING THE DATA TO THE BACKEND HERE
      // i.e fetch(<apihost>/<endpoint>, {method: <m>, headers: <h>, body: JSON.stringify(this.data)})
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
        let contents = getContents(this.data[i])

        for(let j = 0; j < this.data[i].structure.length; j++){
          const content = contents[`object-${this.data[i].structure[j].id}`]
          const position = positions[`object-${this.data[i].structure[j].id}`]
          
          if(content.type === "text"){
            // Text styles supported by pptxgen are not exactly similar to
            // CSS. For instance, font-size should be a digit ranging between
            // 1 - 256 in pptxgen, but we could use "rem", "em", etc in css
            // find more here; https://gitbrent.github.io/PptxGenJS/docs/api-text/
            const textStyles = getPptxCompatibleStyle(content.style)  
            
            slide.addText(content.content, {...position, ...textStyles})

          } else if(content.type === 'chart' && content.content){
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
            
            slide.addImage({
              data: "data:image/png;base64, " + highchartB64,
              ...position
            })

          }
        }
      }

      pres.writeFile({fileName: "what"})
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
              ...this.newCopy(canvas),
              structure: canvas.structure.map(object => {
                if(object.id !== targetObjectId){
                  return object
                }else {
                  return {...this.newCopy(object), content: newContent }
                }
            })
          }

          return updatedCanvas
  
        }
      })

      this.data = newData
    },
    getSaveReadyData: function(){
      // Gets updated canvas layouts (since we probably have
      // moved around and resized the objects)
      const updatedLayouts = getLayouts()
      
      let saveReadyData = []
      updatedLayouts.forEach(layout => {
        const targetId = layout.id
        let targetCanvas = this.data.find(canvas => {
          return canvas.id === targetId
        })

        targetCanvas = this.newCopy(targetCanvas)

        layout.structure.forEach(s => {
          const targetObjectId = s.id
          const targetObject = targetCanvas.structure.find(object => object.id === targetObjectId)
          targetObject.style = s.style
        })

        saveReadyData.push(targetCanvas)
      })

      return saveReadyData
    },
    updateActiveObjectInfo: function(newInfo){
      this.activeObjectInfo = {...this.activeObjectInfo, ...newInfo}
      console.log(JSON.parse(JSON.stringify(this.activeObjectInfo)))
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
