import React, { Component} from "react";
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import Login from './components/login';
import SignUp from './components/signUp';
import User from './components/user';
import "./app.css";

class App extends Component{

  state = {
    sessionId: 0,
  };

  setSessionId = (sessionId) => {
    this.setState({sessionId: sessionId})
  };

  setCurrentUser = (user) => {
    this.setState({user: user})
  };

  resetSessionId = () => {
    this.setState({sessionId: 0})
  };

  render(){
    // Remember: this is global, do you want this on every page? 

    let login, signup, user;
    if (this.state.sessionId == 0) 
    {
      login = <div><Login getSessionId={this.setSessionId}/> Or</div>;
      signup = <SignUp getSessionId={this.setSessionId}/>;
    } else {
      user = <div><User sessionId={this.state.sessionId} user={this.state.user} logout={this.resetSessionId}/> 
            </div>;
    }

    return(
      <div className="App">
        <h1> Adnat </h1>
        <div id="login">
          {login}
          {signup}
        </div>
        <div>
          {user}
        </div>
     </div>
    
    );
  }
}

export default App;
