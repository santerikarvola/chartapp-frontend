import {describe, it, expect} from "vitest"
import { testables } from "../components/ChartFacade"

describe("increaseCount", () => {
  const {increaseCount} = testables
  const testSeteli = {
    "Päätöksen numero": "P3",
    "Päätöksen päivämäärä": "2025-01-02",
    "Palvelutuotteet": {
      "Kognitiivinen psykoterapia": {
        "Arviohinta": 50,
        "Myönnetyt määrät": 1
      },
      "Hoitoneuvottelu": {
        "Arviohinta": 500,
        "Myönnetyt määrät": 11
      }
    }
  }


  it("tests increaseCount with xaxis being Palvelutuotteet and yaxis being Päätöksen numero and testValueName not in seteli",  () => {
    const testXaxis = "Palvelutuotteet"
    const testYaxis = "Päätöksen numero"
    const testValueName = "Fysioterapia"
    const testCount = increaseCount(testXaxis, testYaxis, testSeteli, testValueName)

    expect(testCount).toEqual(
      0
    )
  })

  it("tests increaseCount with xaxis being Palvelutuotteet and yaxis being Päätöksen numero and testValueName in seteli",  () => {
    const testXaxis = "Palvelutuotteet"
    const testYaxis = "Päätöksen numero"
    const testValueName = "Hoitoneuvottelu"
    const testCount = increaseCount(testYaxis, testXaxis, testSeteli, testValueName)

    expect(testCount).toEqual(
      1
    )
  })

  it("tests increaseCount with xaxis being Palvelutuotteet and yaxis being Arviohinta and testValueName not in seteli",  () => {
    const testXaxis = "Palvelutuotteet"
    const testYaxis = "Arviohinta"
    const testValueName = "Not in seteli"
    const testCount = increaseCount(testYaxis, testXaxis, testSeteli, testValueName)

    expect(testCount).toEqual(
      0
    )
  })

  it("tests increaseCount with xaxis being Palvelutuotteet and yaxis being Arviohinta and testValueName in seteli",  () => {
    const testXaxis = "Palvelutuotteet"
    const testYaxis = "Arviohinta"
    const testValueName = "Kognitiivinen psykoterapia"
    const testCount = increaseCount(testYaxis, testXaxis, testSeteli, testValueName)

    expect(testCount).toEqual(
      50
    )
  })

  it("tests increaseCount with xaxis being Palvelutuotteet and yaxis being Myönnetyt määrät and testValueName in seteli",  () => {
    const testXaxis = "Palvelutuotteet"
    const testYaxis = "Myönnetyt määrät"
    const testValueName = "Hoitoneuvottelu"
    const testCount = increaseCount(testYaxis, testXaxis, testSeteli, testValueName)

    expect(testCount).toEqual(
      11
    )
  })

  it("tests increaseCount with xaxis being Päätöksen päivämäärä and yaxis being Päätöksen numero and testValueName in seteli",  () => {
    const testXaxis = "Päätöksen päivämäärä"
    const testYaxis = "Päätöksen numero"
    const testValueName = "2025-01-02"
    const testCount = increaseCount(testYaxis, testXaxis, testSeteli, testValueName)

    expect(testCount).toEqual(
      1
    )
  })

  it("tests increaseCount with xaxis being Päätöksen päivämäärä and yaxis being Päätöksen numero and testValueName not in seteli",  () => {
    const testXaxis = "Päätöksen päivämäärä"
    const testYaxis = "Päätöksen numero"
    const testValueName = "2025-01-022231"
    const testCount = increaseCount(testYaxis, testXaxis, testSeteli, testValueName)

    expect(testCount).toEqual(
      0
    )
  })

  it("tests increaseCount with xaxis being Päätöksen päivämäärä and yaxis being Palvelutuotteet and testValueName not in seteli",  () => {
    const testXaxis = "Päätöksen päivämäärä"
    const testYaxis = "Palvelutuotteet"
    const testValueName = "2025-01-022231"
    const testCount = increaseCount(testYaxis, testXaxis, testSeteli, testValueName)

    expect(testCount).toEqual(
      0
    )
  }) 

  it("tests increaseCount with xaxis being Päätöksen päivämäärä and yaxis being Palvelutuotteet and testValueName in seteli",  () => {
    const testXaxis = "Päätöksen päivämäärä"
    const testYaxis = "Palvelutuotteet"
    const testValueName = "2025-01-02"
    const testCount = increaseCount(testYaxis, testXaxis, testSeteli, testValueName)

    expect(testCount).toEqual(
      2
    )
  })

  it("tests increaseCount with xaxis being Päätöksen päivämäärä and yaxis being Arviohinta and testValueName in seteli",  () => {
    const testXaxis = "Päätöksen päivämäärä"
    const testYaxis = "Arviohinta"
    const testValueName = "2025-01-02"
    const testCount = increaseCount(testYaxis, testXaxis, testSeteli, testValueName)

    expect(testCount).toEqual(
      550
    )
  })

  it("tests increaseCount with xaxis being Päätöksen päivämäärä and yaxis being Arviohinta and testValueName not in seteli",  () => {
    const testXaxis = "Päätöksen päivämäärä"
    const testYaxis = "Arviohinta"
    const testValueName = "2025-01-0221331"
    const testCount = increaseCount(testYaxis, testXaxis, testSeteli, testValueName)

    expect(testCount).toEqual(
      0
    )
  })

  it("tests increaseCount with xaxis being Päätöksen kuukausi and yaxis being Päätöksen numero and testValueName not in seteli",  () => {
    const testXaxis = "Päätöksen kuukausi"
    const testYaxis = "Päätöksen numero"
    const testValueName = "2025-13"
    const testCount = increaseCount(testYaxis, testXaxis, testSeteli, testValueName)

    expect(testCount).toEqual(
      0
    )
  })   

  it("tests increaseCount with xaxis being Päätöksen kuukausi and yaxis being Päätöksen numero and testValueName in seteli",  () => {
    const testXaxis = "Päätöksen kuukausi"
    const testYaxis = "Päätöksen numero"
    const testValueName = "2025-01"
    const testCount = increaseCount(testYaxis, testXaxis, testSeteli, testValueName)

    expect(testCount).toEqual(
      1
    )
  })   

  it("tests increaseCount with xaxis being Päätöksen kuukausi and yaxis being Palvelutuotteet and testValueName in seteli",  () => {
    const testXaxis = "Päätöksen kuukausi"
    const testYaxis = "Palvelutuotteet"
    const testValueName = "2025-01"
    const testCount = increaseCount(testYaxis, testXaxis, testSeteli, testValueName)

    expect(testCount).toEqual(
      2
    )
  })

  it("tests increaseCount with xaxis being Päätöksen kuukausi and yaxis being Myönnetyt määrät and testValueName in seteli",  () => {
    const testXaxis = "Päätöksen kuukausi"
    const testYaxis = "Myönnetyt määrät"
    const testValueName = "2025-01"
    const testCount = increaseCount(testYaxis, testXaxis, testSeteli, testValueName)

    expect(testCount).toEqual(
      12
    )
  })

  it("tests increaseCount with xaxis being wrong",  () => {
    const testXaxis = "wrong"
    const testYaxis = "Myönnetyt määrät"
    const testValueName = "2025-01"
    const testCount = increaseCount(testYaxis, testXaxis, testSeteli, testValueName)

    expect(testCount).toEqual(
      0
    )
  })

  it("tests increaseCount with yaxis being wrong",  () => {
    const testXaxis = "Päätöksen kuukausi"
    const testYaxis = "wrong"
    const testValueName = "2025-01"
    const testCount = increaseCount(testYaxis, testXaxis, testSeteli, testValueName)

    expect(testCount).toEqual(
      0
    )
  })
})