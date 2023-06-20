<template>
    <textarea v-if="object.type == 'text' && !!object.content"
      :id="objectId"
      v-model="text"
      :placeholder="object.defaultContent"
      :style="objectStyle"
      :class="`${object.type} ${object.typeDetails.category} canvas-object`"
      @click="makeActive"/>
      
    <textarea v-else-if="object.type == 'text' && !object.content"
      :id="objectId"
      v-model="text"
      :placeholder="object.defaultContent"
      :style="objectStyle"
      :class="`${object.type} ${object.typeDetails.category} canvas-object`"
      @click="makeActive"/>

    <div v-else-if="object.type == 'chart' && !object.content"
        :id="objectId"
        :style="objectStyle"
        :class="`${object.type} canvas-object`"
        @click="makeActive">
      <i class="fa-sharp fa-3x fa-solid fa-chart-simple" @click="openModal"></i>
    </div>

    <div v-else
        :id="`${objectId}`"
        ref="highchart"
        :style="objectStyle"
        :class="`${object.type} canvas-object`"
        @click="makeActive">
      </div>
</template>


<script>
import makeResizableAndDraggable from './interact'
import createChart from "./highcharts"
  
  export default {
    name: "MoveAble",
    props: {
      object: Object,
      target: String,
      openModal: Function,
      updateActiveObjectInfo: Function,
      activeCanvas: Object
    },
    updated: function(){
      // console.log("updated", JSON.parse(JSON.stringify(this.object)))

      const objectId = `#object-${this.activeCanvas.id}-${this.object.id}`
      
      if(this.object.type === 'chart' && !!this.$refs.highchart){
        const chart = createChart(this.$refs.highchart.id, this.object.content)
        console.log("updated chart: ", chart)
        makeResizableAndDraggable(objectId, chart)
      }else {
        makeResizableAndDraggable(objectId)
      }
    },
    mounted: function(){
      // console.log("mounted", JSON.parse(JSON.stringify(this.object)))

      const objectId = `#object-${this.activeCanvas.id}-${this.object.id}`
      
      if(this.object.type === 'chart' && !!this.$refs.highchart){
        const chart = createChart(this.$refs.highchart.id, this.object.content)
        // console.log("chart: ", chart)
        makeResizableAndDraggable(objectId, chart)
      }else {
        makeResizableAndDraggable(objectId)
      }
    },
    data(){
      return {
        text: this.object.content?.text
      }
    },
    computed: {
      objectId: function(){
        return `object-${this.activeCanvas.id}-${this.object.id}`
      },
      activeIcon: function(){
        if(this.$refs.highchart && Object.keys(this.$refs.highchart).length > 0){
          return 'display-none'
        }else {
          return ''
        }
      },
      objectStyle: function(){
        if(this.object.content){
          return {...this.object.content.style, ...this.object.style}
        }else{
          return this.object.style
        }
      }
    },
    methods: {
      makeActive(e){
        const allCanvasObjects = document.querySelectorAll('.canvas-object')
        allCanvasObjects.forEach(object => {
          object.classList.remove('active')
        })

        if(this.$refs?.highchart){
          this.$refs.highchart.classList.add('active')
        }else {
          e.target.classList.add('active')
        }
        
        this.updateActiveObjectInfo({ objectId: this.object.id, canvasId: this.activeCanvas.id})
      }
    }
  }
</script>

<style scoped>
.canvas-object {
  position: absolute;
  border: none;
  outline: dashed #d4d4d4 0.1rem;
  background-color: transparent;
  padding: 0.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.canvas-object.active {
  outline: dashed black 0.1rem;
}

.canvas-object.text.title {
  font-size: 2rem;
}

.canvas-object.chart i {
  cursor: pointer;
  position: relative;
  color: #0077be;
  background-color: transparent;
}

.canvas-object.chart i:after {
  content: "Add Chart";
  display: block;
  position: absolute;
  top: 100%;
  width: 120%;
  font-size: 0.5rem;
  transform: translate(-10%, 0);
}

textarea {
  resize: none;
}

.highchart-object {
  width: 100%;
  height: 100%;
}
</style>