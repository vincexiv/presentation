<template>
    <div :class="showLayout? 'active': 'hidden'" class="layout-list-container">
        <div class="sticky" ref="layouts">
            <div v-for="layout in layoutList"
                :key="layout.id"
                class="layout-list-object"
                @click="updateLayout(layout)"
                :id="`layout-${layout.id}`">

                <div v-for="layoutStructure in layout.structure" :key="layoutStructure.id">
                    <div v-if="layoutStructure.type == 'chart'"
                        :class="layoutStructure.type"
                        :style="layoutStructure.style"
                        class="layout-object">
                        <i class="fa-sharp fa-3x fa-solid fa-chart-simple"></i>
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
        updateActiveLayout: Function,
        activeLayout: Object,
        options: Array,
        showLayout: Boolean
    },
    data(){
        return {
            layoutList: layoutList
        }
    },
    mounted: function(){
        this.updateLayout(this.activeLayout)
    },
    methods: {
        getStyle: function(structure){
            return {
                position: "absolute",
                top: structure.top,
                left: structure.left,
                width: structure.width,
                height: structure.height,
                backgroundColor: "yellow"
            }
        },
        updateLayout(layout){
            const layoutId = layout.id

            const availableLayouts = this.$refs.layouts.querySelectorAll('.layout-list-object')
            availableLayouts.forEach(layout => {
                layout.classList.remove('active')
            })

            const layoutObject = this.$refs.layouts.querySelector(`#layout-${layoutId}`)
            layoutObject.classList.add("active")

            this.updateActiveLayout(layout)
        }
    },
    computed: {
        layoutActiveClass: function(layout){
            if(this.activeLayout.id == layout.id){
                return "active"
            }else {
                return ""
            }
        }
    }
}
</script>

<style scoped>
.layout-list-container.hidden {
    display: none;
}

.layout-list-object {
    position: relative;
    width: 11rem;
    height: 7rem;
    outline: solid #d4d4d4 0.15rem;
    cursor: pointer;
    background-color: white;
}

.layout-list-object.active {
    outline: solid #8f8e8e 0.15rem;
}

.layout-list-object:hover {
    outline: solid #8f8e8e 0.15rem;
}

.layout-list-container .sticky {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: sticky;
    top: 12rem;
}

.layout-list-object .layout-object {
    position: absolute;
    outline: solid #d4d4d4 0.05rem;
    background-color: white;
}

.layout-list-container .chart {
    display: grid;
    place-items: center;
    color: #d4d4d4;
}

.layout-list-container .chart i {
    background-color: transparent;
}
</style>