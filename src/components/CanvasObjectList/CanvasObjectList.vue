<template>
    <div class="object-list-outer-container" :class="displayState">
        <div class="object-list-inner-container">
            <div v-for="object, i in activeCanvas?.objects || []"
                :key="`object-list-item-${object.id}`"
                class="object-list-item">

                <div class="item"
                @click="makeActive(object, activeCanvas)"
                :class="(object.id == activeObjectInfo.objectId) && (activeCanvas.id === activeObjectInfo.canvasId)? 'active': ''">
                    <p v-if="object.content.type === 'text'"
                        :style="objectListItemFont"
                        class="object-value">
                        {{ `${i+1}: ${object.content.value || object.content.type}` }}
                    </p>
                    <p v-else-if="object.content.type === 'chart'"
                        :style="objectListItemFont" 
                        class="object-value">
                        {{ `${i+1}: ${object.content?.value?.title?.text || object.content.type}`}}
                    </p>
                </div>

                <button class="delete-btn"
                    @click="deleteSlideObject(activeCanvas.id, object.id)"
                    :style="objectListButtonFont">
                    Delete
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default({
    name: "CanvasObjectList",

    props: {
        activeObjectInfo: Object,
        canvasArray: Array,
        convertSizeToViewWidths: Function,
        showObject: Boolean,
        updateActiveObjectInfo: Function,
        deleteSlideObject: Function
    },
    
    computed: {
        objectListItemFont: function(){
            return {fontSize: this.convertSizeToViewWidths('0.8rem')}
        },
        objectListButtonFont: function(){
            return {fontSize: this.convertSizeToViewWidths('0.8rem')}
        },
        activeCanvas: function () {
            return this.canvasArray
                        ?.find(canvas => canvas.id === this.activeObjectInfo.canvasId)
        },
        displayState: function(){
            return this.showObject? '': 'display-none'
        }
    },

    methods: {
        makeActive: function(object, activeCanvas){
            this.updateActiveObjectInfo({ 
                objectId: object.id,
                type: object.content.type,
                canvasId: activeCanvas.id,
                content: object.content
            })
        }
    }
})
</script>

<style scoped>
.object-list-outer-container.display-none {
    display: none;
}
.object-list-outer-container {
    width: 20vw;
}

.object-list-inner-container {
    width: 100%;
    height: 31.5vw;
    padding: 1rem;
    position: sticky;
    top: 12rem;
    outline: 0.1rem solid #d4d4d4;
}

.object-list-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.5vw;
    width: 100%;
    gap: 0.2rem;
}

.item {
    cursor: pointer;
    width: calc(14vw - 1.1rem);
    height: 1.5vw;
    display: flex;
    align-items: center;
    justify-content: left;
    background-color: transparent;
    border-radius: 0.5rem;
    padding: 0.1rem 0.5rem;  
    background-color: rgb(0, 119, 190, 0.2); 
    color: rgb(0, 0, 0, 0.6);
}

.item.active{
    background-color: #0077be;
    color: white;
}

.item:hover {
    outline: #0077be solid 0.1rem;
}

.object-value {
    background-color: transparent;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    overflow: hidden;
}

button {
    border: none;
    outline: none;
    cursor: pointer;
    color: rgba(220, 53, 69, 1);
    border-radius: 0.5rem;
    padding: 0.2rem 0.5rem;
    background-color: transparent;
    width: calc(6vw - 1.1rem);
    background-color: rgba(220, 53, 69, 0.3);
    /* color: white; */
}

button:hover {
    color: white;
    background-color: rgba(220, 53, 69, 1);;
}

</style>