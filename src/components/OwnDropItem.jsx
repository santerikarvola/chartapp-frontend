import Dropdown from 'react-bootstrap/Dropdown'

const OwnDropItem = ({item, func}) => {

  return (
    <Dropdown.Item onClick={() => func(item)}>{item}</Dropdown.Item>
  )
}

export default OwnDropItem