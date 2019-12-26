import React from 'react'

import PropTypes from 'prop-types'

const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
  }


  if(isError)
  {
    return (
      <div className="error">
        {message}
      </div>
    )
  }
  else
  {
    return (
      <div className="success">
        {message}
      </div>
    )
  }
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired
}


export default Notification
