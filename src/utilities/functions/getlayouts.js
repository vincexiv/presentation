// This function return the layouts of objects in the canvas
// When we move around objects in the canvas and resize them,
// the values are set using interactjs library that we are 
// currently using to help us with that. In this function,
// we get the actual values so that when we want to save the
// data, we can retrieve it and display it as it was initially
function getLayouts(){

    const layouts = []

    const allSlides = document.querySelectorAll(".canvas")
    allSlides.forEach(slide => {
        const canvasX = slide.getBoundingClientRect().x
        const canvasY = slide.getBoundingClientRect().y
        const canvasWidth = slide.getBoundingClientRect().width
        const canvasHeight = slide.getBoundingClientRect().height

        const currentCanvasData = {
            id: parseInt(slide.id.split("-")[1]),
            structure: []
        }

        const objects = slide.querySelectorAll('.canvas-object')
        objects.forEach(object => {
            const objectX = object.getBoundingClientRect().x
            const objectY = object.getBoundingClientRect().y
            const objectWidth = object.getBoundingClientRect().width
            const objectHeight = object.getBoundingClientRect().height

            const style = {
                top: `${parseInt((objectY - canvasY)/canvasHeight * 100)}%`,
                left: `${parseInt((objectX - canvasX)/canvasWidth * 100)}%`,
                width: `${parseInt(objectWidth/canvasWidth * 100)}%`,
                height: `${parseInt(objectHeight/canvasHeight * 100)}%`
            }

            const objectData = {
                id: parseInt(object.id.split("-")[2]),
                style: style
            }

            currentCanvasData.structure.push(objectData)
        })

        layouts.push(currentCanvasData)
    })

    return layouts
}

export default getLayouts