import {describe, it, expect} from "vitest"
import { testables } from "../components/ChartFacade"

describe("filterAndSort", () => {
  const {filterAndSort} = testables
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

  
  it("tests filterAndSort with filtering with both dates and ordering by date",  () => {
    const testXaxis = "Päätöksen päivämäärä"
    const testFilters = ["Päätöksen päivämäärä"]
    const testStartDate = "2025-01-01"
    const testEndDate = "2025-02-02"

    const filteredSetelit = filterAndSort(testXaxis, testSetelit, testFilters, testStartDate, testEndDate)

    expect(filteredSetelit).toEqual(
      [
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
          "Päätöksen numero": "P5",
          "Päätöksen päivämäärä": "2025-01-31",
          "Palvelutuotteet": {
            "Fysioterapia": {
              "Arviohinta": 100,
              "Myönnetyt määrät": 10
            }
          }
        }
      ]
    )
  })

  it("tests filterAndSort with filtering with only enddate and ordering by date",  () => {
    const testXaxis = "Päätöksen päivämäärä"
    const testFilters = ["Päätöksen päivämäärä"]
    const testStartDate = ""
    const testEndDate = "2025-02-02"

    const filteredSetelit = filterAndSort(testXaxis, testSetelit, testFilters, testStartDate, testEndDate)

    expect(filteredSetelit).toEqual(
      [
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
          "Päätöksen numero": "P5",
          "Päätöksen päivämäärä": "2025-01-31",
          "Palvelutuotteet": {
            "Fysioterapia": {
              "Arviohinta": 100,
              "Myönnetyt määrät": 10
            }
          }
        }
      ]
    )
  })

it("tests filterAndSort with filtering with only startdate and ordering by date",  () => {
    const testXaxis = "Päätöksen päivämäärä"
    const testFilters = ["Päätöksen päivämäärä"]
    const testStartDate = "2025-02-02"
    const testEndDate = ""

    const filteredSetelit = filterAndSort(testXaxis, testSetelit, testFilters, testStartDate, testEndDate)

    expect(filteredSetelit).toEqual(
      [
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
    )
  })

it("tests filterAndSort with filtering with óne palvelutuote and ordering by date",  () => {
    const testXaxis = "Päätöksen päivämäärä"
    const testFilters = ["Lyhytterapia"]
    const testStartDate = ""
    const testEndDate = ""

    const filteredSetelit = filterAndSort(testXaxis, testSetelit, testFilters, testStartDate, testEndDate)

    expect(filteredSetelit).toEqual(
      [
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
    )
  })

  it("tests filterAndSort with filtering with multiple palvelutuote and datefilter and ordering by date",  () => {
    const testXaxis = "Päätöksen päivämäärä"
    const testFilters = ["Lyhytterapia", "Fysioterapia"]
    const testStartDate = "2025-01-15"
    const testEndDate = ""

    const filteredSetelit = filterAndSort(testXaxis, testSetelit, testFilters, testStartDate, testEndDate)

    expect(filteredSetelit).toEqual(
      [
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
        }
      ]
    )
  })

it("tests filterAndSort with ordering by päätöksen numero",  () => {
    const testXaxis = "Päätöksen numero"
    const testFilters = []
    const testStartDate = ""
    const testEndDate = ""

    const filteredSetelit = filterAndSort(testXaxis, testSetelit, testFilters, testStartDate, testEndDate)

    expect(filteredSetelit).toEqual(
      [
        {
          "Päätöksen numero": "P1",
          "Päätöksen päivämäärä": "2025-02-28",
          "Palvelutuotteet": {
            "Neuropsykologinen kuntoutus": {
              "Arviohinta": 0,
              "Myönnetyt määrät": 0
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
        }
      ]
    )
  })

  it("tests filterAndSort without sorting",  () => {
    const testXaxis = "Palvelutuotteet"
    const testFilters = []
    const testStartDate = ""
    const testEndDate = ""

    const filteredSetelit = filterAndSort(testXaxis, testSetelit, testFilters, testStartDate, testEndDate)

    expect(filteredSetelit).toEqual(
      [
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
    )
  })

})