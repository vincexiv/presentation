<template>
    <div class="layout-list-container">
        <div v-for="layout in layoutList" :key="layout.id" class="layout-list-object">
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
</template>

<script>
import layoutList from "../../utilities/data/layoutlist"

export default {
    name: "CanvasLayoutList",
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
        }
    }
}
</script>

<style>
.layout-list-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
.layout-list-object {
    position: relative;
    width: 10rem;
    height: 7rem;
    outline: solid #d4d4d4 0.15rem;
}

.layout-list-object .layout-object {
    position: absolute;
    outline: solid #d4d4d4 0.05rem;
}
</style>