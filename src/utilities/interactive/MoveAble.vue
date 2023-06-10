<template>
  <div class="container" :class="object.typeDetails?.category">
      <div :class="target" class="canvas-object" ref="target" >
        <div v-if="object.type == 'text'" class="text object" :class="object.typeDetails.category">
          <div v-for="text in object.content" :key="text.id">
            {{ text.content? text.content : object.defaultContent }}
          </div>
        </div>
        <vue2-highcharts div v-else-if="object.type == 'chart'" class="chart object" :options="options" :id="target">
            {{ options }}
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
import Moveable from "vue-moveable";
import Vue2Highcharts from "vue2-highcharts"
  
  export default {
    name: "MoveAble",
    props: {
      object: Object,
      target: String
    },
    components: {
      Moveable,
      Vue2Highcharts
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
}
.container.title {
  font-size: 2rem;
  display: flex;
  align-items: center;
}
</style>