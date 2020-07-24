import React from 'react'
import PropTypes from 'prop-types'

class ChatInput extends React.Component {
  static propTypes = {
    onSubmitMessage: PropTypes.func.isRequired,
  }

  state = {
    message: '',
   }

  handleInputChange = (event) => {
    this.setState({
      message: event.target.value,
    })
  }

  render() {
    return (
      <form
        action=""
        onSubmit={(event) => {
          event.preventDefault()
          this.props.onSubmitMessage(this.state.message)
          this.setState({ message: '' })
        }}
      >
        <input
          type="text"
          placeholder="Enter message here"
          value={this.state.message}
          onChange={this.handleInputChange}
        />
        <input type="submit" value="Send" />
      </form>
    )
  }
}
export default ChatInput
