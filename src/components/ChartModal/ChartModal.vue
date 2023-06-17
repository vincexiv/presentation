<template>
    <div class="chart-modal-container" @click="handleModalClick">
        <div class="chart-modal" @click="handleModalClick">
            <div class="chart-container">
                <vue-2-highcharts 
                    v-for="object in highchartObjectArray"
                    :options="object"
                    :key="object.id"
                    class="modal-highchart">
                </vue-2-highcharts>
            </div>
        </div>
    </div>
</template>

<script>
import highchartObjectArray from '@/utilities/data/highchartObjectArray';
import Vue2Highcharts from 'vue2-highcharts'

export default({
    name: "ChartModal",
    props: {
        closeModal: Function
    },
    components: {
        Vue2Highcharts
    },
    data(){
        return {
            highchartObjectArray: highchartObjectArray
        }
    },
    methods: {
        handleModalClick: function(e){
            const classList = Array.from(e.target.classList)

            // Close modal only if the outer side has been clicked
            if(classList.find(domItemClass => domItemClass === 'chart-modal-container')){
                this.closeModal()
            }
        }
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