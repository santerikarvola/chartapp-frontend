const Notification = ({message}) => {

  const notificationStyle = {
    color: "red",
    marginTop: 20
  }

  if (!message) {
    return null
  }

  return (
    <div style={notificationStyle}>
      <h5>{message}</h5>
    </div>    
  )
}

export default Notification