import React, { Component } from 'react';
import Login from './components/login';
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {

  state = {
    sessionId: "63c31de4-0752-488a-8de6-d8548bb605f9"
  }

  componentDidMount() {

    // var xhr = new XMLHttpRequest();
    // xhr.open("get", "http://localhost:3000/", true);
    // xhr.onload = function(){  //instead of onreadystatechange
    //   console.log(this.responseText);
    // };
    // xhr.send(null);

    fetch('http://localhost:3000/organisations'
    , { 
      method: 'GET',
      mode: 'cors',
      headers: {
          'Authorization': '63c31de4-0752-488a-8de6-d8548bb605f9',
          'Content-Type': 'application/json'
      }
    }
    )
    .then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error));
    

        // let headers = new Headers({
    //   "Authorization" : "584d89a7-85ae-4de3-857b-a8bd27f0d5bb",
    //   "Content-Type"  : "application/json"
    // });

    // fetch('http://localhost:3000/organisations'
    //   )
    //     .then(res => res.json())
    //     .then(response => console.log('Success:', JSON.stringify(response)))
    //     .catch(error => console.error('Error:', error));
  }

  render () {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Login} />
        </div>
      </Router>
    );
  }
}

export default App;
