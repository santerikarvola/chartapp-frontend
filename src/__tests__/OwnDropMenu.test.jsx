import {render, screen, cleanup} from "@testing-library/react"
import OwnDropMenu from "../components/OwnDropMenu"
import {describe, it, expect, vi, afterEach} from "vitest"
import {userEvent} from "@testing-library/user-event"
import "@testing-library/jest-dom/vitest"

afterEach(() => {
  cleanup()
})

describe("OwnDropMenu", () => {
  const testSetelit = [
    {
      "Päätöksen numero": "P1",
      "Päätöksen päivämäärä": "2025-01-01",
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
      "Päätöksen numero": "P3",
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
      "Päätöksen numero": "P5",
      "Päätöksen päivämäärä": "2025-02-28",
      "Palvelutuotteet": {
        "Neuropsykologinen kuntoutus": {
          "Arviohinta": 0,
          "Myönnetyt määrät": 0
        }
      }
    }
  ]


  it("renders a notification if itemsArray is empty (id does not satisfy one of the if-clauses in createItems)", () => {
    const fn = vi.fn()

    render(
      <OwnDropMenu
        id="wrong-button"
        title="Valitse x-akseli"
        value="x-akseli"
        func={fn}
        isFilter={false}
        setelit={testSetelit}
      />
    )
    
    expect(screen.getByText("Virhe: itemsArrayn luonti epäonnistui.")).toBeInTheDocument()
  })

  it("rendes xaxis-button items correctly in dropdown", async () => {
    const fn = vi.fn()

    render(
      <OwnDropMenu
        id="xaxis-button"
        title="Valitse x-akseli"
        value="x-akseli"
        func={fn}
        isFilter={false}
        setelit={testSetelit}
      />
    )
    const menuTitle = screen.getByText("x-akseli")

    await userEvent.click(menuTitle)

    expect(screen.getByText("Päätöksen päivämäärä")).toBeInTheDocument()
    expect(screen.getByText("Päätöksen kuukausi")).toBeInTheDocument()
    expect(screen.getByText("Päätöksen numero")).toBeInTheDocument()
    expect(screen.getByText("Palvelutuotteet")).toBeInTheDocument()
  })

  it("rendes yaxis-button items correctly in dropdown", async () => {
    const fn = vi.fn()

    render(
      <OwnDropMenu
        id="yaxis-button"
        title="Valitse y-akseli"
        value="y-akseli"
        func={fn}
        isFilter={false}
        setelit={testSetelit}
      />
    )
    const menuTitle = screen.getByText("y-akseli")

    await userEvent.click(menuTitle)

    expect(screen.getByText("Päätöksen numero")).toBeInTheDocument()
    expect(screen.getByText("Palvelutuotteet")).toBeInTheDocument()
    expect(screen.getByText("Arviohinta")).toBeInTheDocument()
    expect(screen.getByText("Myönnetyt määrät")).toBeInTheDocument()    
  })

  it("rendes chart-button items correctly in dropdown", async () => {
    const fn = vi.fn()

    render(
      <OwnDropMenu
        id="chart-button"
        title="Valitse kaavion tyyppi"
        value="kaaviotyyppi"
        func={fn}
        isFilter={false}
        setelit={testSetelit}
      />
    )
    const menuTitle = screen.getByText("kaaviotyyppi")

    await userEvent.click(menuTitle)

    expect(screen.getByText("bar")).toBeInTheDocument()
    expect(screen.getByText("line")).toBeInTheDocument()  
    expect(screen.getByText("pie")).toBeInTheDocument()
    expect(screen.getByText("donut")).toBeInTheDocument() 
  })  

  it("rendes filter-button items correctly in dropdown", async () => {
    const fn = vi.fn()

    render(
      <OwnDropMenu
        id="filter-button"
        title="Valitse suodattimet"
        value="suodattimet"
        func={fn}
        isFilter={true}
        setelit={testSetelit}
      />
    )
    const menuTitle = screen.getByText("suodattimet")
    await userEvent.click(menuTitle)

    expect(screen.getByText("Päätöksen päivämäärä")).toBeInTheDocument()
    expect(screen.getByText("Palvelutuotteet")).toBeInTheDocument()  

    const palvelutuoteTitle = screen.getByRole("button", {
      name: "Palvelutuotteet"
    })
    await userEvent.click(palvelutuoteTitle)
    
    expect(screen.getByText("Fysioterapia")).toBeInTheDocument()
    expect(screen.getByText("Hoitoneuvottelu")).toBeInTheDocument()
    expect(screen.getByText("Kognitiivinen psykoterapia")).toBeInTheDocument()
    expect(screen.getByText("Lyhytterapia")).toBeInTheDocument()
    expect(screen.getByText("Neuropsykologinen kuntoutus")).toBeInTheDocument()   
  })  

})