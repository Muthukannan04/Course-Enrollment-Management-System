import React from "react";
import { UseAuth } from "./Auth";
import './User.css';

const User = () => {
  const auth = UseAuth();

  const handleLogout = () => {
    auth.Logout();
  };

  return (
    <div className="user-container">
      <h1>Welcome {auth.user}</h1>
      <p>
        This is your user profile. You can view and manage your account details here.
      </p>
      {auth.user && <button onClick={handleLogout}>Logout</button>}
    </div>
  );
};

export default User;
