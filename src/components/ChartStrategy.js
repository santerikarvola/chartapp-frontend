const barOrLineChartStrategy = (names, values) => {
  const options = {
      chart: {
        id: "basic-bar-or-line"
      },
      xaxis: {
        categories: names
      }
  }
  const series = [
    {
      name: "Määrä",
      data: values
    }
  ]

  return {options, series}
}

const pieOrDonutChartStrategy = (names, values) => {
  const options = {
    labels: names,
    colors: ["#D22CA3", "#D2402C", "#2C92D2", "#61D22C", "#752CD2", "#89D22C", "#D22C2C", "#2CA6D2", "#D22C54", "#D2B72C", "#392CD2", "#4D2CD2", "#2CD271", "#2CDED2", "#D2902C", "#9D2CD2", "#9DD22C", "#2CD2AD", "#C52CD2", "#4DD22C", "#B1D22C", "#2CD285", "#D22C68", "#D2682C", "#C5D22C"],
    legend: {
      show: true,
      position: "right"
    },
    datalabels: {
      enabled: true
    }
  }
  const series = values  
  return {options, series}
}

const chartStrategies = {
  bar: barOrLineChartStrategy,
  line: barOrLineChartStrategy,
  pie: pieOrDonutChartStrategy,
  donut: pieOrDonutChartStrategy
}

const getChartStrategy = (chartType) => chartStrategies[chartType]

export default getChartStrategy