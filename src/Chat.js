import React from "react";
import ChatInput from "./ChatInput";
import MessageChat from "./MessageChat";
import "./Chat.css";

const URL = "ws://st-chat.shas.tel";

class Chat extends React.Component {
  state = {
    name: "",
    messages: [],
  };

  addMessage = (message) =>
    this.setState((state) => ({
      messages: [message, ...state.messages],
    }));

  submitMessage = (messageString) => {
    //on submitting the ChatInput form, send the message, add it to the list and reset the input
    const message = { name: this.state.name, message: messageString };
    this.webSocket.send(JSON.stringify(message));
    this.addMessage(message);
   
    
  };

  
  
  
  
  webSocket = new WebSocket(URL);

  componentDidMount() {
    this.webSocket.onopen = () => {
      console.log("Websocket connected");
    };

    this.webSocket.onmessage = (event) => {
      //on receiving a message, add it to the list of messages
      const message = JSON.parse(event.data);
      this.addMessage(message);
    };

    this.webSocket.onclose = () => {
      console.log("disconnected");
      //automatically try to  reconnect on connection loss
      this.setState({
        webSocket: new WebSocket(URL),
      });
    };
  }

  render() {
    return (
      <div>
        <label htmlFor="name">
          Name: &nbsp;
          <input
            type="text"
            id={"name"}
            placeholder="Enter your name.."
            value={this.state.name}
            onChange={(event) => this.setState({ name: event.target.value })}
          />
        </label>

       

        <ChatInput
          websocket={this.webSocket}
          onSubmitMessage={(messageString) => this.submitMessage(messageString)}
        />

        {this.state.messages.map((message, index) => (
          <MessageChat
            key={index}
            message={message.message}
            name={message.name}
          />
        ))}
      </div>
    );
  }
}

export default Chat;
