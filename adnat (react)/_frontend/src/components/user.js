import React, { Component } from "react";


const User = ({ user }) => {return (
    <div>
    organisationId = {user.organisationId},
    name = {user.name},
    email = {user.email}
    </div>
    );
}

export default User