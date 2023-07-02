<template>
    <div class="canvas-editor-layout">
        <CanvasObjectEditor
            :activeEditOption="activeEditOption"
            :mode="mode"
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
                :addSlide="addSlide"/>

            <div class="layout-list-and-add-slide">
                <div class="canvas-list">
                    <div :id="`canvas-${objectArray.id}`"
                        :style="objectArray.style" class="canvas"
                        :class="`${activeState(objectArray)} ${objectArray.layout}`"
                        v-for="objectArray in canvasArray"
                        :key="objectArray.id">

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
                            :updateText="updateText"
                            :mode="mode"
                            :object="object"
                            :target="`${object.content.type}${object.id}`"
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
            removeSlide: Function
        },
        components: {
            CanvasObject,
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
                this.modalOpen = true
            },
            updateActiveEditOption(activeOption){
                this.activeEditOption = activeOption
            },
            toggleShowLayout(){
                console.log("toggling show layout")
                this.showLayout = !this.showLayout
            }
        },
        data(){
            return {
                showLayout: false,
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