import React from 'react'

const Organisations = ({ organisations }) => {
  return (
    <div>
      <center><h1>Organisations List</h1></center>
      {organisations.map((organisation) => (
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{organisation.name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{organisation.hourlyRate}</h6>
          </div>
        </div>
      ))}
    </div>
  )
};

export default Organisations