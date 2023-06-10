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
                content: [
                    {
                        id: "title-1",
                        content: "My awesome title",
                        style: {} // the style of particular content. e.g the the text can be bold, red, etc.
                    }
                ]
            },
            {
                id: "text-2",
                type: "text",
                typeDetails: { category: "content" }, //category can be title or content
                defaultContent: "Click to add text",
                style: { top: "30%", left: "5%", width: "44%", height: "65%" },
                content: [
                    {
                        id: "paragraph-1",
                        content: "My awesome paragraph",
                        style: {}
                    }
                ]
            },
            {
                id: "chart-1",
                type: "chart",
                defaultContent: "Click to add text",
                style: { top: "30%", left: "51%", width: "44%", height: "65%" },
                content: {
                    title: {
                        text: 'U.S Solar Employment Growth by Job Category, 2010-2020',
                        align: 'left'
                    },
                
                    subtitle: {
                        text: 'Source: <a href="https://irecusa.org/programs/solar-jobs-census/" target="_blank">IREC</a>',
                        align: 'left'
                    },
                
                    yAxis: {
                        title: {
                            text: 'Number of Employees'
                        }
                    },
                
                    xAxis: {
                        accessibility: {
                            rangeDescription: 'Range: 2010 to 2020'
                        }
                    },
                
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle'
                    },
                
                    plotOptions: {
                        series: {
                            label: {
                                connectorAllowed: false
                            },
                            pointStart: 2010
                        },
                        enableMouseTracking: false
                    },
                
                    series: [{
                        name: 'Installation & Developers',
                        data: [43934, 48656, 65165, 81827, 112143, 142383,
                            171533, 165174, 155157, 161454, 154610]
                    }, {
                        name: 'Manufacturing',
                        data: [24916, 37941, 29742, 29851, 32490, 30282,
                            38121, 36885, 33726, 34243, 31050]
                    }, {
                        name: 'Sales & Distribution',
                        data: [11744, 30000, 16005, 19771, 20185, 24377,
                            32147, 30912, 29243, 29213, 25663]
                    }, {
                        name: 'Operations & Maintenance',
                        data: [null, null, null, null, null, null, null,
                            null, 11164, 11218, 10077]
                    }, {
                        name: 'Other',
                        data: [21908, 5548, 8105, 11248, 8989, 11816, 18274,
                            17300, 13053, 11906, 10073]
                    }],
                
                    responsive: {
                        rules: [{
                            condition: {
                                height: 10
                            },
                            chartOptions: {
                                legend: {
                                    layout: 'horizontal',
                                    align: 'center',
                                    verticalAlign: 'bottom'
                                }
                            }
                        }]
                    }
                                   
                }
            }
        ]
    }
]

export default canvasArray;