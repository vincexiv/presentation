<template>
    <div class="canvas">
        <div class="canvas-object" v-for="object in objectArray" :key="object.id">
            <MoveAble  v-bind:object="object" v-bind:target="object.type+object.id"/>
        </div>
    </div>
</template>

<script>
    import MoveAble from "../../utilities/interactive/MoveAble/MoveAble.vue";

    export default {
        name: 'CanvasObject',
        props: {
            objectArray: Array
        },
        components: {
            MoveAble
        }
    }   
</script>

<style>
    .canvas {
        position: relative;
        width: 50rem;
        height: 30rem;
        background-color: #d4d4d4;
        margin: auto;
        margin-top: 6rem;
        margin-right: 5rem
    }
</style>