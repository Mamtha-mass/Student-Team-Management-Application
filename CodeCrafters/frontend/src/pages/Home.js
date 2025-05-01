import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container">
      <h2>Welcome to the CodeCrafters Team Manager</h2>
      <p>Use this platform to manage your student team members efficiently.</p>
      <Link to="/add"><button>Add Member</button></Link>
      <Link to="/view"><button>View Members</button></Link>
    </div>
  );
}

export default Home;
