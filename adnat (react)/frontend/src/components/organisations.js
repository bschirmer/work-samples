import React, { Component } from "react";
import ErrorContainer from "./error";

class Organisations extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        organisations: [],
        sessionId: this.props.sessionId
      };
    }

    joinOrganisation()
    {
      var options = { 
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': this.state.sessionId,
            'Content-Type': 'application/json'
        },
    }; 
    fetch('http://localhost:3000/organisations', options)
        .then(res => res.json())
        .then((data) => {
          this.setState({organisations: data});
        })
        .catch(console.log);
    }

    componentDidMount()
    {
        this.setState({sessionId: this.props.sessionId});
        var options = { 
            method: 'GET',
            mode: 'cors',
            headers: {
                'Authorization': this.state.sessionId,
                'Content-Type': 'application/json'
            },
        }; 
        fetch('http://localhost:3000/organisations', options)
            .then(res => res.json())
            .then((data) => {
              this.setState({organisations: data});
            })
            .catch(console.log);
    }

    render(){
        return(
          <div id="organisation_list">
            <center><h1>Organisations List</h1></center>
            <ErrorContainer error={this.state.error}></ErrorContainer>
            {this.state.organisations.map((organisation) => (
              <div className="card">
                <div key={organisation.id} className="card-body">
                  <p className="card-title">{organisation.name}</p>
                  <p className="card-subtitle mb-2 text-muted">Hourly Rate: {organisation.hourlyRate}</p>
                  <button onClick={() => alert("brah, create this")}>Edit</button> <button onClick={this.joinOrganisation}>Join</button>
                  <a ></a>
                </div>
              </div>
            ))}
          </div>
        );
    }
}
export default Organisations