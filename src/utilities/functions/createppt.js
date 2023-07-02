// Returns the contents of the canvas in the form
// {<canvas-id>: <object-id>: {<conten>}}
function getContents(canvas){
  const result = {}

  canvas.objects.forEach(object => {
    result[`object-${object.id}`] = {}

    if(object.content.type === 'text'){
      result[`object-${object.id}`] = {
        type: "text",
        value: object.content?.text || "",
        style: object.content?.style
      }
    }else if (object.content.type === 'chart' && object.content.value){
      result[`object-${object.id}`] = {
        type: "chart",
        value:  JSON.parse(JSON.stringify(object.content.value))
        // content: renderedCharts.find(chart => {
        //   return (chart.canvasId === canvas.id) && (chart.objectId === object.id)
        // }).chart
      }

    }else if(object.content.type === 'chart' && !object.content.value){
      result[`object-${object.id}`] = {
        type: "chart",
        value: null
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
  const style = {
    color: convertColor(cssStyles?.color),// We expect all colors to be hexadecimal. i.e. like #fff
    fill: convertColor(cssStyles?.backgroundColor), // Also expect hexadecimal values
    fontSize: convertFontSize(cssStyles?.fontSize),
    valign: cssStyles?.verticalAlign || 'top',
    bold: cssStyles?.fontWeight === 'bold',
    italic: cssStyles?.fontStyle === 'italic'
  }

  return style
}

// Text styles supported by pptxgen are not exactly similar to
// CSS. For instance, font-size should be a digit ranging between
// 1 - 256 in pptxgen, but we could use "rem", "em", etc in css
// find more here; https://gitbrent.github.io/PptxGenJS/docs/api-text/
function convertFontSize(fontSize){
  if(fontSize){
    if(fontSize.match(/rem/g).length){// if the font size is in rem. e.g 2rem
      return parseFloat(convertRemToPixels(parseFloat(fontSize.replace("rem", ""))))
    }else if(fontSize.match(/px/g).length){// if the font size is in px. e.g 12px
      return parseFloat(fontSize.replace("px", ""))
    }else {
      throw "Unexpected font measurement units. Expected 'rem' or 'px'"
    }
  }else {
    return convertRemToPixels(1)
  }
}

function convertRemToPixels(rem) {    
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function convertColor(cssColor){
  if(cssColor){
    return cssColor.replace("#", "")
  }else {
    return
  }
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

  canvas.objects.forEach(object => {
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