<template>
    <div class="canvas-editor-layout">
        <CanvasObjectEditor />
        <div class="canvas-and-layout">
            <CanvasLayoutList
                :updateActiveLayout="updateActiveLayout"
                :activeLayout="activeLayout"/>
            <div>
                <div class="canvas-list">
                    <div class="canvas" v-for="objectArray in canvasArray" :key="objectArray.id">
                        <MoveAble
                            v-for="object in objectArray.structure"
                            :key="object.id"
                            v-bind:object="object"
                            v-bind:target="object.type+object.id"
                        />
                    </div>
                </div>
                <AddSlide :addSlide="addSlide"/>
            </div>
        </div>
    </div>
</template>

<script>
    import CanvasLayoutList from "../CanvasLayoutList/CanvasLayoutList.vue";
    import CanvasObjectEditor from "../CanvasObjectEditor/CanvasObjectEditor.vue";
    import MoveAble from "../../utilities/interactive/MoveAble.vue";
    import AddSlide from "../AddSlide/AddSlide.vue";

    export default {
        name: 'CanvasObject',
        props: {
            canvasArray: Array,
            layoutList: Array,
            activeLayout: Object
        },
        components: {
            MoveAble,
            CanvasLayoutList,
            CanvasObjectEditor,
            AddSlide
        },
        methods: {
            addSlide: function(){
                this.$emit('add-slide')
            },
            // removeSlide: function(slide){
            //     this.$emit('remove-slide', slide)
            // },
            updateActiveLayout: function(layout){
                this.$emit('update-active-layout', layout)
            }
        }
    }   
</script>

<style scoped>
    .canvas-editor-layout {
        margin-top: 4.2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100vw;
        box-sizing: border-box;
        margin-left: 0;
        margin-right: 0;
    }
    .canvas-and-layout {
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
</style>