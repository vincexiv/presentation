// import pptxgen from "pptxgenjs";

function createPPT(slideInfo){
    // 1. Create a new Presentation
    // let pres = new pptxgen();

    // 2. Add a Slide
    // let slide = pres.addSlide();

    // We know that the canvas created from object with id=canvasId
    // will be given id in the form; 'canvas-<canvasId>'
    const domCanvas = document.querySelector(`#canvas-${slideInfo.id}`)
    const {width, height} = domCanvas.getBoundingClientRect()

    slideInfo.structure.forEach(object => {
        // We created the objects in the dom with ids in the following
        //form; 'canvas-<canvasId>-<objectId>'
        // const domObject = document.querySelector(`#object-${slideInfo.id}-${object.id}`)
        // const {top, left, width, height} = domObject.getBoundingClientRect()

        let content

        if(object.type === 'text'){
            content = object?.content?.text
        }
        console.log(content)

    })

    console.log(width, height)

    // console.log(JSON.parse(JSON.stringify(slideInfo)))
}

export default createPPT;