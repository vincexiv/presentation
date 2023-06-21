<template>
    <div class="canvas-object-editor-container">
        <div class="object-editor">
            <div class="switchers">
                <div class="option" 
                    :class="editOptionClass('canvas')"
                    @click="updateActiveEditOption('canvas')">
                    Canvas
                </div>
                <div class="option" 
                    :class="editOptionClass('text')"
                    @click="updateActiveEditOption('text')">
                    Text
                </div>
                <div class="option" 
                    :class="editOptionClass('chart')"
                    @click="updateActiveEditOption('chart')">
                    Chart
                </div>
            </div>
            <div class="details">
                <p class="action" @click="saveData()">Save</p>
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
            saveData: Function
        },
        methods: {
            editOptionClass: function (editOption){
                if(this.activeEditOption == editOption){
                    return 'active'
                }else {
                    return ''
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

.option.active {
    border-bottom: solid 0.1rem rgba(255, 255, 255, 0.7) ;
}

.details {
    background-color: transparent;
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
    cursor: pointer;
    color: rgba(0, 119, 190, 1);
}

.action:hover {
    opacity: 0.8;
}
</style>