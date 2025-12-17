import getChartStrategy from "../components/ChartStrategy"
import {describe, it, expect} from "vitest"

describe("ChartStrategy", () => {
  const testNames = ["A","B","C","D","E"]
  const testValues = [1,2,3,4,5]

  it("returns correct options and values for barOrLineStrategy for when chartType is line", () => {
    
    const strategy = getChartStrategy("line")
    const {options, series} = strategy(testNames, testValues)

    expect(options).toEqual(
      {
        chart: {
          id: "basic-bar-or-line"
        },
        xaxis: {
          categories: ["A","B","C","D","E"]
        }
      }
    )

    expect(series).toEqual(
      [
        {
          name: "Määrä",
          data: [1,2,3,4,5]
        }
      ]
    )

  })

  it("returns correct options and values for barOrLineStrategy for when chartType is bar", () => {
    
    const strategy = getChartStrategy("bar")
    const {options, series} = strategy(testNames, testValues)

    expect(options).toEqual(
      {
        chart: {
          id: "basic-bar-or-line"
        },
        xaxis: {
          categories: ["A","B","C","D","E"]
        }
      }
    )

    expect(series).toEqual(
      [
        {
          name: "Määrä",
          data: [1,2,3,4,5]
        }
      ]
    )

  })

  it("returns correct options and values for pieOrDonutStrategy for when chartType is pie", () => {
    
    const strategy = getChartStrategy("pie")
    const {options, series} = strategy(testNames, testValues)

    expect(options).toEqual(
      {
        labels: ["A","B","C","D","E"],
        colors: ["#D22CA3", "#D2402C", "#2C92D2", "#61D22C", "#752CD2", "#89D22C", "#D22C2C", "#2CA6D2", "#D22C54", "#D2B72C", "#392CD2", "#4D2CD2", "#2CD271", "#2CDED2", "#D2902C", "#9D2CD2", "#9DD22C", "#2CD2AD", "#C52CD2", "#4DD22C", "#B1D22C", "#2CD285", "#D22C68", "#D2682C", "#C5D22C"],
        legend: {
          show: true,
          position: "right"
        },
        datalabels: {
          enabled: true
        }
      }
    )

    expect(series).toEqual([1,2,3,4,5])

  })

  it("returns correct options and values for pieOrDonutStrategy for when chartType is donut", () => {
    
    const strategy = getChartStrategy("donut")
    const {options, series} = strategy(testNames, testValues)

    expect(options).toEqual(
      {
        labels: ["A","B","C","D","E"],
        colors: ["#D22CA3", "#D2402C", "#2C92D2", "#61D22C", "#752CD2", "#89D22C", "#D22C2C", "#2CA6D2", "#D22C54", "#D2B72C", "#392CD2", "#4D2CD2", "#2CD271", "#2CDED2", "#D2902C", "#9D2CD2", "#9DD22C", "#2CD2AD", "#C52CD2", "#4DD22C", "#B1D22C", "#2CD285", "#D22C68", "#D2682C", "#C5D22C"],
        legend: {
          show: true,
          position: "right"
        },
        datalabels: {
          enabled: true
        }
      }
    )

    expect(series).toEqual([1,2,3,4,5])

  })

})