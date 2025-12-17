import getChartStrategy from "./ChartStrategy"

const filterAndSort = (chartXaxis, setelit, chartFilters, chartStartDate, chartEndDate) => {

  const startDate = chartStartDate ? new Date(chartStartDate) : null
  const endDate = chartEndDate ? new Date(chartEndDate) : null
  
  const dateFilteredSetelit = [...setelit].filter(seteli => {
    const date = new Date(seteli["Päätöksen päivämäärä"])
    if (startDate && date < startDate) return false
    if (endDate && date > endDate) return false
    return true
  })

  const palvelutuoteFilteredSetelit = [...dateFilteredSetelit].filter(seteli => Object.keys(seteli.Palvelutuotteet)
    .some(palvelutuote => chartFilters.includes(palvelutuote))
  )

  const palvelutuoteFilteredSetelit2 = palvelutuoteFilteredSetelit.map(seteli => {
    const filteredPalvelutuotteet = {}

    // Miks tässä on forEach?
    chartFilters.forEach(filter => {
      if (seteli.Palvelutuotteet[filter]) {
        filteredPalvelutuotteet[filter] = seteli.Palvelutuotteet[filter]
      }
    })

    return {
      ...seteli,
      Palvelutuotteet: filteredPalvelutuotteet
    }
  })

  const filteredSetelit = palvelutuoteFilteredSetelit2.length === 0
  ? [...dateFilteredSetelit]
  : [...palvelutuoteFilteredSetelit2]

  if (chartXaxis === "Päätöksen päivämäärä" || chartXaxis === "Päätöksen kuukausi") {
    const sortedSetelit = [...filteredSetelit].sort(
      (a, b) => new Date(a["Päätöksen päivämäärä"]) - new Date(b["Päätöksen päivämäärä"])
    )
    return sortedSetelit
  }

  if (chartXaxis === "Päätöksen numero") {
    // Täs pitäis testaa, että onhan nää oikeesti numeroita, niin sen testin vois tehdä siinä csvToJson tiedostossa
    const sortedSetelit = [...filteredSetelit].sort(
      (a, b) => a[chartXaxis].slice(1) - b[chartXaxis].slice(1)
    )
    return sortedSetelit
  }

  return filteredSetelit
}

const getNames = (chartXaxis, filteredAndSortedSetelit) => {

  if (chartXaxis === "Päätöksen päivämäärä" || chartXaxis === "Päätöksen numero") {
    const newSet = new Set(filteredAndSortedSetelit.map(seteli => seteli[chartXaxis]))
    const newArray = Array.from(newSet)
    return newArray
  }

  if (chartXaxis === "Palvelutuotteet") {
    const palvelutuotteetSet = new Set(filteredAndSortedSetelit.flatMap(seteli => Object.keys(seteli.Palvelutuotteet)))
    // Tää sorttaus helpompi tehdä täällä, ei ehkä parasta koodausta
    const palvelutuotteetArray = Array.from(palvelutuotteetSet).sort()
    return palvelutuotteetArray
  }

  if (chartXaxis === "Päätöksen kuukausi") {
    const newSet = new Set(filteredAndSortedSetelit.map(seteli => seteli["Päätöksen päivämäärä"].slice(0,-3)))
    const newArray = Array.from(newSet)
    return newArray
  }

  console.error("getNames()-funktio pääsi loppuun asti.")
  return []
}

const increaseCount = (chartYaxis, chartXaxis, seteli, valueName) => {

  if (chartXaxis === "Palvelutuotteet") {

    if (chartYaxis === "Päätöksen numero") {
      return(seteli[chartXaxis][valueName] ? 1 : 0)
    }

    if (chartYaxis === "Arviohinta" || chartYaxis === "Myönnetyt määrät") {
      return(seteli[chartXaxis][valueName] ? seteli[chartXaxis][valueName][chartYaxis] : 0)
    }
  }

  // nää vois periaatteessa yhdistää esim tuohon xaxis === "Palvelutuotteet" ja yaxis === "Päätöksen numero"
  if (chartXaxis === "Päätöksen päivämäärä" || chartXaxis === "Päätöksen numero") {

    if (chartXaxis === "Päätöksen päivämäärä" && chartYaxis === "Päätöksen numero") {
      return(seteli[chartXaxis] === valueName ? 1 : 0)
    }

    if (chartYaxis === "Palvelutuotteet") {
      return(seteli[chartXaxis] === valueName ? Object.keys(seteli[chartYaxis]).length : 0)
    }

    if (chartYaxis === "Arviohinta" || chartYaxis === "Myönnetyt määrät") {
      let subCount = 0

      if (seteli[chartXaxis] === valueName) {
        const seteliPalvelutuotteet = Object.keys(seteli.Palvelutuotteet)

        for (let k = 0; k < Object.keys(seteli.Palvelutuotteet).length; k++) {
          subCount += seteli.Palvelutuotteet[seteliPalvelutuotteet[k]][chartYaxis]
        }
      }

      return subCount
    }
  }

  if (chartXaxis === "Päätöksen kuukausi") {

    if (chartYaxis === "Päätöksen numero") {
      return (seteli["Päätöksen päivämäärä"].slice(0,-3) === valueName ? 1 : 0)
    }

    if (chartYaxis === "Palvelutuotteet") {
      return(seteli["Päätöksen päivämäärä"].slice(0,-3) === valueName ? Object.keys(seteli[chartYaxis]).length : 0)
    }

    if (chartYaxis === "Arviohinta" || chartYaxis === "Myönnetyt määrät") {
      let subCount = 0

      if (seteli["Päätöksen päivämäärä"].slice(0,-3) === valueName) {
        const setelinPalvelutuotteet = Object.keys(seteli.Palvelutuotteet)

        for (let k = 0; k < Object.keys(seteli.Palvelutuotteet).length; k++) {
          subCount += seteli.Palvelutuotteet[setelinPalvelutuotteet[k]][chartYaxis]
        }
      }

      return subCount
    }
  }

  console.error("increaseCount()-funktio pääsi loppuun asti.")
  return 0
}

const getValues = (chartYaxis, chartXaxis, filteredAndSortedSetelit) => {
  const valueNames = getNames(chartXaxis, filteredAndSortedSetelit)
  let newValues = []

  for (let i = 0; i < valueNames.length; i++) {
    const valueName = valueNames[i]
    let count = 0

    for (let j = 0; j < filteredAndSortedSetelit.length; j++) {
      const seteli = filteredAndSortedSetelit[j]
      count += increaseCount(chartYaxis, chartXaxis, seteli, valueName)
    }

    newValues.push(count)
  }

  return newValues
}

const getChartInfo = ({chartYaxis, chartXaxis, chartFilters, chartStartDate, chartEndDate, chartType, setelit}) => {
  const filteredAndSortedSetelit = filterAndSort(chartXaxis, setelit, chartFilters, chartStartDate, chartEndDate)
  const names = getNames(chartXaxis, filteredAndSortedSetelit)
  console.log("names", names)
  const values = getValues(chartYaxis, chartXaxis, filteredAndSortedSetelit)
  console.log("values", values)
  
  let errorMessage = null

  if(names.length === 0) {
    console.error("names", names)
    errorMessage = "Virhe: Ei dataa valitulla X-akselin arvolla, yritä uudestaan."
  }

  else if (names.length > values.length){
    console.error("names", names)
    console.error("values", values)
    errorMessage = "Virhe: taulukon x-akselin arvoja on enemmän kuin y-akselin arvoja, yritä uudestaan"
  }

  else if (names.length < values.length){
    console.error("names", names)
    console.error("values", values)
    errorMessage = "Virhe: taulukon y-akselin arvoja on enemmän kuin x-akselin arvoja, yritä uudestaan."
  }
  console.log("errorMessage", errorMessage)

  const strategy = getChartStrategy(chartType)
  const {options, series} = strategy(names, values)

  return {errorMessage, options, series}
}

export const testables = {
  filterAndSort,
  getNames,
  increaseCount,
  getValues
}

export default getChartInfo