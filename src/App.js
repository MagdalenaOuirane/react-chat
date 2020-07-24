import React from "react";
import Chat from "./Chat";
import "./App.css";


export default class App extends React.Component {




  render() {
    return (
      <div className="App">
        <header className="app-header">
          <h1 className="app-title">Welcome to React chat</h1>
        </header>
        <Chat/>
      
      </div>
    );
  }
}
