<template>
    <div class="canvas-object-editor-container">
        <div class="object-editor">
            <div class="switchers">
                <div class="option">Canvas</div>
                <div class="option">Text</div>
                <div class="option">Chart</div>
            </div>
            <div class="details">

            </div>
        </div>
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
    position: fixed;
    z-index: 2;
    backdrop-filter: blur(1rem);
    -webkit-backdrop-filter: blur(1rem);
    display: flex;
    justify-content: center;
    align-items: center;
}

.object-editor {
    background-color: rgba(0, 119, 190, 0.9);
    outline: solid rgba(255, 255, 255, 0.1) 0.1rem;
    width: 95%;
    height: 80%;
    border-radius: 1rem;
    padding: 0.5rem 2rem 0.5rem 2rem;
}

.switchers {
    background-color: transparent;
    color: white;
    border-bottom: solid 0.1rem rgba(255, 255, 255, 0.3);
    display: flex;
    gap: 0.5rem;
}

.option {
    font-size: 0.8rem;
    background-color: #f7f7f7;
    padding: 0.2em;
    border-radius: 0.5em;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    width: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0077be;
}
</style>