<template>
  <div class="canvas-object-container"
      :class="object.typeDetails?.category"
      ref="target"
      :style="object.style">
    <div v-if="object.type == 'text'"
        class="text canvas-object"
        :class="object.typeDetails.category">
      <div v-for="text in object.content" :key="text.id" class="the-object">
        {{ text.content? text.content : object.defaultContent }}
      </div>
    </div>
    <div v-else-if="object.type == 'chart'" class="canvas-object">
      <div :id="higchartObjectId" class="the-object">
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
      target: String
    },

    mounted: function(){
      makeResizableAndDraggable(".canvas-object-container")
      makeResizableAndDraggable(".canvas-object-container .canvas-object")
      makeResizableAndDraggable(".canvas-object-container #highcharts")

      createChart(this.higchartObjectId, this.options)
    },
    data(){
      return {
        options: this.object.content
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
</style>