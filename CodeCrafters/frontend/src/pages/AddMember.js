import React, { useState } from "react";
import axios from "axios";

function AddMember() {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    image: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("role", formData.role);
    data.append("email", formData.email);
    data.append("image", formData.image);

    try {
      await axios.post("http://localhost:5000/api/members", data);
      alert("Member added successfully!");
    } catch (error) {
      console.error(error);
      alert("Error adding member.");
    }
  };

  return (
    <div className="container">
      <h2>Add New Team Member</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} />
        <input type="text" name="role" placeholder="Role (e.g., Developer)" required onChange={handleChange} />
        <input type="email" name="email" placeholder="Email Address" required onChange={handleChange} />
        <input type="file" name="image" accept="image/*" required onChange={handleChange} />
        <button type="submit">Add Member</button>
      </form>
    </div>
  );
}

export default AddMember;
