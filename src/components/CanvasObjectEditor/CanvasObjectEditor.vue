<template>
    <div class="canvas-object-editor">
        <i class="fas fa-bold" @click="toggleBold">old</i> <br>
        <i class="fas fa-italic" @click="toggleItalic">talic</i> <br>
        <i class="fas fa-underline" @click="toggleUnderline">nderline</i>

        <div>
            <textarea v-model="text" :style="textStyle"></textarea>
        </div>
    </div>
    
</template>

<script>
    export default ({
        name: "CanvasObjectEditor",
        data() {
    return {
      text: '',
      isBold: false,
      isItalic: false,
      isUnderline: false
    };
  },
  computed: {
    textStyle() {
      let style = '';
      if (this.isBold) style += 'font-weight: bold;';
      if (this.isItalic) style += 'font-style: italic;';
      if (this.isUnderline) style += 'text-decoration: underline;';
      return style;
    }
  },
  methods: {
    toggleBold() {
      this.isBold = !this.isBold;
    },
    toggleItalic() {
      this.isItalic = !this.isItalic;
    },
    toggleUnderline() {
      this.isUnderline = !this.isUnderline;
    }
  }
    })

</script>

<style scoped>
.canvas-object-editor {
    width: 100%;
    height: 6rem;
    background-color: #d4d4d4;
    opacity: 0.8;
    justify-content: space-between;
}
.fas{
    justify-content: space-evenly;
}
</style>