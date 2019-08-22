import React, { Component } from "react";
import ErrorContainer from "./error";

class Organisation extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        name: this.props.organisationName,
        hourlyRate: this.props.organisationHourlyRate,
        sessionId: this.props.sessionId,
        error: "",
        shifts: []
      };

      console.log(this.props);
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
            this.props.leaveOrganisation()
          })
          .catch((e) => console.log("leaves join ", e));
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
        fetch('http://localhost:3000/shifts', options)
            .then(res => res.json())
            .then((data) => {
              this.setState({shifts: data});
            })
            .catch(console.log);
    }

    render(){
        return(
          <div id="organisation">
            <ErrorContainer error={this.state.error}></ErrorContainer>
            <div> Organisation.js</div>
              <div className="card-title">
              {this.state.name}
                <p className="card-subtitle mb-2 text-muted">Hourly Rate: {this.state.hourlyRate}</p>
                  <button onClick={() => alert("brah, create this")}>Edit</button> <button onClick={() => this.leaveOrganisation()}>Leave</button>
              </div>

              <div id="shifts_container">
              

                <table className="ui celled table">
                  <thead>
                    <tr><th>Employee</th>
                    <th>Start Time</th>
                    <th>Finish Time</th>
                    <th>Break Length (mins)</th>
                    <th>Hours Worked</th>
                    <th>Shift Cost</th>
                  </tr></thead>
                  <tbody>
                  {this.state.shifts.map((shift) => (
                    <tr>
                      <td data-label="Employee">{shift.userId}</td>
                      <td data-label="StartTime">{shift.start}</td>
                      <td data-label="FinishTime">{shift.finish}</td>
                      <td data-label="BreakLength">{shift.breakLength}</td>
                      <td data-label="HoursWorked">{shift.start - shift.finish}</td>
                      <td data-label="ShiftCost">{(shift.start - shift.finish) * this.state.hourlyRate}</td>
                    </tr>
                    ))}
                  </tbody>
                </table>


              </div>
          </div>
        );
    }
}
export default Organisation