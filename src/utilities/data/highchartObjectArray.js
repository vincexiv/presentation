import {employment, monthlyAverageTemperature} from './highchartCharts'

const highchartObjectArray = [
    {
        id: 1,
        title: "Chart Group 1",
        charts: [ 
            {...employment, id: 1}, 
            {...monthlyAverageTemperature, id: 2},
        ]
    },
    {
        id: 2,
        title: "Chart Group 2",
        charts: [ 
            {...employment, id: 1}, 
            {...monthlyAverageTemperature, id: 3}
        ]
    },
    {
        id: 3,
        title: "Chart Group 3",
        charts: [ 
            {...employment, id: 2}, 
            {...monthlyAverageTemperature, id: 3}
        ]
    }
]



export default highchartObjectArray;