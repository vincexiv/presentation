<template>
    <div class="chart-modal-outer-container" @click="handleModalClick">
        <div class="chart-modal-inner-container" @click="handleModalClick">
            <div class="chart-modal">
                <div v-for="chartArray in highchartObjectArray" :key="`chart-array-${chartArray.id}`" class="chart-array">
                    <div class="chart-title">
                        <p>{{ chartArray.title }}</p>
                    </div>
                    <div class="chart-list">
                        <div class="chart-container" v-for="object in chartArray.charts" :key="`highchart-object-${object.id}`">
                            <vue-2-highcharts :options="object" class="modal-highchart">
                            </vue-2-highcharts>
                        </div>
                    </div>
                </div>
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
            if(classList.find(domItemClass => domItemClass === 'chart-modal-outer-container')){
                this.closeModal()
            }
        }
    }
})
</script>

<style scoped>
.chart-modal-outer-container {
    position: fixed;
    top: 4rem;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.3);
}

.chart-modal-outer-container .chart-modal-inner-container {
    position: relative;
    width: max(45rem, 45vw);
    top: 1rem;
    left: 50%;
    transform: translate(calc(-50% + 6rem), 0);
    height: 80vh;
    border-radius: 1rem;
    background-color: #d4d4d4;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 2rem;
    justify-content: center;
    /* overflow-y: scroll; */
}

.chart-modal-outer-container .chart-modal {
    overflow-y: scroll;
    height: 85vh;
}

.chart-modal-outer-container .chart-array {
    width: 100%;
}

.chart-modal-outer-container .chart-list {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.chart-modal-inner-container .chart-container {
    width: 19rem;
    height: 12.7rem;
    padding: 0.1rem;
}

.chart-container .modal-highchart {
    height: 0;
    width: 0;
    transform: scale(0.5);
}
</style>