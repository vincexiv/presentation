<template>
    <div class="canvas-object-editor-container">

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
.canvas-object-editor-container {
    width: 100%;
    height: 7rem;
    background-color: #0077be;
    opacity: 0.8;
    position: fixed;
    z-index: 2;
    /* box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.1); */
    backdrop-filter: blur(0.5rem);
    -webkit-backdrop-filter: blur(5px)
}
</style>