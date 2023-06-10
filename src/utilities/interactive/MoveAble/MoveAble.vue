<template>
  <div class="canvas-object-container" :class="object.typeDetails?.category">
    <div v-if="object.type == 'text'"
        class="text canvas-object" :class="object.typeDetails.category">
      <div v-for="text in object.content" :key="text.id">
        {{ text.content? text.content : object.defaultContent }}
      </div>
    </div>
    <div v-else-if="object.type == 'chart'"
        class="chart canvas-object">
      <vue2-highcharts :options="options" :id="target">
      </vue2-highcharts>
    </div>
  </div>
</template>
  <script>
import Vue2Highcharts from "vue2-highcharts"
import makeResizableAndDraggable  from "../interact";
  
  export default {
    name: "MoveAble",
    props: {
      object: Object,
      target: String
    },
    components: {
      Vue2Highcharts
    },
    mounted: function(){
      makeResizableAndDraggable(".canvas-object")
      makeResizableAndDraggable(".container")

    },
    computed: {
      targetClass(){
        return "." + this.target
      }
    },
    methods: {
      updateActiveObjects: function(event){
        const canvasObjects = document.querySelectorAll(".canvas-object")
        canvasObjects.forEach(object => {
          object.classList.remove("active")
        })

        event.target.classList.add("active")
      }
    },
    data(){
      return {
        options: this.object.content
      }
    }
  }
</script>

<style>
.canvas-object-container {
  padding: 0.5rem;
  box-sizing: border-box;
  position: relative;
}
.canvas-object-container.title {
  font-size: 2rem;
}
</style>