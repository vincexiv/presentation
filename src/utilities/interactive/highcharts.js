import Highcharts from "highcharts"

function createChart(cssSelector, options){
  console.log(options)
    options = {...options, exporting: {
        allowHTML: true
      }}
    
    const chart = Highcharts.chart(cssSelector, options)

    return chart
}

export default createChart;