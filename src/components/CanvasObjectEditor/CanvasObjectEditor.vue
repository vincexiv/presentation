<template>
    <div class="canvas-object-editor-container">

    </div>
</template>

<script>
    export default ({
        name: "CanvasObjectEditor"
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

.canvas-object-editor {
    background-color: #0077be;
    outline: solid white 0.1rem;
}
</style>