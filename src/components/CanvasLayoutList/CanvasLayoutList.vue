<template>
    <div class="layout-list-container">
        <div class="sticky">
            <div v-for="layout in layoutList" :key="layout.id" class="layout-list-object" @click="updateLayout(layout)">
                <div v-for="layoutStructure in layout.structure" :key="layoutStructure.id">
                    <div v-if="layoutStructure.type == 'chart'"
                        :class="layoutStructure.type"
                        :style="layoutStructure.style"
                        class="layout-object">
                    </div>
                    <div v-else-if="layoutStructure.type == 'text'"
                        :class="layoutStructure.type"
                        :style="layoutStructure.style"
                        class="layout-object">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import layoutList from "../../utilities/data/layoutlist"

export default {
    name: "CanvasLayoutList",
    props: {
        updateActiveLayout: Function
    },
    data(){
        return {
            layoutList: layoutList
        }
    },
    methods: {
        getStyle: function(structure){
            console.log("here is the structure: ", structure)
            return {
                position: "absolute",
                top: structure.top,
                left: structure.left,
                width: structure.right,
                height: structure.height,
                backgroundColor: "yellow"
            }
        },
        updateLayout(layout){
            this.updateActiveLayout(layout)
        }
    }
}
</script>

<style>
.layout-list-object {
    position: relative;
    width: 10rem;
    height: 7rem;
    outline: solid #d4d4d4 0.15rem;
}

.layout-list-container .sticky {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: sticky;
    top: 5rem;
}

.layout-list-object .layout-object {
    position: absolute;
    outline: solid #d4d4d4 0.05rem;
}
</style>