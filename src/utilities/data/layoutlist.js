const layoutList = [
    {
        id: 0,
        structure: [
            { 
                id: 1, 
                type: "text", 
                typeDetails: { category: "title" },
                defaultContent: "Click to add title", 
                style: {top: "20%", left: "5%", width: "90%", height: "20%" },
                content: {
                    style: {fontSize: "2rem"}
                }
            },
            { 
                id: 2, 
                type: "text", 
                typeDetails: { category: "content" },
                defaultContent: "Click to add text", 
                style: {top: "45%", left: "5%", width: "90%", height: "40%" }
            }
        ]
    },
    {
        id: 1,
        structure: [
            { 
                id: 1, 
                type: "text", 
                typeDetails: { category: "title" },
                defaultContent: "Click to add title", 
                style: {top: "5%", left: "5%", width: "90%", height: "20%" },
                content: {
                    style: {fontSize: "2rem"}
                }
            },
            { 
                id: 2, 
                type: "text", 
                typeDetails: { category: "content" },
                defaultContent: "Click to add text", 
                style: {top: "30%", left: "5%", width: "90%", height: "65%" }
            }
        ]
    },
    {
        id: 2,
        structure: [
            { 
                id: 1, 
                type: "text", 
                typeDetails: { category: "title" },
                defaultContent: "Click to add title", 
                style: {top: "5%", left: "5%", width: "90%", height: "20%" },
                content: {
                    style: {fontSize: "2rem"}
                }
            },
            { 
                id: 2, 
                type: "text", 
                typeDetails: {category: "content"},
                defaultContent: "Click to add text", 
                style: {top: "30%", left: "5%", width: "44%", height: "65%" }
            },
            { 
                id: 3, 
                type: "text", 
                typeDetails: {category: "content"},
                defaultContent: "Click to add text", 
                style: {top: "30%", left: "51%", width: "44%", height: "65%" }
            }
        ]
    },
    {
        id: 3,
        structure: [
            { 
                id: 1, 
                type: "text", 
                typeDetails: { category: "title" },
                defaultContent: "Click to add title", 
                style: {top: "5%", left: "5%", width: "90%", height: "20%" },
                content: {
                    style: {fontSize: "2rem"}
                }
            },
            { 
                id: 2, 
                type: "chart", 
                defaultContent: "Click to add chart", 
                style: {top: "30%", left: "5%", width: "44%", height: "65%" }
            },
            { 
                id: 3, 
                type: "text", 
                typeDetails: { category: "content" },
                defaultContent: "Click to add text", 
                style: {top: "30%", left: "51%", width: "44%", height: "65%" }
            }
        ]
    },
    {
        id: 4,
        structure: [
            { 
                id: 1, 
                type: "text", 
                typeDetails: { category: "title" },
                defaultContent: "Click to add title", 
                style: {top: "5%", left: "5%", width: "90%", height: "20%" },
                content: {
                    style: {fontSize: "2rem"}
                }
            },
            { 
                id: 2, 
                type: "text", 
                typeDetails: { category: "content" },
                defaultContent: "Click to add text", 
                style: {top: "30%", left: "5%", width: "44%", height: "65%" }
            },
            { 
                id: 3, 
                type: "chart", 
                defaultContent: "Click to add chart", 
                style: {top: "30%", left: "51%", width: "44%", height: "65%" }
            }
        ]
    }
]

export default layoutList;