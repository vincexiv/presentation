import {employment, monthlyAverageTemperature, tourDeFrance} from './highchartCharts'

// The data expected here is in the following format
// [
//     id: <id>,
//     title: <title>
//     charts: [
//         {<highchart object options>},
//         {<highchart object options>}
//     ]
// ]

const highchartObjectArray = [
    {
        id: 1,
        title: "Chart Group 1",
        charts: [ 
            {...employment, id: 1}, 
            {...monthlyAverageTemperature, id: 2},
            {...tourDeFrance, id: 3}
        ]
    },
    {
        id: 2,
        title: "Chart Group 2",
        charts: [ 
            {...employment, id: 1}, 
            {...tourDeFrance, id: 2},
            {...monthlyAverageTemperature, id: 3}
        ]
    },
    {
        id: 3,
        title: "Chart Group 3",
        charts: [ 
            {...tourDeFrance, id: 1},
            {...employment, id: 2}, 
            {...monthlyAverageTemperature, id: 3}
        ]
    }
]



export default highchartObjectArray;