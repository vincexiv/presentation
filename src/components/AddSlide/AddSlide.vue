<template>
    <div class="add-slide">
        <div class="horizontal-rule">
            <hr width="100%" height="0.1rem"/>
        </div>
        <p class="title" @click="addSlide">Add Slide</p>
        <div class="horizontal-rule">
            <hr width="100%" height="0.1rem"/>
        </div>
    </div>
</template>

<script>
export default ({
    name: "AddSlide",
    props: {
        addSlide: {
            type: Function,
            default(){
                return
            }
        }
    }
})
</script>

<style scoped>
.add-slide {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: center;
    width: max(50vw, 50rem);
}

.add-slide .title {
    width: 7rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 0.9rem;
}

.add-slide .title:hover {
    outline: solid 0.1rem #d4d4d4;
}

.horizontal-rule {
    width: calc(max(25vw, 25rem) - 7rem);
}
</style>