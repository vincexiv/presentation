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

        if(object.type === 'text'){
            console.log("text: ", object?.content?.text)
        }else if(object.type === 'chart'){
            fetch("https://export.highcharts.com/", {
                "headers": {
                  "content-type": "application/json",
                },
                "body": JSON.stringify({
                    "infile": object.content,
                    "b64": true
                  }),
                "method": "POST",
                "mode": "cors"
              }).then(function(response) {
                // The response is a Response instance.
                return response.text();
              }).then(function(data) {
                console.log("chart: ", data); //  base64 data
              }).catch(function(err) {
                console.log(err);
              })            
        }
    })

    console.log(width, height)

    // console.log(JSON.parse(JSON.stringify(slideInfo)))
}

export default createPPT;