import {describe, it, expect, vi} from "vitest"
import getChartInfo from "../components/ChartFacade"

describe("getChartInfo", () => {
  const testSetelit = [
    {
      "Päätöksen numero": "P3",
      "Päätöksen päivämäärä": "2025-01-02",
      "Palvelutuotteet": {
        "Kognitiivinen psykoterapia": {
          "Arviohinta": 50,
          "Myönnetyt määrät": 5
        },
        "Hoitoneuvottelu": {
          "Arviohinta": 500,
          "Myönnetyt määrät": 50
        }
      }
    },
    {
      "Päätöksen numero": "P4",
      "Päätöksen päivämäärä": "2025-02-12",
      "Palvelutuotteet": {
        "Lyhytterapia": {
          "Arviohinta": 1000,
          "Myönnetyt määrät": 100
        }
      }
    }
  ]
  
  it("tests when names is empty",  () => {
    const testChartYaxis = "Päätöksen numero"
    const testWrongXaxis = "wrong x-axis"
    // Aiheuttaa, että names === []
    const testChartFilters = []
    const testChartStartDate = ""
    const testChartEndDate = ""
    const testChartType = "bar"
    const {errorMessage, options, series} = getChartInfo({
      chartYaxis : testChartYaxis,
      chartXaxis : testWrongXaxis, 
      chartFilters : testChartFilters, 
      chartStartDate : testChartStartDate, 
      chartEndDate : testChartEndDate, 
      chartType : testChartType, 
      setelit : testSetelit
      })

    expect(errorMessage).toEqual(
      "Virhe: Ei dataa valitulla X-akselin arvolla, yritä uudestaan."
    )

    expect(options).toEqual(
      {
        chart: {
          id: "basic-bar-or-line"
        },
        xaxis: {
          categories: []
        }
      }
    )

    expect(series).toEqual(
      [
        {
          name: "Määrä",
          data: []
        }
      ]
    )
  })

  // Tähän en osannut testata, jos names.length > values.lenght tai names.lenght < values.lenght, koska se ei käytännössä koskaan tapahdu, sillä en keksi millään, miten values voisi olla eripituinen kuin names, koska values iteroi namesin läpi

  it("tests when names is not empty",  () => {
    const testChartYaxis = "Päätöksen numero"
    const testWrongXaxis = "Päätöksen kuukausi"
    const testChartFilters = []
    const testChartStartDate = ""
    const testChartEndDate = ""
    const testChartType = "bar"
    const {errorMessage, options, series} = getChartInfo({
      chartYaxis : testChartYaxis,
      chartXaxis : testWrongXaxis, 
      chartFilters : testChartFilters, 
      chartStartDate : testChartStartDate, 
      chartEndDate : testChartEndDate, 
      chartType : testChartType, 
      setelit : testSetelit
      })

    expect(errorMessage).toBeNull

    expect(options).toEqual(
      {
        chart: {
          id: "basic-bar-or-line"
        },
        xaxis: {
          categories: ["2025-01", "2025-02"]
        }
      }
    )

    expect(series).toEqual(
      [
        {
          name: "Määrä",
          data: [1,1]
        }
      ]
    )
  })

})