<template>
    <div class="canvas-object-editor-container">
        <div class="object-editor">

            <div class="switchers">
                <div class="option" 
                    :class="editOptionClass('file')"
                    @click="updateActiveEditOption('file')">
                    File
                </div>
                <div class="option" 
                    :class="editOptionClass('slide')"
                    @click="updateActiveEditOption('slide')">
                    Slide
                </div>
                <div class="option" 
                    :class="editOptionClass('object')"
                    @click="updateActiveEditOption('object')">
                    Objects
                </div>
                <div class="option" 
                    :class="`${editOptionClass('text')} ${muteState('text')}`"
                    @click="updateActiveEditOption('text')">
                    Text
                </div>
                <div class="option" 
                    :class="`${editOptionClass('chart')} ${muteState('chart')}`"
                    @click="updateActiveEditOption('chart')">
                    Chart
                </div>
                <div class="option" 
                    :class="`${editOptionClass('layout')} ${muteState('layout')}`"
                    @click="updateActiveEditOption('layout')">
                    Layouts
                </div>
                <div class="option mode" 
                    :class="editOptionClass('mode')"
                    @click="updateActiveEditOption('mode')">
                    {{ `Mode: ${mode}` }}
                </div>
            </div>


            <div class="details">
                <div v-if="activeEditOption==='file'"
                    class="file-option-details actions">
                    <button class="action" @click="saveData()">Save</button>
                    <button class="action" @click="exportToPowerPoint()">export to powerpoint</button>
                </div>

                <div v-else-if="activeEditOption==='object'"
                    class="file-option-details actions">
                    <button class="action" @click="(e)=>action('object', toggleShowObject, e)">
                        {{ showObject? "Hide" : "Show" }}
                    </button>
                </div>

                <div v-else-if="activeEditOption==='text'"
                    class="file-option-details actions"
                    :class="muteState('text')">

                    <div class="action-container">
                        <button v-if="muteState('text') !== 'muted'"
                            class="action"
                            :class="slideObjectCreationState.active? 'active': ''"
                            @click="(e)=>action('text', toggleObjectCreationState, e)">New</button>
                        <div v-else class="action">New</div>
                    </div>

                    <div class="action-container">
                        <div v-if="muteState('text') !== 'muted'" class="action">
                            <label for="text-color">Color: </label>
                            <input class="color"
                                name="text-color"
                                type="color"
                                ref="colorValue"
                                :value="textColor"
                                @change="(e)=>action('text', updateColor, e)"/>
                        </div>
                        <div v-else class="action">Color</div>
                    </div>

                    <div class="action-container">
                        <div v-if="muteState('text') !== 'muted'" class="action">
                            <label for="text-size" >Size: </label>
                            <input name="text-size"
                                type="number"
                                ref="sizeValue"
                                min="1"
                                max="256"
                                :value="textSize"
                                @change="(e)=>action('text', updateFontSize, e)"/>
                        </div>
                        <div v-else class="action">Size</div>
                    </div>

                    <div class="action-container">
                        <button v-if="muteState('text') !== 'muted'"
                            class="action bold"
                            :class="isBold()? 'active': ''"
                            @click="(e)=>action('text', updateBold, e)">Bold</button>
                        <div v-else class="action bold">Bold</div>
                    </div>

                    <div class="action-container">
                        <button v-if="muteState('text') !== 'muted'"
                            class="action italic"
                            :class="isItalic()? 'active': ''"
                            @click="(e)=>action('text', updateItalic, e)">Italic</button>
                        <div v-else class="action italic">Italic</div>
                    </div>
                </div>

                <div v-else-if="activeEditOption==='chart'"
                    class="file-option-details actions"
                    :class="muteState('chart')">
                    <div class="action-container">
                        <button v-if="muteState('chart') !== 'muted'" class="action" @click="(e)=>action('chart', removeChart, e)">Remove</button>
                        <div v-else class="action">Remove</div>
                    </div>
                    <div class="action-container">
                        <button v-if="muteState('chart') !== 'muted'" class="action" @click="(e)=>action('chart', replaceChart, e)">Replace</button>
                        <div v-else class="action">Replace</div>
                    </div>
                </div>

                <div v-else-if="activeEditOption==='layout'"
                    class="file-option-details actions"
                    :class="muteState('layout')">
                    <button v-if="muteState('layout') !== 'muted'" class="action" @click="(e)=>action('layout', showUnshowLayout, e)">
                        {{ showLayout? "Hide" : "Show" }}
                    </button>
                </div>

                <div v-else-if="activeEditOption==='slide'"
                    class="file-option-details actions"
                    :class="muteState('slide')">
                    <button v-if="muteState('slide') !== 'muted'" class="action" @click="(e)=>action('slide', removeSlide, e)">Remove</button>
                    <div v-else class="action">Remove</div>
                </div>

                <div v-else-if="activeEditOption==='mode'"
                    class="file-option-details actions">
                    <button class="action"
                        :class="mode === 'edit'? 'active': ''"
                        @click="changeMode('edit')">
                        Edit
                    </button>
                    <button class="action"
                        :class="mode === 'preview'? 'active': ''"
                        @click="changeMode('preview')">
                        Preview
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {convertFontSize } from "../../utilities/functions/createppt"

export default ({
        name: "CanvasObjectEditor",

        props: {
            activeEditOption: String,
            canvasArray: Array,
            updateActiveEditOption: Function,
            saveData: Function,
            exportToPowerPoint: Function,
            updateTextStyle: Function,
            changeMode: Function,
            activeObjectInfo: Object,
            removeActiveObjectContent: Function,
            mode: String,
            removeSlide: Function,
            toggleShowLayout: Function,
            showLayout: Boolean,
            openModal: Function,
            slideObjectCreationState: Object,
            updateNewObjectCreationState: Function,
            showObject: Boolean,
            toggleShowObject: Function
        },

        computed: {
            textSize: function(){
                return convertFontSize(this.activeObjectInfo.content?.style?.fontSize)
            },
            textColor: function(){
                return this.activeObjectInfo.content?.style?.color || "#000"
            }
        },

        methods: {
            editOptionClass: function (editOption){
                if(this.activeEditOption == editOption){
                    return 'active'
                }else {
                    return ''
                }
            },

            toggleObjectCreationState: function(option){
                if(this.slideObjectCreationState.active){
                    this.updateNewObjectCreationState({active: false, value: null})
                }else {
                    const newObject = {
                        type: option,
                        value: `Click to add ${option}`
                    }
    
                    this.updateNewObjectCreationState({active: true, value: newObject})
                }
            },

            isBold: function(){
                if(this.activeObjectInfo.type === 'text'){
                    return this.activeObjectInfo.content?.style?.fontWeight === 'bold'
                }else {
                    return false
                }
            },

            isItalic: function(){
                if(this.activeObjectInfo.type === 'text'){
                    return this.activeObjectInfo.content?.style?.fontStyle === 'italic'
                }else {
                    return false
                }
            },

            updateColor: function(){
                const newColor= this.$refs.colorValue.value
                this.updateTextStyle({ color: newColor })
            },

            updateBold: function(){
                if(this.isBold()){
                    this.updateTextStyle({ fontWeight: 'normal' })
                }else{
                    this.updateTextStyle({ fontWeight: 'bold' })
                }
            },

            updateItalic: function(){
                if(this.isItalic()){
                    this.updateTextStyle({ fontStyle: 'normal' })
                }else{
                    this.updateTextStyle({ fontStyle: 'italic' })
                }
            },

            updateFontSize: function(){
                const newFontSize = this.$refs.sizeValue.value
                this.updateTextStyle({ fontSize: `${newFontSize}px` })
            },

            isNotMuted: function(option){
                if(['slide', 'layout', 'object', 'mode'].find(o => o === option)){
                    return true
                }else{
                    return option === this.activeObjectInfo.type
                }
            },

            action: function(option, actionMethod, e){
                if(this.isNotMuted(option)){
                    actionMethod(option, e)
                }
            },

            showUnshowLayout: function(){
                this.toggleShowLayout()
            },

            removeChart: function(){
                if(this.activeObjectInfo.type === 'chart'){
                    this.removeActiveObjectContent()
                }
            },

            replaceChart: function(){
                if(this.activeObjectInfo.type === 'chart'){
                    this.removeActiveObjectContent()
                    this.openModal()
                }
            },
            
            muteState: function(action){
                // We want to always make the slide and layout options look active
                if(this.isNotMuted(action)){
                    return 'not-muted'
                }else if(this.activeObjectInfo.type !== action){
                    return 'muted'
                }else{
                    return 'not-muted'
                }
            }
        }
    })
</script>

<style scoped>
.canvas-object-editor-container {
    width: 100%;
    height: 7rem;
    background-color: transparent;
    position: fixed;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(1rem);
    -webkit-backdrop-filter: blur(1rem);
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
    gap: 1rem;
}

.option {
    font-size: 0.8rem;
    padding: 0.2em;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    cursor: pointer;
}

.muted {
    opacity: 0.4;
}

.option.active {
    border-bottom: solid 0.1rem rgba(255, 255, 255, 0.7) ;
}

.actions, .details {
    background-color: transparent;
    display: flex;
    gap: 1rem;
    align-items: center;
}

.actions .action-container {
    background-color: transparent;
}

.details {
    height: 50%;
}

.actions:not(.muted) .action{
    cursor: pointer;
}

.action {
    width: max-content;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.7rem;
    background-color: #f7f7f7;
    padding: 0.2rem 0.7rem 0.2rem 0.7rem;
    border-radius: 0.5em;
    color: rgba(0, 119, 190, 1);
}

.action.active {
    color: #f7f7f7;
    background-color: rgba(220, 53, 69, 1);
}

.action.bold {
    font-weight: bold;
}

.action.italic {
    font-style: italic;
}

.action:hover {
    opacity: 0.8;
}

button {
    outline: none;
    border: none;
}
.action input {
    width: 3rem;
    height: 1rem;
    outline: none;
    border: none;
    margin-left: 0.5rem;
}

input.color {
    width: 2rem;
}

</style>