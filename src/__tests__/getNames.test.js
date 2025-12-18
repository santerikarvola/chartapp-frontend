import {describe, it, expect} from "vitest"
import { testables } from "../components/ChartFacade"

describe("getNames", () => {
  const {getNames} = testables
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

  it("tests getNames with xaxis being päätöksen päivämäärä",  () => {
    const testXaxis = "Päätöksen päivämäärä"
    const testNames = getNames(testXaxis, testSetelit)

    expect(testNames).toEqual(
      ["2025-01-02","2025-01-01","2025-01-31","2025-02-12","2025-02-28"]
    )
  })

  it("tests getNames with xaxis being päätöksen numero",  () => {
    const testXaxis = "Päätöksen numero"
    const testNames = getNames(testXaxis, testSetelit)

    expect(testNames).toEqual(
      ["P3","P2","P5","P4","P1"]
    )
  })

  it("tests getNames with xaxis being Palvelutuotteet",  () => {
    const testXaxis = "Palvelutuotteet"
    const testNames = getNames(testXaxis, testSetelit)

    expect(testNames).toEqual(
      ["Fysioterapia","Hoitoneuvottelu","Kognitiivinen psykoterapia","Lyhytterapia","Neuropsykologinen kuntoutus"]
    )
  })

  it("tests getNames with xaxis being Päätöksen kuukausi",  () => {
    const testXaxis = "Päätöksen kuukausi"
    const testNames = getNames(testXaxis, testSetelit)

    expect(testNames).toEqual(
      ["2025-01","2025-02"]
    )
  })

  it("tests getNames with xaxis not being one of the default ones",  () => {
    const testXaxis = "non-existent"
    const testNames = getNames(testXaxis, testSetelit)

    expect(testNames).toEqual(
      []
    )
  })

})