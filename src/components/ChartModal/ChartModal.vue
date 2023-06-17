<template>
    <div class="chart-modal-container" @click="closeModal">
        <div class="chart-modal">

        </div>
    </div>
</template>

<script>
export default({
    name: "ChartModal",
    props: {
        closeModal: Function
    }
})
</script>

<style scoped>
.chart-modal-container {
    position: fixed;
    top: 4rem;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.3);
}

.chart-modal-container .chart-modal {
    position: relative;
    width: max(40rem, 40vw);
    top: 1rem;
    left: 50%;
    transform: translate(calc(-50% + 6rem), 0);
    height: 80vh;
    border-radius: 1rem;
    background-color: #d4d4d4;
}
</style>