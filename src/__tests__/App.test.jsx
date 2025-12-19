import {render, screen, cleanup, within} from "@testing-library/react"
import {describe, it, expect, vi, afterEach} from "vitest"
import "@testing-library/jest-dom/vitest"
import {userEvent} from "@testing-library/user-event"
import App from "../App"

afterEach(() => {
  cleanup()
})

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

vi.mock("../services/setelit", () => {
  return {
    default: {
      getAll: vi.fn(async () => testSetelit),
    }
  }
})

vi.mock("react-apexcharts", () => {
  return {
    default: vi.fn(() => <p>Mock Chart rendered succesfully.</p>)
  }
})

describe("App", () => {

  it("renders the elements always visible", () => {

    render(<App />)
    
    expect(screen.getByText("Palvelusetelit")).toBeInTheDocument()
    expect(screen.getByText("Tervetuloa myönnettyjen palvelusetelien tilastointisovellukseen!")).toBeInTheDocument()
    expect(screen.getByText("Y-akselin valinta")).toBeInTheDocument()
    expect(screen.getByText("X-akselin valinta")).toBeInTheDocument()
    expect(screen.getByText("Suodattimien valinta")).toBeInTheDocument()
    expect(screen.getByText("Valitut suodattimet:")).toBeInTheDocument()
    expect(screen.getByText("Poista suodattimet")).toBeInTheDocument()
    expect(screen.getByText("Kaaviotyypin valinta")).toBeInTheDocument()
    expect(screen.getByText("Lähetysnappi")).toBeInTheDocument()
    expect(screen.getByText("Lähetä")).toBeInTheDocument()
  })

  it("renders the initial text for the dropdown-menus and filters and not date selectors or the chart or notification", () => {

    render(<App />)
    
    expect(screen.getByText("Valitse y-akseli")).toBeInTheDocument()
    expect(screen.getByText("Valitse x-akseli")).toBeInTheDocument()
    expect(screen.getByText("Et ole valinnut suodattimia.")).toBeInTheDocument()
    expect(screen.getByText("Valitse suodattimet")).toBeInTheDocument()
    expect(screen.queryByTestId("datepickers")).not.toBeInTheDocument()
    expect(screen.getByText("Valitse kaavion tyyppi")).toBeInTheDocument()

    expect(screen.queryByTestId("own-chart")).not.toBeInTheDocument()
    expect(screen.queryByTestId("notification")).not.toBeInTheDocument
  })

  it("renders the date selectors when Päätöksen päivämäärä in filters", async () => {

    render(<App />)

    const filterMenuTitle = screen.getByRole("button", {
      name: "Valitse suodattimet"
    } )

    await userEvent.click(filterMenuTitle)

    await userEvent.click(screen.getByText("Päätöksen päivämäärä"))
    expect(screen.queryByTestId("datepickers")).toBeInTheDocument()
    
  })

  it("tests that setFilter works correctly and it lists the filters and removes the filters when you click the filter again", async () => {

    render(<App />)

    const filterMenuTitle = screen.getByRole("button", {
      name: "Valitse suodattimet"
    } )

    await userEvent.click(filterMenuTitle)

    const palvelutuoteTitle = screen.getByRole("button", {
      name: "Palvelutuotteet"
    } )

    await userEvent.click(palvelutuoteTitle)
    await userEvent.click(screen.getByText("Fysioterapia"))

    const filterList = screen.queryByTestId("filter-list")
    expect(within(filterList).getByText("Fysioterapia")).toBeInTheDocument()
    
    await userEvent.click(filterMenuTitle)
    await userEvent.click(palvelutuoteTitle)

    const allFysioterapiat = screen.getAllByText("Fysioterapia")
    console.log(allFysioterapiat.length)

    await userEvent.click(allFysioterapiat[allFysioterapiat.length - 1])
    console.log(allFysioterapiat.length)
    expect(within(filterList).getByText("Fysioterapia")).not.toBeInTheDocument()
  })

  it("tests that setYaxis, setXaxis, setType work correctly", async () => {

    render(<App />)

    const yMenuTitle = screen.getByRole("button", {
      name: "Valitse y-akseli"
    } )
    await userEvent.click(yMenuTitle)
    const yMenuButton = screen.getByRole("button", {
      name: "Päätöksen numero"
    })
    await userEvent.click(yMenuButton)
    expect(yMenuButton).toBeInTheDocument()

    const xMenuTitle = screen.getByRole("button", {
      name: "Valitse x-akseli"
    })
    await userEvent.click(xMenuTitle)
    const xMenuButton = screen.getByRole("button", {
      name: "Päätöksen kuukausi"
    })
    await userEvent.click(xMenuButton)
    expect(xMenuButton).toBeInTheDocument()

    const typeMenuTitle = screen.getByRole("button", {
      name: "Valitse kaavion tyyppi"
    })
    await userEvent.click(typeMenuTitle)
    const typeMenuButton = screen.getByRole("button", {
      name: "bar"
    })
    await userEvent.click(typeMenuButton)
    expect(typeMenuButton).toBeInTheDocument()    

  })

  it("tests that setEndDate and setStartDate work correctly and checks Poista suodattimet -button", async () => {

    render(<App />)

    const filterMenuTitle = screen.getByRole("button", {
      name: "Valitse suodattimet"
    } )

    await userEvent.click(filterMenuTitle)

    const voucherDateTitle = screen.getByRole("button", {
      name: "Päätöksen päivämäärä"
    } )

    await userEvent.click(voucherDateTitle)

    const filterList = screen.queryByTestId("filter-list")
    const startDateDiv = screen.queryByTestId("start-date-id")
    const endDateDiv = screen.queryByTestId("end-date-id")
    expect(within(filterList).getByText("Päätöksen päivämäärä")).toBeInTheDocument()

    expect(screen.queryByTestId("datepickers")).toBeInTheDocument()
    expect(screen.getByText("Alkupäivämäärä")).toBeInTheDocument()
    expect(startDateDiv).toBeInTheDocument()
    expect(screen.getByText("Loppupäivämäärä")).toBeInTheDocument()
    expect(endDateDiv).toBeInTheDocument()

    const startDateField = within(startDateDiv).getByRole("textbox")
    await userEvent.type(startDateField, "01/01/2025")
    expect(startDateField).toHaveValue("01/01/2025")

    const endDateField = within(endDateDiv).getByRole("textbox")
    await userEvent.type(endDateField, "02/02/2025")
    expect(endDateField).toHaveValue("02/02/2025")

    const deleteFiltersButton = screen.getByRole("button", {
      name: "Poista suodattimet"
    })
    await userEvent.click(deleteFiltersButton)
    expect(within(filterList).getByText("Päätöksen päivämäärä")).not.toBeInTheDocument()
    expect(screen.queryByTestId("datepickers")).not.toBeInTheDocument()
    expect(screen.getByText("Et ole valinnut suodattimia."))

    await userEvent.click(filterMenuTitle)
    await userEvent.click(voucherDateTitle)

    const newStartDateDiv = screen.queryByTestId("start-date-id")
    const newStartDateField = within(newStartDateDiv).getByRole("textbox")
    expect(newStartDateField).toHaveValue("")

    const newEndDateDiv = screen.queryByTestId("end-date-id")
    const newEndDateField = within(newEndDateDiv).getByRole("textbox")
    expect(newEndDateField).toHaveValue("")    
  })

  it("tests handleSubmit when !yaxis", async () => {

    render(<App />)

    const xMenuTitle = screen.getByRole("button", {
      name: "Valitse x-akseli"
    })
    await userEvent.click(xMenuTitle)
    const xMenuButton = screen.getByRole("button", {
      name: "Päätöksen kuukausi"
    })
    await userEvent.click(xMenuButton)
    expect(xMenuButton).toBeInTheDocument()

    const typeMenuTitle = screen.getByRole("button", {
      name: "Valitse kaavion tyyppi"
    })
    await userEvent.click(typeMenuTitle)
    const typeMenuButton = screen.getByRole("button", {
      name: "bar"
    })
    await userEvent.click(typeMenuButton)
    expect(typeMenuButton).toBeInTheDocument()       

    await userEvent.click(screen.getByRole("button", {
      name: "Lähetä"
    }))

    expect(screen.getByText("Valitse sekä X-akseli, Y-akseli että kaaviotyyppi.")).toBeInTheDocument()
    expect(screen.queryByTestId("own-chart")).not.toBeInTheDocument()
  })

  it("tests handleSubmit when !xaxis", async () => {
    
    render(<App />)

    const yMenuTitle = screen.getByRole("button", {
      name: "Valitse y-akseli"
    })
    await userEvent.click(yMenuTitle)
    const yMenuButton = screen.getByRole("button", {
      name: "Päätöksen numero"
    })
    await userEvent.click(yMenuButton)
    expect(yMenuButton).toBeInTheDocument()

    const typeMenuTitle = screen.getByRole("button", {
      name: "Valitse kaavion tyyppi"
    })
    await userEvent.click(typeMenuTitle)
    const typeMenuButton = screen.getByRole("button", {
      name: "bar"
    })
    await userEvent.click(typeMenuButton)
    expect(typeMenuButton).toBeInTheDocument()       

    await userEvent.click(screen.getByRole("button", {
      name: "Lähetä"
    }))

    expect(screen.getByText("Valitse sekä X-akseli, Y-akseli että kaaviotyyppi.")).toBeInTheDocument()
    expect(screen.queryByTestId("own-chart")).not.toBeInTheDocument()
  })

  it("tests handleSubmit when !type", async () => {
    
    render(<App />)

    const yMenuTitle = screen.getByRole("button", {
      name: "Valitse y-akseli"
    })
    await userEvent.click(yMenuTitle)
    const yMenuButton = screen.getByRole("button", {
      name: "Päätöksen numero"
    })
    await userEvent.click(yMenuButton)
    expect(yMenuButton).toBeInTheDocument()
      
    const xMenuTitle = screen.getByRole("button", {
      name: "Valitse x-akseli"
    })
    await userEvent.click(xMenuTitle)
    const xMenuButton = screen.getByRole("button", {
      name: "Päätöksen kuukausi"
    })
    await userEvent.click(xMenuButton)
    expect(xMenuButton).toBeInTheDocument()

    await userEvent.click(screen.getByRole("button", {
      name: "Lähetä"
    }))

    expect(screen.getByText("Valitse sekä X-akseli, Y-akseli että kaaviotyyppi.")).toBeInTheDocument()
    expect(screen.queryByTestId("own-chart")).not.toBeInTheDocument()
  })

  it("tests handleSubmit when xaxis === yaxis", async () => {
    
    render(<App />)

    const yMenuTitle = screen.getByRole("button", {
      name: "Valitse y-akseli"
    })
    await userEvent.click(yMenuTitle)
    const yMenuButton = screen.getByRole("button", {
      name: "Päätöksen numero"
    })
    await userEvent.click(yMenuButton)
    expect(yMenuButton).toBeInTheDocument()
      
    const xMenuTitle = screen.getByRole("button", {
      name: "Valitse x-akseli"
    })
    await userEvent.click(xMenuTitle)

    const allVoucherDateButtons = screen.getAllByRole("button", {
      name: "Päätöksen numero"
    })

    const xMenuButton = allVoucherDateButtons[allVoucherDateButtons.length - 1]
    await userEvent.click(xMenuButton)
    expect(xMenuButton).toBeInTheDocument()
    
    const typeMenuTitle = screen.getByRole("button", {
      name: "Valitse kaavion tyyppi"
    })
    await userEvent.click(typeMenuTitle)
    const typeMenuButton = screen.getByRole("button", {
      name: "bar"
    })
    await userEvent.click(typeMenuButton)
    expect(typeMenuButton).toBeInTheDocument()       

    await userEvent.click(screen.getByRole("button", {
      name: "Lähetä"
    }))

    expect(screen.getByText("Y-akseli ja X-akseli eivät voi olla samat.")).toBeInTheDocument()
    expect(screen.queryByTestId("own-chart")).not.toBeInTheDocument()
  })

  it("tests handleSubmit when startDate > endDate", async () => {

    render(<App />)

    const yMenuTitle = screen.getByRole("button", {
      name: "Valitse y-akseli"
    })
    await userEvent.click(yMenuTitle)
    const yMenuButton = screen.getByRole("button", {
      name: "Päätöksen numero"
    })
    await userEvent.click(yMenuButton)
    expect(yMenuButton).toBeInTheDocument()
      
    const xMenuTitle = screen.getByRole("button", {
      name: "Valitse x-akseli"
    })
    await userEvent.click(xMenuTitle)
    const xMenuButton = screen.getByRole("button", {
      name: "Päätöksen kuukausi"
    })
    await userEvent.click(xMenuButton)
    expect(xMenuButton).toBeInTheDocument()

    const filterMenuTitle = screen.getByRole("button", {
      name: "Valitse suodattimet"
    } )

    await userEvent.click(filterMenuTitle)

    const allVoucherDateButtons = screen.getAllByRole("button", {
      name: "Päätöksen päivämäärä"
    })

    console.log("filtteri", allVoucherDateButtons.length)
    const filterMenuButton = allVoucherDateButtons[allVoucherDateButtons.length - 1]
    await userEvent.click(filterMenuButton)

    const filterList = screen.queryByTestId("filter-list")
    const startDateDiv = screen.queryByTestId("start-date-id")
    const endDateDiv = screen.queryByTestId("end-date-id")
    
    expect(within(filterList).getByText("Päätöksen päivämäärä")).toBeInTheDocument()

    expect(screen.queryByTestId("datepickers")).toBeInTheDocument()
    expect(screen.getByText("Alkupäivämäärä")).toBeInTheDocument()
    expect(startDateDiv).toBeInTheDocument()
    expect(screen.getByText("Loppupäivämäärä")).toBeInTheDocument()
    expect(endDateDiv).toBeInTheDocument()

    const startDateField = within(startDateDiv).getByRole("textbox")
    await userEvent.type(startDateField, "02/02/2025")
    expect(startDateField).toHaveValue("02/02/2025")

    const endDateField = within(endDateDiv).getByRole("textbox")
    await userEvent.type(endDateField, "01/01/2025")
    expect(endDateField).toHaveValue("01/01/2025")

    const typeMenuTitle = screen.getByRole("button", {
      name: "Valitse kaavion tyyppi"
    })
    await userEvent.click(typeMenuTitle)
    const typeMenuButton = screen.getByRole("button", {
      name: "bar"
    })
    await userEvent.click(typeMenuButton)
    expect(typeMenuButton).toBeInTheDocument()        

    await userEvent.click(screen.getByRole("button", {
      name: "Lähetä"
    }))

    expect(screen.getByText("Loppupäivämäärä ei voi olla ennen alkupäivämäärää.")).toBeInTheDocument()
    expect(screen.queryByTestId("own-chart")).not.toBeInTheDocument()   
  }) 

  it("tests handleSubmit when fields are set correctly", async () => {

    render(<App />)

    const yMenuTitle = screen.getByRole("button", {
      name: "Valitse y-akseli"
    })
    await userEvent.click(yMenuTitle)
    const yMenuButton = screen.getByRole("button", {
      name: "Päätöksen numero"
    })
    await userEvent.click(yMenuButton)
    expect(yMenuButton).toBeInTheDocument()
      
    const xMenuTitle = screen.getByRole("button", {
      name: "Valitse x-akseli"
    })
    await userEvent.click(xMenuTitle)
    const xMenuButton = screen.getByRole("button", {
      name: "Päätöksen kuukausi"
    })
    await userEvent.click(xMenuButton)
    expect(xMenuButton).toBeInTheDocument()

    const typeMenuTitle = screen.getByRole("button", {
      name: "Valitse kaavion tyyppi"
    })
    await userEvent.click(typeMenuTitle)
    const typeMenuButton = screen.getByRole("button", {
      name: "bar"
    })
    await userEvent.click(typeMenuButton)
    expect(typeMenuButton).toBeInTheDocument()
    
    await userEvent.click(screen.getByRole("button", {
      name: "Lähetä"
    }))

    expect(screen.queryByTestId("notification")).not.toBeInTheDocument
    expect(screen.getByText("Mock Chart rendered succesfully.")).toBeInTheDocument()
  }) 

})