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
          @drag="onDrag"
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
      makeResizableAndDraggable(".canvas-object")

    },
    computed: {
      targetClass(){
        return "." + this.target
      }
    },
    methods: {
      onDrag({ transform }) {
        console.log(this.$refs)
          this.$refs.target.style.transform = transform;
      },
      onScale({drag}) {
        console.log(this.$refs)

        this.$refs.target.style.transform = drag.transform;
      },
      onRotate({ drag }) {
        console.log(this.$refs)

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
  padding: 0.5rem;
  box-sizing: border-box;
  position: relative;
}
.canvas-object-container.title {
  font-size: 2rem;
}

.canvas-object-container .canvas-object {
  outline: 0.1rem white dashed;
  width: max-content;
}
</style>