import React from 'react'

class UIMessageDisplay extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        {
          this.props.messageType.toUpperCase() === 'ERROR' ? 
            <ErrorDisplay message={this.props.message} /> :
            <SuccessDisplay message={this.props.message} />
        }
      </div>
    )
  }
}

export default UIMessageDisplay;


function ErrorDisplay({message}) {
  return (
    <div id='error-display'>{message.toUpperCase()}</div>
  )
}

function SuccessDisplay({message}) {
  return (
    <div id='success-display'>{message.toUpperCase()}</div>
  )
}