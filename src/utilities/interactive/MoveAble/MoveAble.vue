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
      <vue2-highcharts :options="options" :id="target">
      </vue2-highcharts>
    </div>
    <Moveable
          className="moveable"
          v-bind:target=[targetClass]
          v-bind:draggable="true"
          v-bind:scalable="true"
          v-bind:rotatable="true"
          v-bind:stopPropagation="true"
          v-bind:preventDefault="true"
          @scale="onScale"
          @rotate="onRotate"
      />
  </div>
</template>
  <script>
import Vue2Highcharts from "vue2-highcharts"
import makeResizableAndDraggable  from "../interact";
import Moveable from "vue-moveable";
  
  export default {
    name: "MoveAble",
    props: {
      object: Object,
      target: String
    },
    components: {
      Vue2Highcharts,
      Moveable
    },
    mounted: function(){
      makeResizableAndDraggable(".canvas-object-container")
      makeResizableAndDraggable(".canvas-object-container .canvas-object")

    },
    computed: {
      targetClass(){
        return ".canvas-object-container " + "#" + this.target
      }
    },
    methods: {
      onDrag({ transform }) {
          this.$refs.target.style.transform = transform;
      },
      onScale({drag}) {
        this.$refs.target.style.transform = drag.transform;
      },
      onRotate({ drag }) {
        this.$refs.target.style.transform = drag.transform;
      }
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