import React, { Component } from "react";
import Organisations from "./organisations";
import ErrorContainer from "./error";

class User extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        id: 0,
        organisationId: -1,
        name: "",
        email: "",
        sessionId: this.props.sessionId
      };
    }

    componentDidMount(){
        this.setState({sessionId: this.props.sessionId});
        var options = { 
            method: 'GET',
            mode: 'cors',
            headers: {
                'Authorization': this.state.sessionId,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state),
        }; 
        fetch('http://localhost:3000/users/me', options)
            .then(res => res.json())
            .then((data) => {
                if(data.hasOwnProperty('id')) this.setState({id: data.id});
                if(data.hasOwnProperty('organisationId')) this.setState({organisationId: data.organisationId});
                if(data.hasOwnProperty('name')) this.setState({name: data.name});
                if(data.hasOwnProperty('email')) this.setState({email: data.email});
                if(data.hasOwnProperty('error')) this.setState({error: data.error});
                })
            .catch(console.log);
    }

    render(){
        let joinOrgMessage, organisationInfo;
        if(this.state.organisationId = -1)
        {
            joinOrgMessage = <div>
                                <p>Whoa, hold up there bud. It looks like you haven't joined an organisation.
                                   Here is a list of organisations you can join. Then you can access the good stuff</p>
                            </div>;
            organisationInfo = <Organisations sessionId={this.state.sessionId}/>;
        } else {
            
        }

        return(
            <div id="user_container">
                <ErrorContainer error={this.state.error}></ErrorContainer>
                {joinOrgMessage}
                {organisationInfo}
            </div>
        );
    }
}
export default User