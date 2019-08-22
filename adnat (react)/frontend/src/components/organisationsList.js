import React, { Component } from "react";
import ErrorContainer from "./error";

class OrganisationsList extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        organisations: [],
        name: null,
        hourlyRate: null,
        sessionId: this.props.sessionId
      };
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
          mode: 'cors',
          headers: {
            'Authorization': this.state.sessionId,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({"name": this.state.name, "hourlyRate": this.state.hourlyRate}),
      }; 
      
      fetch('http://localhost:3000/organisations/create_join', options)
        .then(res => res.json())
        .then((data) => {
          if(data.hasOwnProperty('error'))
          {
            this.setState({error: data.error});
          } 
          if(data.hasOwnProperty('id'))
          {
            this.props.getOrganisation(data);
          }
        })
        .catch(console.log);
    }

    leaveOrganisation() 
    {
      var options = { 
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': this.state.sessionId,
            'Content-Type': 'application/json'
        }
      }; 
      fetch('http://localhost:3000/organisations/leave', options)
          .then(() => {
            this.setState({error: ""});
          })
          .catch((e) => console.log("leaves join ", e));
    }

    joinOrganisation(id) // this is broken session id is missing
    {
      var options = { 
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': this.state.sessionId,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "organisationId": id }),

      }; 
      fetch('http://localhost:3000/organisations/join', options)
          .then(res => res.json())
          .then((data) => {
            if(data.hasOwnProperty('id')) this.props.getOrganisation(data);
            if(data.hasOwnProperty('error')) this.setState({error: data.error});
          })
          .catch((e) => console.log(e));
    }

    componentDidMount()
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

    render(){

        let leaveButton;
        if(this.state.error === "You're already in an organisation")
        {
          leaveButton = <button onClick={() => this.leaveOrganisation()}>Leave Organisation</button>
        }

        return(
          <div id="organisations_container">
            <div id="organisation_list">
              <center><h1>Organisations List</h1></center>
              <ErrorContainer error={this.state.error}></ErrorContainer><div>{leaveButton}</div>
              {this.state.organisations.map((organisation) => (
                <div className="card" key={organisation.id} className="card-body">
                    <h3 className="card-title">{organisation.name}</h3>
                    <p className="card-subtitle mb-2 text-muted">Hourly Rate: {organisation.hourlyRate}</p>
                    <button onClick={() => alert("brah, create this")}>Edit</button> <button onClick={() => this.joinOrganisation(organisation.id)}>Join</button>
                </div>
              ))}
            </div>

            <div id='create_organisation_container'>   
              <ErrorContainer error={this.state.error}></ErrorContainer>
              <div className="">
                <h2>Create Organisation</h2>
                <form onSubmit={this.handleSubmit}>
                    <div >
                        <input type="text" id="name" onChange={this.handleChange} placeholder="Name" />
                        <input type="text" id="hourlyRate" onChange={this.handleChange} placeholder="Hourly Rate" />
                        <input type="Submit"/>
                    </div>
                </form>
              </div>
            </div>
        </div>
        );
    }
}
export default OrganisationsList