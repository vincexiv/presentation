const layoutList = [
    {
        id: 0,
        objects: [
            { 
                id: 1, 
                typeDetails: { category: "title" },
                style: {top: "20%", left: "5%", width: "90%", height: "20%" },
                content: {
                    type: "text",
                    placeholder: "Click to add title",
                    style: {
                        fontSize: "2rem",
                        verticalAlign: "middle"
                    }
                }
            },
            { 
                id: 2, 
                typeDetails: { category: "content" },
                style: {top: "45%", left: "5%", width: "90%", height: "40%" },
                content: {
                    type: 'text',
                    placeholder: "Click to add text"
                }
            }
        ]
    },
    {
        id: 1,
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
                        verticalAlign: "middle"
                    }
                }
            },
            { 
                id: 2, 
                typeDetails: { category: "content" },
                style: {top: "30%", left: "5%", width: "90%", height: "65%" },
                content: {
                    type: "text", 
                    placeholder: "Click to add text"
                }
            }
        ]
    },
    {
        id: 2,
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
                        verticalAlign: "middle"
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
                }
            },
            { 
                id: 3, 
                typeDetails: {category: "content"},
                style: {top: "30%", left: "51%", width: "44%", height: "65%" },
                content: {
                    type: "text", 
                    placeholder: "Click to add text", 
                }
            }
        ]
    },
    {
        id: 3,
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
                        verticalAlign: "middle"
                    }
                }
            },
            { 
                id: 2, 
                style: {top: "30%", left: "5%", width: "44%", height: "65%" },
                content: {
                    type: "chart", 
                    placeholder: "Click to add chart" 
                }
            },
            { 
                id: 3, 
                typeDetails: { category: "content" },
                style: {top: "30%", left: "51%", width: "44%", height: "65%" },
                content: {
                    type: "text", 
                    placeholder: "Click to add text", 
                }
            }
        ]
    },
    {
        id: 4,
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
                        verticalAlign: "middle"
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
                }
            }
        ]
    }
]

export default layoutList;