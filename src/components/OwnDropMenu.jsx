import DropdownButton from "react-bootstrap/DropdownButton"
import "bootstrap/dist/css/bootstrap.min.css"
import OwnDropItem from "./OwnDropItem"
import Notification from "./Notification"

const createItems = id => {

  if (id === "filter-button") {
    return ["Päätöksen päivämäärä"]
  }

  if (id === "xaxis-button") {
    return ["Päätöksen päivämäärä", "Päätöksen kuukausi", "Päätöksen numero", "Palvelutuotteet"]
  }

  if (id === "yaxis-button") {
    return ["Päätöksen numero", "Palvelutuotteet", "Arviohinta", "Myönnetyt määrät"]
  }

  if (id === "chart-button") {
    return ["bar", "line", "pie", "donut"]
  }

  return null
}

const OwnDropMenu = ({id, title, value, func, isFilter, setelit}) => {

  const palvelutuotteetSet = new Set(setelit.flatMap(seteli => Object.keys(seteli.Palvelutuotteet)))
  const palvelutuotteetArray = Array.from(palvelutuotteetSet).sort()

  const itemsArray = createItems(id)

  return (
    <div>
      {!itemsArray 
      ? <Notification message={"Virhe: itemsArrayn luonti epäonnistui."} />
      : <DropdownButton 
        id={id} 
        title={value === "" ? title : value}
      >
        {itemsArray.map(item => (
          <OwnDropItem
            key={item}
            item={item}
            func={func}
          />
        ))}
        {isFilter && (
          <DropdownButton
              id={`${id}-palvelutuote-button`} 
              title="Palvelutuotteet"
          >
            {palvelutuotteetArray.map(item => (
              <OwnDropItem
                key={item}
                item={item}
                func={func}
              />
            ))}       
          </DropdownButton>
        )}

      </DropdownButton>
      }
    </div>
  )
}

export default OwnDropMenu