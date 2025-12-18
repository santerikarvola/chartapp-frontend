import {render, screen, cleanup} from "@testing-library/react"
import OwnChart from "../components/OwnChart"
import {describe, it, expect, afterEach} from "vitest"
import "@testing-library/jest-dom/vitest"
import getChartInfo from "../components/ChartFacade"

afterEach(() => {
  cleanup()
})

describe("OwnChart", () => {
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
      "Päätöksen numero": "P2",
      "Päätöksen päivämäärä": "2025-01-01",
      "Palvelutuotteet": {
        "Lyhytterapia": {
          "Arviohinta": 10,
          "Myönnetyt määrät": 1
        }
      }
    },
    {
      "Päätöksen numero": "P5",
      "Päätöksen päivämäärä": "2025-01-31",
      "Palvelutuotteet": {
        "Fysioterapia": {
          "Arviohinta": 100,
          "Myönnetyt määrät": 10
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
    },
    {
      "Päätöksen numero": "P1",
      "Päätöksen päivämäärä": "2025-02-28",
      "Palvelutuotteet": {
        "Neuropsykologinen kuntoutus": {
          "Arviohinta": 0,
          "Myönnetyt määrät": 0
        }
      }
    }
  ]

  it("renders a notification if errorMessage is not null", () => {
    const testChartYaxis = "Päätöksen numero"
    const testWrongXaxis = "wrong x-axis"
    const testChartFilters = []
    const testChartStartDate = ""
    const testChartEndDate = ""
    const testChartType = "bar"
    const {errorMessage} = getChartInfo({
      chartYaxis : testChartYaxis,
      chartXaxis : testWrongXaxis, 
      chartFilters : testChartFilters, 
      chartStartDate : testChartStartDate, 
      chartEndDate : testChartEndDate, 
      chartType : testChartType, 
      setelit : testSetelit
      })

    render(
      <OwnChart
        chartYaxis={testChartYaxis}
        chartXaxis={testWrongXaxis}
        chartFilters={testChartFilters}
        chartStartDate={testChartStartDate}
        chartEndDate={testChartEndDate}
        chartType={testChartType}
        setelit={testSetelit}
      />
    )
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })

})