import React, { Component } from "react";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    var options = { 
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state),
    }; 

    
    fetch('http://localhost:3000/auth/login', options)
      .then(res => res.json())
      .then((data) => {
      //this.setState({ sessionId: data.sessionId });
      console.log(data);
      })
      .catch(console.log);

  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
            <div className="ui input">
                <input type="text" value="t@t.com" onChange={this.handleChange} placeholder="Email" />
                <input type="password" value="mypassword" onChange={this.handleChange} placeholder="Password"/>
                <input type="Submit" className="ui basic button" label="Login"/>
            </div>
        </form>
      </div>
    );
  }
}