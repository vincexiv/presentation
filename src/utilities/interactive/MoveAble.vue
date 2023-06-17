<template>
  <div class="canvas-object-container"
      :class="object.typeDetails?.category"
      ref="target"
      :style="object.style">

    <div v-if="object.type == 'text' && !!object.content"
        class="text canvas-object"
        :class="object.typeDetails.category"
        @click="updateActiveObject(object)">
      <div class="the-object">
        {{ object.content.text }}
      </div>
    </div>
    <div v-else-if="object.type == 'text' && !object.content"
        class="text canvas-object"
        :class="object.typeDetails.category"
        @click="updateActiveObject(object)">
      <div class="the-object">
        {{ object.defaultContent }}
      </div>
    </div>

    <div v-else-if="object.type == 'chart' && !!object.content"
        class="canvas-object"
        @click="updateActiveObject(object)">
      <div :id="higchartObjectId" class="the-object">
      </div>
    </div>

    <div v-else-if="object.type == 'chart' && !object.content"
        class="canvas-object"
        @click="updateActiveObject(object)">
      <div class="the-object empty-chart" >
        <i class="fa-sharp fa-3x fa-solid fa-chart-simple" @click="openModal"></i>
      </div>
    </div>

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
    mounted: function(){
      makeResizableAndDraggable(".canvas-object-container")
      makeResizableAndDraggable(".canvas-object-container .canvas-object")

      // It's not just an empty canvas
      if(this.options){
        const chart = createChart(`${this.higchartObjectId}`, this.options)
        makeResizableAndDraggable(`.canvas-object-container #${this.higchartObjectId}`, chart)
      }
    },
    methods: {
      updateActiveObject: function(object){
        this.updateActiveObjectInfo({
          objectId: object.id,
          canvasId: this.activeCanvas.id
        })
      }
    },
    data(){
      return {
        options: this.object.content,
      }
    },
    computed: {
      higchartObjectId: function(){
        return `highcharts-${this.object.id}`
      }
    }
  }
</script>

<style scoped>
.canvas-object-container {
  box-sizing: border-box;
  position: absolute;
  outline: solid 0.1rem white;
  padding: 0.5rem;
}

.canvas-object-container .canvas-object {
  position: relative;
  width: 100%;
  height: 100%;
}
.canvas-object-container.title {
  font-size: 2rem;
}

.canvas-object .the-object {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  outline: 0.1rem white dashed;
}

.the-object.empty-chart {
  display: flex;
  justify-content: center;
  align-items: center;
}

.the-object.empty-chart i {
  position: relative;
  cursor: pointer;
}

.the-object.empty-chart i:after {
  font-size: 0.5rem;
  content: "add chart";
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 100%;
  left: 0;
  width: 120%;
  transform: translate(-10%, 0);
}
</style>