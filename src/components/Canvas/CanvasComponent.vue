<template>
    <div class="canvas-and-layout">
        <CanvasLayoutList />
        <div class="canvas">
            <div class="canvas-object" v-for="object in objectArray" :key="object.id">
                <MoveAble  v-bind:object="object" v-bind:target="object.type+object.id"/>
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
            objectArray: Array
        },
        components: {
            MoveAble,
            CanvasLayoutList
        }
    }   
</script>

<style>
    .canvas-and-layout {
        margin-top: 6rem;
        display: flex;
        gap: 1rem;
        align-items: top;
        justify-content: center;
    }
    .canvas {
        width: max(50vw, 50rem);
        height: max(30vw, 30rem);
        background-color: #d4d4d4;
    }

    .canvas-object {
        position: relative;
    }
</style>