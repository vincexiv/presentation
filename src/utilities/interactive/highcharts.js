import Highcharts from "highcharts"

function createChart(cssSelector, options){
    console.log("css selector: ", cssSelector)
    options = {...options, exporting: {
        allowHTML: true
      }}
    console.log("#" +cssSelector, options)
    
    const chart = Highcharts.chart(cssSelector, options)
    console.log(chart)
}

export default createChart;