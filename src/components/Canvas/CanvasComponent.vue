<template>
    <div class="canvas-editor-layout">
        <CanvasObjectEditor
            :activeEditOption="activeEditOption"
            :changeMode="changeMode"
            :updateActiveEditOption="updateActiveEditOption"
            :saveData="saveData"
            :exportToPowerPoint="exportToPowerPoint"
            :updateTextStyle="updateTextStyle"
            :activeObjectInfo="activeObjectInfo" 
            :removeActiveObjectContent="removeActiveObjectContent"/>

        <div class="canvas-and-layout">
            <CanvasLayoutList
                :updateActiveLayout="updateActiveLayout"
                :activeLayout="activeLayout"
                :options="options"/>

            <div class="layout-list-and-add-slide">
                <div class="canvas-list">
                    <div :id="`canvas-${objectArray.id}`" class="canvas" v-for="objectArray in canvasArray" :key="objectArray.id">
                        <ChartModal 
                            :class="modalState"
                            :closeModal="closeModal"
                            :updateCanvas="updateCanvas"/>
                        <MoveAble
                            v-for="object in objectArray.structure"
                            :key="object.id"
                            :openModal="openModal"
                            :activeCanvas="objectArray"
                            :updateActiveObjectInfo="updateActiveObjectInfo"
                            :updateText="updateText"
                            :mode="mode"
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
    import ChartModal from "../ChartModal/ChartModal.vue";

    export default {
        name: 'CanvasObject',
        props: {
            canvasArray: Array,
            layoutList: Array,
            activeLayout: Object,
            updateCanvas: Function,
            activeObjectInfo: Object,
            updateActiveObjectInfo: Function,
            saveData: Function,
            exportToPowerPoint: Function,
            updateText: Function,
            updateTextStyle: Function,
            changeMode: Function,
            mode: String,
            removeActiveObjectContent: Function
        },
        components: {
            MoveAble,
            CanvasLayoutList,
            CanvasObjectEditor,
            AddSlide,
            ChartModal
        },
        computed: {
            modalState: function(){
                if(!this.modalOpen){
                    return 'display-none'
                }else{
                    return ''
                }
            }
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
            },
            closeModal: function(){
                this.modalOpen = false
            },
            openModal: function(){
                return this.modalOpen = true
            },
            updateActiveEditOption(activeOption){
                this.activeEditOption = activeOption
            }
        },
        data(){
            return {
                options: ["layouts", "charts"],
                modalOpen: false,
                activeEditOption: "file"
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
        box-sizing: border-box;
        margin-left: 0;
        margin-right: 0;
    }
    .canvas-and-layout {
        display: flex;
        gap: 1rem;
        align-items: top;
        justify-content: center;
        margin-top: 8rem;
    }
    .layout-list-and-add-slide {
        margin-bottom: max(15vw, 15rem);
    }
    .canvas-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .canvas {
        width: max(50vw, 50rem);
        height: max(30vw, 30rem);
        background-color: white;
        position: relative;
        outline: 0.1rem solid #d4d4d4;
    }

    .display-none {
        display: none;
    }
</style>