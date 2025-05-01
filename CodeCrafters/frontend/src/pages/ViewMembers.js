import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ViewMembers() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/members")
      .then(res => setMembers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <h2>Team Members</h2>
      <div className="member-list">
        {members.map(member => (
          <div className="member-card" key={member._id}>
            <img src={`http://localhost:5000/uploads/${member.image}`} alt={member.name} />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
            <Link to={`/members/${member._id}`}>
              <button>View Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewMembers;
