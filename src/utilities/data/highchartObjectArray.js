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
            {id: 1, ...employment}, 
            {id: 2, ...monthlyAverageTemperature},
            {id: 3, ...tourDeFrance}
        ]
    },
    {
        id: 1,
        title: "Chart Group 2",
        charts: [ 
            {id: 1, ...employment}, 
            {id: 2, ...tourDeFrance},
            {id: 3, ...monthlyAverageTemperature}
        ]
    },
    {
        id: 1,
        title: "Chart Group 3",
        charts: [ 
            {id: 1, ...tourDeFrance},
            {id: 2, ...employment}, 
            {id: 3, ...monthlyAverageTemperature}
        ]
    }
]



export default highchartObjectArray;