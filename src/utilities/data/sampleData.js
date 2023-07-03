import { monthlyAverageTemperature } from "./highchartCharts";

// Each object in this array shows the how objects should be arranged in a particular
// canvas. In this example, there is only one object in the canvas, but it could be more
const sampleData = [
    {
        id: 4,
        layout: 'LAYOUT_16x9',
        objects: [
            { 
                id: 1, 
                typeDetails: { category: "title" },
                style: {top: "5%", left: "5%", width: "90%", height: "20%" },
                content: {
                    type: "text", 
                    placeholder: "Click to add title", 
                    style: {
                        fontSize: "2rem",
                        // verticalAlign: "middle"
                    }
                }
            },
            { 
                id: 2, 
                typeDetails: { category: "content" },
                style: {top: "30%", left: "5%", width: "44%", height: "65%" },
                content: {
                    type: "text", 
                    placeholder: "Click to add text", 
                }
            },
            { 
                id: 3, 
                style: {top: "30%", left: "51%", width: "44%", height: "65%" },
                content: {
                    type: "chart", 
                    placeholder: "Click to add chart", 
                    value: monthlyAverageTemperature
                }
            }
        ]
    }
]

export default sampleData;