import Highcharts from "highcharts"

function createChart(cssSelector, options){
    console.log("css selector: ", cssSelector)
    options = {...options, exporting: {
        allowHTML: true
      }}
    console.log(cssSelector, options)
    
    Highcharts.chart(cssSelector, options)
}

export default createChart;