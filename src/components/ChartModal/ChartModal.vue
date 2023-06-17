<template>
    <div class="chart-modal-outer-container" @click="handleModalClick">
        <div class="chart-modal-inner-container" @click="handleModalClick">
            <div class="chart-modal" ref="chartModal">
                <div v-for="chartArray in highchartObjectArray" :key="`chart-array-${chartArray.id}`" class="chart-array">
                    <div class="chart-title">
                        <p>{{ chartArray.title }}</p>
                    </div>
                    <div class="chart-list">
                        <div class="chart-container"
                            v-for="object in chartArray.charts"
                            :key="`highchart-object-${chartArray.id}-${object.id}`"
                            @click="makeActive">
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
            highchartObjectArray: this.disableMouseTracking(highchartObjectArray)
        }
    },
    methods: {
        handleModalClick: function(e){
            const classList = Array.from(e.target.classList)

            // Close modal only if the outer side has been clicked
            if(classList.find(domItemClass => domItemClass === 'chart-modal-outer-container')){
                this.closeModal()
            }
        },
        makeActive: function(e){
            e.preventDefault()
            const chartContainers = this.$refs.chartModal.querySelectorAll('.chart-list .chart-container')
            chartContainers.forEach(container => {
                container.classList.remove('active')
            })
            console.log("chart containers: ", chartContainers)
            e.target.classList.add('active')
            console.log("e.target: ", e.target)
        },
        disableMouseTracking: function(highchartObjectArray){
            // return the chart options (object) as is but
            // disable mouse tracking on it
            return highchartObjectArray.map(category => {
                return {
                    ...category,

                    // Each object is in the form; {id: <id>... charts: []}
                    // the "charts" is an array of highcharts objects.
                    // Here, we add the "enableMouseTracking: false" to the
                    // plot options which is among the options inside the
                    // highchart object
                    charts: category.charts.map(chart => {
                        let plotOptions = chart.plotOptions
                        let series = null

                        if(plotOptions){
                            series = chart.plotOptions.series
                        }

                        if(plotOptions && series){
                            // Both exist, we don't want to modify existing information
                            // simply add "enableMousetracking: false" to whatever already exist
                            return {
                                ...chart,
                                plotOptions: {
                                    ...chart.plotOptions,
                                    series: {
                                        ...chart.plotOptions.series,
                                        enableMouseTracking: false
                                    }
                                }
                            }
                        }else if (plotOptions && !series) {
                            return {
                                ...chart,
                                plotOptions: {
                                    ...chart.plotOptions,
                                    series: {
                                        enableMouseTracking: false
                                    }
                                }
                            }
                        }else if (!plotOptions && !series){
                            return {
                                ...chart,
                                plotOptions: {
                                    series: {
                                        enableMouseTracking: false
                                    }
                                }
                            }
                        }
                    })
                }
            })
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
    height: 84vh;
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
    padding: 0.5rem;
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
    cursor: pointer;
}

.chart-container .modal-highchart {
    height: 0;
    width: 0;
    transform: scale(0.5);
}

.chart-list .active {
    outline: 0.1rem solid blue;
}
</style>