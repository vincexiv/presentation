<template>
  <div class="container">
      <div :class="target" ref="target" :style="object.style">
        <div v-if="object.type == 'text'">{{ object.content }}</div>
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
  
  export default {
    name: "MoveAble",
    props: {
      object: Object,
      target: String
    },
    components: {
      Moveable,
    },
    methods: {
      onDrag({ transform }) {
          this.$refs.target.style.transform = transform;
      },
      onScale({ drag }) {
          this.$refs.target.style.transform = drag.transform;
      },
      onRotate({ drag }) {
          this.$refs.target.style.transform = drag.transform;
      },
    },
    computed: {
      targetClass(){
        return "." + this.target
      }
    }
  }
</script>

<style>
 
</style>