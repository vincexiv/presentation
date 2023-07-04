const layoutList = [
    {
        id: 0,
        style: {},
        layout: 'LAYOUT_16x9', //Find more about pptxjs supported layouts here; https://gitbrent.github.io/PptxGenJS/docs/usage-pres-options/
        objects: [
            { 
                id: 1, 
                typeDetails: { category: "title" },
                style: {top: "20%", left: "5%", width: "90%", height: "20%" },
                content: {
                    type: "text",
                    placeholder: "Click to add title",
                    value: null,
                    style: {
                        fontSize: "2rem",
                        // verticalAlign: "middle"
                    }
                }
            },
            { 
                id: 2, 
                typeDetails: { category: "content" },
                style: {top: "45%", left: "5%", width: "90%", height: "40%" },
                content: {
                    type: 'text',
                    placeholder: "Click to add text",
                    value: null,
                    style: {}
                }
            }
        ]
    },
    {
        id: 1,
        style: {},
        layout: 'LAYOUT_16x9',
        objects: [
            { 
                id: 1, 
                typeDetails: { category: "title" },
                style: {top: "5%", left: "5%", width: "90%", height: "20%" },
                content: {
                    type: "text", 
                    placeholder: "Click to add title",
                    value: null,
                    style: {
                        fontSize: "2rem",
                        // verticalAlign: "middle"
                    }
                }
            },
            { 
                id: 2, 
                typeDetails: { category: "content" },
                style: {top: "30%", left: "5%", width: "90%", height: "65%" },
                content: {
                    type: "text", 
                    placeholder: "Click to add text",
                    value: null,
                    style: {},
                }
            }
        ]
    },
    {
        id: 2,
        style: {},
        layout: 'LAYOUT_16x9',
        objects: [
            { 
                id: 1, 
                typeDetails: { category: "title" },
                style: {top: "5%", left: "5%", width: "90%", height: "20%" },
                content: {
                    type: "text", 
                    placeholder: "Click to add title", 
                    value: null,
                    style: {
                        fontSize: "2rem",
                        // verticalAlign: "middle"
                    }
                }
            },
            { 
                id: 2, 
                typeDetails: {category: "content"},
                style: {top: "30%", left: "5%", width: "44%", height: "65%" },
                content: {
                    type: "text", 
                    placeholder: "Click to add text",
                    value: null,
                    style: {},
                }
            },
            { 
                id: 3, 
                typeDetails: {category: "content"},
                style: {top: "30%", left: "51%", width: "44%", height: "65%" },
                content: {
                    type: "text", 
                    placeholder: "Click to add text", 
                    value: null,
                    style: {},
                }
            }
        ]
    },
    {
        id: 3,
        style: {},
        layout: 'LAYOUT_16x9',
        objects: [
            { 
                id: 1, 
                typeDetails: { category: "title" },
                style: {top: "5%", left: "5%", width: "90%", height: "20%" },
                content: {
                    type: "text", 
                    placeholder: "Click to add title",
                    value: null, 
                    style: {
                        fontSize: "2rem",
                        // verticalAlign: "middle"
                    }
                }
            },
            { 
                id: 2, 
                style: {top: "30%", left: "5%", width: "44%", height: "65%" },
                content: {
                    type: "chart", 
                    placeholder: "Click to add chart" ,
                    value: null,
                    style: {},
                }
            },
            { 
                id: 3, 
                typeDetails: { category: "content" },
                style: {top: "30%", left: "51%", width: "44%", height: "65%" },
                content: {
                    type: "text", 
                    placeholder: "Click to add text", 
                    value: null,
                    style: {},
                }
            }
        ]
    },
    {
        id: 4,
        style: {},
        layout: 'LAYOUT_16x9',
        objects: [
            { 
                id: 1, 
                typeDetails: { category: "title" },
                style: {top: "5%", left: "5%", width: "90%", height: "20%" },
                content: {
                    type: "text", 
                    placeholder: "Click to add title", 
                    value: null,
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
                    value: null,
                }
            },
            { 
                id: 3, 
                style: {top: "30%", left: "51%", width: "44%", height: "65%" },
                content: {
                    type: "chart", 
                    placeholder: "Click to add chart",
                    value: null,
                }
            }
        ]
    }
]

export default layoutList;