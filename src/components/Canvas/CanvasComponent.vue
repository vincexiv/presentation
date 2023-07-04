<template>
    <div class="canvas-editor-layout">
        <CanvasObjectEditor
            :canvasArray="canvasArray"
            :activeEditOption="activeEditOption"
            :mode="mode"
            :slideObjectCreationState="slideObjectCreationState"
            :updateNewObjectCreationState="updateNewObjectCreationState"
            :changeMode="changeMode"
            :updateActiveEditOption="updateActiveEditOption"
            :saveData="saveData"
            :exportToPowerPoint="exportToPowerPoint"
            :updateTextStyle="updateTextStyle"
            :activeObjectInfo="activeObjectInfo" 
            :removeActiveObjectContent="removeActiveObjectContent"
            :removeSlide="removeSlide"
            :toggleShowLayout="toggleShowLayout"
            :showLayout="showLayout"
            :openModal="openModal"/>

        <div class="canvas-and-layout">
            <CanvasLayoutList
                :updateActiveLayout="updateActiveLayout"
                :activeLayout="activeLayout"
                :showLayout="showLayout"
                :addSlide="addSlide"
            />

            <CanvasObjectList 
                :activeObjectInfo="activeObjectInfo"
                :canvasArray="canvasArray"
                :convertSizeToViewWidths="convertSizeToViewWidths"/>

            <div class="layout-list-and-add-slide">
                <div class="canvas-list">
                    <div :id="`canvas-${objectArray.id}`"
                        :style="objectArray.style"
                        class="canvas"
                        :class="`${activeState(objectArray)} ${objectArray.layout}`"
                        v-for="objectArray in canvasArray"
                        :key="objectArray.id"
                        @click="(e)=>handleCanvasClick(e, objectArray.id, `canvas-${objectArray.id}`)">

                        <ChartModal 
                            :class="modalState"
                            :closeModal="closeModal"
                            :addChartToSlide="addChartToSlide"
                        />

                        <CanvasObject
                            v-for="object in objectArray.objects"
                            :key="object.id"
                            :openModal="openModal"
                            :activeCanvas="objectArray"
                            :updateActiveObjectInfo="updateActiveObjectInfo"
                            :activeObjectInfo="activeObjectInfo"
                            :updateText="updateText"
                            :mode="mode"
                            :object="object"
                            :target="`${object.content.type}${object.id}`"
                            :convertSizeToViewWidths="convertSizeToViewWidths"
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
    import AddSlide from "../AddSlide/AddSlide.vue";
    import ChartModal from "../ChartModal/ChartModal.vue";
    import CanvasObject from "../CanvasObject/CanvasObject.vue"
    import CanvasObjectList from "../CanvasObjectList/CanvasObjectList.vue"
    import { convertFontSize } from "@/utilities/functions/createppt"

    export default {
        name: 'CanvasComponent',
        props: {
            canvasArray: Array,
            layoutList: Array,
            activeLayout: Object,
            addChartToSlide: Function,
            activeObjectInfo: Object,
            updateActiveObjectInfo: Function,
            saveData: Function,
            exportToPowerPoint: Function,
            updateText: Function,
            updateTextStyle: Function,
            changeMode: Function,
            mode: String,
            removeActiveObjectContent: Function,
            removeSlide: Function,
            addNewObjectToSlide: Function
        },
        components: {
            CanvasObject,
            CanvasLayoutList,
            CanvasObjectEditor,
            AddSlide,
            ChartModal,
            CanvasObjectList
        },
        computed: {
            modalState: function(){
                if(!this.modalOpen){
                    return 'display-none'
                }else{
                    return ''
                }
            },
        },
        methods: {
            activeState: function(objectArray){
                if(this.activeObjectInfo.canvasId === objectArray.id){
                    return 'active'
                }else {
                    return ''
                }
            },

            convertSizeToViewWidths(val){
                return `${convertFontSize(val) * 0.072}vw`
            },

            addSlide: function(){
                this.$emit('add-slide')
            },

            handleCanvasClick: function(e, slideId, canvasId){
                //The slideId is the raw id of the object used to create the slide on the dom
                //canvasId here corresponds to the id of the canvas when represented on the dom


                // if a person clicked the canvas itself and not just an object inside it
                // clickedCanvasEmptySpace is a Boolean
                const clickedCanvasEmptySpace = e.target.id === canvasId
                
                // Person clicked an empty space in the slide and they are currently
                // in the process of creating a new object in the canvas
                if(clickedCanvasEmptySpace && this.slideObjectCreationState.active){
                    const slideRect = document.getElementById(canvasId).getBoundingClientRect()

                    const {top: t, left: l, width: w, height: h} = slideRect

                    const newObject = {
                        type: this.slideObjectCreationState.value?.type,
                        style: {
                            top: `${(e.clientY - t)/h * 100}%`,
                            left: `${(e.clientX - l)/w * 100}%`,
                            width: `36%`,
                            height: `64%`
                        },
                        content: {
                            type: this.slideObjectCreationState.value?.type,
                            placeholder: `Click to add ${this.slideObjectCreationState.value?.type}`,
                        }
                    }
                    
                    this.addNewObjectToSlide(slideId, newObject)
                }else if(clickedCanvasEmptySpace){
                    this.updateActiveObjectInfo({canvasId: slideId}, null, 'reset')
                }
            },

            updateNewObjectCreationState: function(newInfo){
                this.slideObjectCreationState = {...this.slideObjectCreationState, ...newInfo}
            },

            updateActiveLayout: function(layout){
                this.$emit('update-active-layout', layout)
            },

            closeModal: function(){
                this.modalOpen = false
            },

            openModal: function(){
                this.modalOpen = true
            },

            updateActiveEditOption(activeOption){
                this.activeEditOption = activeOption
            },

            toggleShowLayout(){
                this.showObject = false
                this.showLayout = !this.showLayout
            },

            toggleShowObject(){
                this.showLayout = false
                this.showObject = !this.showObject
            }
        },
        data(){
            return {
                showLayout: false,
                showObject: false,
                modalOpen: false,
                activeEditOption: "file",
                slideObjectCreationState: {active: false, value: {}}
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
        display: flex;
        flex-direction: column;
        /* width: 100rem; */
    }
    .canvas-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .canvas {
        background-color: white;
        position: relative;
        outline: 0.1rem solid #d4d4d4;
    }

    .canvas.LAYOUT_16x9{
        width: 56vw;
        height: 31.5vw;
    }

    .canvas.active {
        outline: 0.1rem solid #9e9e9e;
    }

    .display-none {
        display: none;
    }
</style>