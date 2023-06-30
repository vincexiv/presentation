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
                    Layout
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
                <div v-else-if="activeEditOption==='text'"
                    class="file-option-details actions"
                    :class="muteState('text')">
                    <label v-if="muteState('text') !== 'muted'" for="text-color" class="action">Color
                        <input type="color" ref="colorValue" @change="action('text', updateStyle)"/>
                    </label>
                    <div v-else class="action">Color</div>
                </div>
                <div v-else-if="activeEditOption==='chart'"
                    class="file-option-details actions"
                    :class="muteState('chart')">
                    <button v-if="muteState('chart') !== 'muted'" class="action" @click="action('chart', removeChart)">Remove Chart</button>
                    <div v-else class="action">Remove Chart</div>
                </div>
                <div v-else-if="activeEditOption==='layout'"
                    class="file-option-details actions"
                    :class="muteState('layout')">
                    <button v-if="muteState('layout') !== 'muted'" class="action" @click="action('layout', showUnshowLayout)">
                        {{ showLayout? "Hide Layout" : "Show Layout" }}
                    </button>
                </div>
                <div v-else-if="activeEditOption==='slide'"
                    class="file-option-details actions"
                    :class="muteState('slide')">
                    <button v-if="muteState('slide') !== 'muted'" class="action" @click="action('slide', removeSlide)">Remove Slide</button>
                    <div v-else class="action">Remove Slide</div>
                </div>
                <div v-else-if="activeEditOption==='mode'"
                    class="file-option-details actions">
                    <button class="action" @click="changeMode('edit')">Edit</button>
                    <button class="action" @click="changeMode('preview')">Preview</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default ({
        name: "CanvasObjectEditor",
        props: {
            activeEditOption: String,
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
            showLayout: Boolean
        },
        methods: {
            editOptionClass: function (editOption){
                if(this.activeEditOption == editOption){
                    return 'active'
                }else {
                    return ''
                }
            },
            isNotMuted: function(option){
                if(option === 'slide' || option === 'layout'){
                    return true
                }else{
                    return option === this.activeObjectInfo.type
                }
            },
            action: function(option, actionMethod){
                if(this.isNotMuted(option)){
                    actionMethod()
                }
            },
            showUnshowLayout: function(){
                this.toggleShowLayout()
            },
            updateStyle: function(){
                const newColor= this.$refs.colorValue.value
                this.updateTextStyle({ color: newColor })
            },
            removeChart: function(){
                if(this.activeObjectInfo.type === 'chart'){
                    this.removeActiveObjectContent()
                }
            },
            muteState: function(action){
                if(action === 'slide' || action === 'layout'){
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

.action:hover {
    opacity: 0.8;
}

button {
    outline: none;
    border: none;
}

.action input {
    width: 1rem;
    height: 1rem;
    /* outline: none; */
    border: none;
    margin-left: 0.5rem;
}
</style>