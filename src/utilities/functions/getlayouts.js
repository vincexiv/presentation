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

        const currentCanvasData = {
            id: parseInt(slide.id.split("-")[1]),
            objects: []
        }

        const objects = slide.querySelectorAll('.canvas-object')
        objects.forEach(object => {
            const objectData = {
                id: parseInt(object.id.split("-")[2]),
                style: {
                    top: object['style'].top,
                    left: object['style'].left,
                    width: object['style'].width,
                    height: object['style'].height,
                    transform: object['style'].transform
                }
            }
            currentCanvasData.objects.push(objectData)
        })

        layouts.push(currentCanvasData)
    })

    return layouts
}

export default getLayouts