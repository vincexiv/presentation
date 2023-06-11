<template>
  <div class="canvas-object-container" :class="object.typeDetails?.category" ref="target">
    <div v-if="object.type == 'text'"
        class="text canvas-object"
        :class="object.typeDetails.category">
      <div v-for="text in object.content" :key="text.id">
        {{ text.content? text.content : object.defaultContent }}
      </div>
    </div>
    <div v-else-if="object.type == 'chart'">
      <vue2-highcharts :options="options">
      </vue2-highcharts>
    </div>
  </div>
</template>
  <script>
import Vue2Highcharts from "vue2-highcharts"
import makeResizableAndDraggable from './interact'
  
  export default {
    name: "MoveAble",
    props: {
      object: Object,
      target: String
    },
    components: {
      Vue2Highcharts,
    },
    mounted: function(){
      makeResizableAndDraggable(".canvas-object-container")
      makeResizableAndDraggable(".canvas-object-container .canvas-object")
    },
    data(){
      return {
        options: this.object.content
      }
    }
  }
</script>

<style scoped>
.canvas-object-container {
  box-sizing: border-box;
  position: relative;
  padding: 0.5rem;
}
.canvas-object-container.title {
  font-size: 2rem;
}

.canvas-object-container .canvas-object {
  outline: 0.1rem white dashed;
  width: max-content;
}
</style>