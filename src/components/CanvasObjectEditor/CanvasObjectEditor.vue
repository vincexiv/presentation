<template>
  <div>
    <div class="canvas">
      <div v-for="object in canvasObjects" :key="object.id" :style="object.style">
        <!-- Render the object based on its type -->
        <template v-if="object.type === 'text'">
          <div class="text-object">
            <div
              class="text-content"
              contenteditable
              @input="updateTextContent(object.id, $event.target.textContent)"
              @focus="highlightObject(object.id)"
              @blur="removeHighlight()"
            >
              {{ object.content.text }}
            </div>
          </div>
        </template>
        <template v-else-if="object.type === 'chart'">
          <div class="chart-object">
            <!-- Render the chart using the provided chart library -->
            <!-- ... -->
          </div>
        </template>
      </div>
    </div>
    <div class="editing-options">
      <button @click="applyBold">Bold</button>
      <button @click="applyItalic">Italic</button>
      <button @click="applyColor('red')">Red</button>
      <!-- Add more editing options as needed -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      canvasObjects: [] // Your canvas objects data from SampleData.js
    };
  },
  methods: {
    updateTextContent(objectId, newText) {
      // Find the corresponding object in canvasObjects and update its content
      const object = this.canvasObjects.find(obj => obj.id === objectId);
      if (object) {
        object.content.text = newText;
      }
    },
    highlightObject(objectId) {
      // Update the style of the highlighted object
      const object = this.canvasObjects.find(obj => obj.id === objectId);
      if (object) {
        object.style.backgroundColor = 'yellow';
      }
    },
    removeHighlight() {
      // Remove the highlight style from all objects
      this.canvasObjects.forEach(obj => {
        obj.style.backgroundColor = 'transparent';
      });
    },
    applyBold() {
      // Apply bold style to the selected object
      // Implement your logic here
    },
    applyItalic() {
      // Apply italic style to the selected object
      // Implement your logic here
    },
    applyColor() {
      // Apply color style to the selected object
      // Implement your logic here
    },
    // Add more methods for other editing options as needed
  }
};
</script>

<style>
.canvas {
  position: relative;
}

.text-object {
  position: absolute;
}

.chart-object {
  /* Styles for chart objects */
  position: relative;
}

.editing-options {
  /* Styles for editing options */
  position: inherit;
}
</style>


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