<template>
  <div class="container" :class="object.typeDetails?.category">
      <div :class="target" class="canvas-object" ref="target" >
        <div v-if="object.type == 'text'" class="text object" :class="object.typeDetails.category">
          <div v-for="text in object.content" :key="text.id" class="object">
            {{ text.content? text.content : object.defaultContent }}
          </div>
        </div>
        <div v-else-if="object.type == 'chart'" class="object">
          <vue2-highcharts :options="options" :id="target" class="object">
              {{ options }}
          </vue2-highcharts>
        </div>
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
    },
    computed: {
      targetClass(){
        return "." + this.target
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
.container {
  padding: 0.5rem;
  box-sizing: border-box;
  background-color: yellow;
  position: relative;

}
.container.title {
  font-size: 2rem;
  display: flex;
  align-items: center;
}

.canvas-object {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-color: yellow; */
}
</style>