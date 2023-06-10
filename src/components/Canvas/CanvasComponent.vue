<template>
    <div class="canvas-and-layout">
        <CanvasLayoutList />
        <div class="canvas-list">
            <div class="canvas" v-for="objectArray in canvasArray" :key="objectArray.id">
                <MoveAble
                    class="canvas-object"
                    v-for="object in objectArray.structure"
                    :key="object.id"
                    v-bind:object="object"
                    v-bind:target="object.type+object.id"
                    :style="object.style"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import MoveAble from "../../utilities/interactive/MoveAble/MoveAble.vue";
    import CanvasLayoutList from "../CanvasLayoutList/CanvasLayoutList.vue";

    export default {
        name: 'CanvasObject',
        props: {
            canvasArray: Array
        },
        components: {
            MoveAble,
            CanvasLayoutList
        }
    }   
</script>

<style scoped>
    .canvas-and-layout {
        margin-top: 6rem;
        display: flex;
        gap: 1rem;
        align-items: top;
        justify-content: center;
    }
    .canvas-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .canvas {
        width: max(50vw, 50rem);
        height: max(30vw, 30rem);
        background-color: #d4d4d4;
        position: relative;
    }
    .canvas-object {
        position: absolute;
        outline: solid 0.1rem white;
    }
</style>