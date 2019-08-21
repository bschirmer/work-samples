import React, { Component} from "react";
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import Login from './components/login';
import SignUp from './components/signUp';
import User from './components/user';
import "./app.css";

class App extends Component{

  state = {
    sessionId: "ea86c925-1c57-4575-b2b3-a2c4950a00c9"
  };

  setSessionId = (sessionId) => {
    this.setState({sessionId: sessionId})
  };


  render(){
    // Remember: this is global, do you want this on every page? 

    let login, signup, user;
    if (this.state.sessionId == 0) 
    {
      login = <Login getSessionId={this.setSessionId}/>;
      signup = <SignUp getSessionId={this.setSessionId}/>;
    } else {
      user = <div><User sessionId={this.state.sessionId}/> <p>{this.state.sessionId}</p></div>;
    }

    return(
      <div className="App">
        <h1> Adnat </h1>
        <div id="login">
          {login}
        </div>
        <div>
          {user}
        </div>
     </div>
    );
  }
}

export default App;
