import { useState, useEffect } from "react"
import seteliService from "./services/setelit"
import OwnChart from "./components/OwnChart"

import "bootstrap/dist/css/bootstrap.min.css"

import DatePicker from "react-datepicker"
import { registerLocale, setDefaultLocale } from  "react-datepicker"
import { fi } from "date-fns/locale/fi"
import "react-datepicker/dist/react-datepicker.css"
registerLocale("fi", fi)
setDefaultLocale("fi")

import "./index.css"
import OwnDropMenu from "./components/OwnDropMenu"
import Notification from "./components/Notification"

const App = () => {

  const [setelit, setSetelit] = useState([])

  const [errorMessage, setErrorMessage] = useState(null)

  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [yaxis, setYaxis] = useState("")
  const [xaxis, setXaxis] = useState("")
  const [type, setType] = useState("")
  const [filters, setFilters] = useState([])

  const [chartStartDate, setChartStartDate] = useState(null)
  const [chartEndDate, setChartEndDate] = useState(null)
  const [chartYaxis, setChartYaxis] = useState("")
  const [chartXaxis, setChartXaxis] = useState("")
  const [chartType, setChartType] = useState("")
  const [chartFilters, setChartFilters] = useState([])

  useEffect(() => {
    seteliService      
      .getAll()      
      .then(initialSetelit => {        
        setSetelit(initialSetelit)      
      })  
    }, [])

  const handleSubmit = event => {
    event.preventDefault()
    setErrorMessage(null)

    if (!yaxis || !xaxis || !type) {
      setErrorMessage("Valitse sekä X-akseli, Y-akseli että kaaviotyyppi.")
      setTimeout(() => {setErrorMessage(null)}, 5000)
      return
    }
    if (yaxis === xaxis) {
      setErrorMessage("Y-akseli ja X-akseli eivät voi olla samat.")
      setTimeout(() => {setErrorMessage(null)}, 5000)
      return
    }
    if ((startDate > endDate) && startDate && endDate){
      setErrorMessage("Loppupäivämäärä ei voi olla ennen alkupäivämäärää.")
      setTimeout(() => {setErrorMessage(null)}, 5000)
    }
    else {
      setChartStartDate(startDate)
      setChartEndDate(endDate)
      setChartYaxis(yaxis)
      setChartXaxis(xaxis)
      setChartType(type)
      setChartFilters(filters)
    }
  }

  const handleRemove = event => {
    event.preventDefault()
    setFilters([])
    setStartDate(null)
    setEndDate(null)
  }

  const changeFilters = item => {
    const newFilters = filters.includes(item)
    ? filters.filter(n => n !== item)
    : filters.concat(item)
    setFilters(newFilters)
    if (!newFilters.includes("Päätöksen päivämäärä")) {
      setStartDate(null)
      setEndDate(null)
    }
  }

  return (
    <div style={{margin: 10}}>
      <h1>Palvelusetelit</h1>
      <h2>Tervetuloa myönnettyjen palvelusetelien tilastointisovellukseen!</h2>
      <br />

      <h5>Y-akselin valinta</h5>
      <OwnDropMenu
        id="yaxis-button"
        title="Valitse y-akseli"
        value={yaxis}
        func={setYaxis}
        isFilter={false}
        setelit={setelit}
      />
      <br />

      <h5>X-akselin valinta</h5>
      <OwnDropMenu
        id="xaxis-button"
        title="Valitse x-akseli"
        value={xaxis}
        func={setXaxis}
        isFilter={false}
        setelit={setelit}
      />
      <br />

      <h5>Suodattimien valinta</h5>
      <h6>Valitut suodattimet:</h6>
      {filters.length === 0 
      ? <p>Et ole valinnut suodattimia.</p>
      : <ul data-testid="filter-list">
        {filters.map(item => (
          <li key={item}>{item}</li>)
        )}
      </ul>}
      <div style={{display: "flex"}}>
        <OwnDropMenu
          id="filter-button"
          title="Valitse suodattimet"
          value={"Valitse suodattimet"}
          func={changeFilters}
          isFilter={true}
          setelit={setelit}
        />
        <form onSubmit={handleRemove} style={{marginLeft: 10}}>
          <button type="submit" style={{color: "red", borderColor: "red", backgroundColor: "white", borderRadius: 7, paddingTop: 5, paddingBottom: 5}}>Poista suodattimet</button>
        </form>
      </div>

      {filters.includes("Päätöksen päivämäärä") 
      ? <div data-testid="datepickers">
          <p>Alkupäivämäärä</p>
          <div data-testid="start-date-id">
            <DatePicker
              style={{marginLeft: 20}}
              calendarClassName="custom-datepicker"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <p>Loppupäivämäärä</p>
          <div data-testid="end-date-id">
            <DatePicker 
              style={{marginLeft: 20}}
              calendarClassName="custom-datepicker"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <br />
        </div>
      : null }
      <br />

      <h5>Kaaviotyypin valinta</h5>
      <OwnDropMenu
        id="chart-button"
        title="Valitse kaavion tyyppi"
        value={type}
        func={setType}
        isFilter={false}
        setelit={setelit}
      />
      <br />

      <p>Lähetysnappi</p>
      <Notification data-testid="notification" message={errorMessage} />
      <form onSubmit={handleSubmit}>
        <button type="submit" style={{borderRadius: 7}}>Lähetä</button>
      </form>
      
      {chartXaxis && chartYaxis && chartType
      ? <OwnChart
        chartYaxis={chartYaxis}
        chartXaxis={chartXaxis}
        chartFilters={chartFilters}
        chartStartDate={chartStartDate}
        chartEndDate={chartEndDate}
        chartType={chartType}
        setelit={setelit}
      />
      : null}

    </div>
  )
}

export default App