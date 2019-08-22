import React, { Component } from "react";
import OrganisationsList from "./organisationsList";
import Organisation from "./organisation";
import ErrorContainer from "./error";

class User extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        id: -1,
        organisationId: null,
        organisationName: null,
        organisationHourlyRate: null,
        name: "",
        email: "",
        sessionId: this.props.sessionId
      };
    }

    setOrganisation = (organisation) => {
        this.setState({organisationId: organisation.id, organisationName: organisation.name, organisationHourlyRate: organisation.hourlyRate});
        console.log(organisation)
    };

    resetOrgansationId = () => {
        this.setState({organisationId: null})
    };

    componentDidMount()
    {
        var options = { 
            method: 'GET',
            mode: 'cors',
            headers: {
                'Authorization': this.state.sessionId,
                'Content-Type': 'application/json'
            }
        }; 
        fetch('http://localhost:3000/users/me', options)
            .then(res => res.json())
            .then((data) => {
                if(data.hasOwnProperty('id')) this.setState({id: data.id});
                if(data.hasOwnProperty('organisationId')) this.setState({organisation: data.organisationId});
                if(data.hasOwnProperty('name')) this.setState({name: data.name});
                if(data.hasOwnProperty('email')) this.setState({email: data.email});
                if(data.hasOwnProperty('error')) this.setState({error: data.error});
                })
            .catch(console.log);
    }

    render() {
        let joinOrgMessage, organisationsList, organisationInfo;
        if(this.state.organisationId == null)
        {
            joinOrgMessage = <div>
                                <p>Whoa, hold up there bud. It looks like you haven't joined an organisation.
                                   Here is a list of organisations you can join. Then you can access the good stuff</p>
                            </div>;
            organisationsList= <OrganisationsList sessionId={this.state.sessionId} getOrganisation={this.setOrganisation}/>;
        } else {
            organisationInfo = <Organisation sessionId={this.state.sessionId} organisationName={this.state.organisationName} organisationHourlyRate={this.state.organisationHourlyRate} leaveOrganisation={this.resetOrgansationId}/>
        }

        return(
            <div id="user_container">
                <ErrorContainer error={this.state.error}></ErrorContainer>
                <div id="user_info">
                    <p> Hey there, {this.state.name} </p>
                    <button onClick={this.props.logout}>Logout</button>
                </div>
                {joinOrgMessage}
                {organisationsList}
                {organisationInfo}
            </div>
        );
    }
}
export default User;