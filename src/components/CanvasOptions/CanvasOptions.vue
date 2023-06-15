<template>
    <div class="canvas-options" ref="target">
        <button v-for="option in options" :key="option" :id="option" @click="makeActive">
            {{ option }}
        </button>
    </div>
</template>

<script>
export default ({
    name: "CanvasOptions",
    props: {
        updateActiveOption: Function,
        options: Array
    },
    mounted: function(){
        const activeOption = this.$refs.target.querySelector(`#${this.activeOption}`)
        activeOption.classList.add("active")
    },
    methods: {
        makeActive: function(e){
            const activeButton = e.target
            const allOptions = this.$refs.target.querySelectorAll('button')

            allOptions.forEach(option => {
                option.classList.remove('active')
            })

            activeButton.classList.add('active')
        }
    },
    data(){
        return {
            activeOption: this.options[0]
        }
    }
})

</script>

<style scoped>
.canvas-options {
    height: max-content;
    display: flex;
    gap: 0.5rem;
    cursor: pointer;
}

.canvas-options button {
    padding: 0.2rem 0.6rem 0.2rem 0.6rem;
    cursor: pointer;
    border-radius: 0.5rem;
    outline: none;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
}

.canvas-options button.active {
    background-color: #949393;
}
</style>