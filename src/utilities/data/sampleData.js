import { monthlyAverageTemperature } from "./highchartCharts";

// Each object in this array shows the how objects should be arranged in a particular
// canvas. In this example, there is only one object in the canvas, but it could be more
const canvasArray = [
    {
        id: 1,
        structure: [
            {
                id: "text-1",
                type: "text",
                typeDetails: { category: "title" }, //category can be title or content
                defaultContent: "Click to add title",
                style: { top: "5%", left: "5%", width: "90%", height: "20%"}, // position and size where this text will be on the canvas
                content: {
                        text: "My awesome title",
                        style: {} // the style of particular content. e.g the the text can be bold, red, etc.
                    }
            },
            {
                id: "text-2",
                type: "text",
                typeDetails: { category: "content" }, //category can be title or content
                defaultContent: "Click to add text",
                style: { top: "30%", left: "5%", width: "24%", height: "65%" },
                content: {
                        text: "My awesome paragraph",
                        style: {}
                    }
            },
            {
                id: "chart-1",
                type: "chart",
                defaultContent: "Click to add text",
                style: { top: "30%", left: "31%", width: "64%", height: "65%" },
                content: monthlyAverageTemperature
            }
        ]
    }
]

export default canvasArray;