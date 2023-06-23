// Returns the contents of the canvas in the form
// {<canvas-id>: <object-id>: {<conten>}}
function getContents(canvas, renderedCharts){
  const result = {}

  canvas.structure.forEach(object => {
    result[`object-${object.id}`] = {}

    if(object.type === 'text'){
      result[`object-${object.id}`] = {
        type: "text",
        content: object.content?.text || "",
        style: object.content?.style
      }
    }else if (object.type === 'chart' && object.content){

      result[`object-${object.id}`] = {
        type: "chart",
        content: renderedCharts.find(chart => {
          return (chart.canvasId === canvas.id) && (chart.objectId === object.id)
        }).chart
      }

    }else if(object.type === 'chart' && !object.content){
      result[`object-${object.id}`] = {
        type: "chart",
        content: null
      }      
    }
  })

  return result
}


function replaceHighchartObjectWithB64(b64Image, canvasContents){
  for(const objectId in canvasContents){
    if(canvasContents[objectId].type === 'chart'){
      canvasContents[objectId] = b64Image
    }
  }

  return canvasContents
}

// Gets an object's style written in CSS and converts them to
// their corresponding pptxjs style so slides maintain the same
// look when exported to powerpoint
function getPptxCompatibleStyle(cssStyles){
  console.log("css stles")
  console.log(JSON.stringify(cssStyles))

  return cssStyles
}


// Returns the position of each of the objects in that canvas
// {<canvas-id>: <object-id>: {<conten>}}
function getPositions(canvas){
  const result = {}

  // We gave each canvas an id in the form; 'canvas-<canvas-object-id>'
  // so we can easily retrieve it from the dom using id in that form
  const domCanvas = document.querySelector(`#canvas-${canvas.id}`)
  const {
    width: cW,
    height: cH,
    top: cT,
    left: cL} = domCanvas.getBoundingClientRect()

  canvas.structure.forEach(object => {
    // We know each object in the dom has an id in 
    // the form; 'object-<canvas-id>-<object-id'
    const domObject = document.querySelector(`#object-${canvas.id}-${object.id}`)
    const {
      width: oW,
      height: oH,
      top: oT,
      left: oL} = domObject.getBoundingClientRect()

      // The values x, y, w, and h correspond to "left", "top", "width",
      // and "height" in CSS lingo. Read https://gitbrent.github.io/PptxGenJS/docs/quick-start/
      // for more information
      const position = {
        x: `${parseInt((oL - cL)/cW * 100)}%`,
        y: `${parseInt((oT - cT)/cH * 100)}%`,
        w: `${parseInt(oW/cW * 100)}%`,
        h: `${parseInt(oH/cH * 100)}%`
      }

      result[`object-${object.id}`] = position
    })

  return result;
}

export {getPositions, getContents, replaceHighchartObjectWithB64, getPptxCompatibleStyle};