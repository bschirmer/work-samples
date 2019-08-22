import React, { Component } from "react";
import ErrorContainer from "./error"

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: "",
    };
  }

  validateForm(event) {
    let retVal = true;
    if(this.state.email.length == 0){
      this.error += "Please enter an email address";
      retVal = false;
    }
    if(this.state.password.length > 6) {
      this.error += "Password must be 6 or more charaters long";
      retVal = false;
    }
    return retVal;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    if (!this.validateForm()) return;

    var options = { 
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state),
    }; 
    
    fetch('http://localhost:3000/auth/login', options)
      .then(res => res.json())
      .then((data) => {
        if(data.hasOwnProperty('error'))
        {
          this.setState({error: data.error});
        } 
        if(data.hasOwnProperty('sessionId'))
        {
          this.props.getSessionId(data.sessionId);
        }
      })
      .catch(console.log);
  }

  render() {
      return(
        <div id='login_container'>   
          <ErrorContainer error={this.state.error}></ErrorContainer>
          <div className="Login">
            <h2>Login</h2>
            <form onSubmit={this.handleSubmit}>
                <div>
                    <input type="text" id="email" onChange={this.handleChange} placeholder="Email" />
                    <input type="password" id="password" onChange={this.handleChange} placeholder="Password"/>
                    <input type="Submit" label="Login"/>
                </div>
            </form>
          </div>
        </div>
      );
  }
}

export default Login;