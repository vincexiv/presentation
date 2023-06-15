<template>
    <div class="canvas-options">
        <button v-for="option in options" :key="option">
            {{ option }}
        </button>
    </div>
</template>

<script>
export default ({
    name: "CanvasOptions",
    props: {
        updateActiveOption: Function,
        options: Array
    }
})
</script>

<style scoped>
.canvas-options {
    height: max-content;
    display: flex;
    gap: 0.5rem;
    cursor: pointer;
}

.canvas-options button {
    padding: 0.2rem 0.6rem 0.2rem 0.6rem;
    cursor: pointer;
    border-radius: 0.5rem;
    outline: none;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>