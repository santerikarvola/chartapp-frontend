import {describe, it, expect} from "vitest"
import { testables } from "../components/ChartFacade"

describe("getValues", () => {
  const {getValues} = testables
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

  it("tests getValues with xaxis being Päätöksen päivämäärä and yaxis being Päätöksen numero",  () => {
    const testXaxis = "Päätöksen päivämäärä"
    const testYaxis = "Päätöksen numero"

    const testValues = getValues(testYaxis, testXaxis, testSetelit)

    expect(testValues).toEqual(
      [1,1,1,1,1]
    )
  })

  it("tests getValues with xaxis being Päätöksen kuukausi and yaxis being Päätöksen numero",  () => {
    const testXaxis = "Päätöksen kuukausi"
    const testYaxis = "Päätöksen numero"

    const testValues = getValues(testYaxis, testXaxis, testSetelit)

    expect(testValues).toEqual(
      [3,2]
    )
  })
  
  it("tests getValues with xaxis being Palvelutuotteet and yaxis being Päätöksen numero",  () => {
    const testXaxis = "Palvelutuotteet"
    const testYaxis = "Päätöksen numero"

    const testValues = getValues(testYaxis, testXaxis, testSetelit)
    
    expect(testValues).toEqual(
      [1,1,1,2,1]
    )
  })

  it("tests getValues with xaxis being Päätöksen päivämäärä and yaxis being Palvelutuotteet",  () => {
    const testXaxis = "Päätöksen päivämäärä"
    const testYaxis = "Palvelutuotteet"

    const testValues = getValues(testYaxis, testXaxis, testSetelit)

    expect(testValues).toEqual(
      [2,1,1,1,1]
    )
  })

  it("tests getValues with xaxis being Päätöksen kuukausi and yaxis being Palvelutuotteet",  () => {
    const testXaxis = "Päätöksen kuukausi"
    const testYaxis = "Palvelutuotteet"

    const testValues = getValues(testYaxis, testXaxis, testSetelit)

    expect(testValues).toEqual(
      [4,2]
    )
  })

  it("tests getValues with xaxis being Päätöksen numero and yaxis being Palvelutuotteet",  () => {
    const testXaxis = "Päätöksen numero"
    const testYaxis = "Palvelutuotteet"

    const testValues = getValues(testYaxis, testXaxis, testSetelit)

    expect(testValues).toEqual(
      [2,1,1,1,1]
    )
  })
  

  it("tests getValues with xaxis being Päätöksen päivämäärä and yaxis being Arviohinta",  () => {
    const testXaxis = "Päätöksen päivämäärä"
    const testYaxis = "Arviohinta"

    const testValues = getValues(testYaxis, testXaxis, testSetelit)

    expect(testValues).toEqual(
      [550,10,100,1000,0]
    )
  })

    it("tests getValues with xaxis being Päätöksen kuukausi and yaxis being Arviohinta",  () => {
    const testXaxis = "Päätöksen kuukausi"
    const testYaxis = "Arviohinta"

    const testValues = getValues(testYaxis, testXaxis, testSetelit)

    expect(testValues).toEqual(
      [660,1000]
    )
  })

    it("tests getValues with xaxis being Päätöksen numero and yaxis being Arviohinta",  () => {
    const testXaxis = "Päätöksen numero"
    const testYaxis = "Arviohinta"

    const testValues = getValues(testYaxis, testXaxis, testSetelit)

    expect(testValues).toEqual(
      [550,10,100,1000,0]
    )
  })

    it("tests getValues with xaxis being Palvelutuotteet and yaxis being Arviohinta",  () => {
    const testXaxis = "Palvelutuotteet"
    const testYaxis = "Arviohinta"

    const testValues = getValues(testYaxis, testXaxis, testSetelit)

    expect(testValues).toEqual(
      [100,500,50,1010,0]
    )
  })


  it("tests getValues with xaxis being Päätöksen päivämäärä and yaxis being Myönnetyt määrät",  () => {
    const testXaxis = "Päätöksen päivämäärä"
    const testYaxis = "Myönnetyt määrät"

    const testValues = getValues(testYaxis, testXaxis, testSetelit)

    expect(testValues).toEqual(
      [55,1,10,100,0]
    )
  })

    it("tests getValues with xaxis being Päätöksen kuukausi and yaxis being Myönnetyt määrät",  () => {
    const testXaxis = "Päätöksen kuukausi"
    const testYaxis = "Myönnetyt määrät"

    const testValues = getValues(testYaxis, testXaxis, testSetelit)

    expect(testValues).toEqual(
      [66,100]
    )
  })

    it("tests getValues with xaxis being Päätöksen numero and yaxis being Myönnetyt määrät",  () => {
    const testXaxis = "Päätöksen numero"
    const testYaxis = "Myönnetyt määrät"

    const testValues = getValues(testYaxis, testXaxis, testSetelit)

    expect(testValues).toEqual(
      [55,1,10,100,0]
    )
  })

    it("tests getValues with xaxis being Palvelutuotteet and yaxis being Myönnetyt määrät",  () => {
    const testXaxis = "Palvelutuotteet"
    const testYaxis = "Myönnetyt määrät"

    const testValues = getValues(testYaxis, testXaxis, testSetelit)
    
    expect(testValues).toEqual(
      [10,50,5,101,0]
    )
  })
})