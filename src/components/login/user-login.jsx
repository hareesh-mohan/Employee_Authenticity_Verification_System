import { set } from 'mongoose';
import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
 // Import useNavigate hook

function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState(''); // State variable to store user ID

  const [showForm, setShowForm] = useState(false); // State to manage form visibility

  const navigate = useNavigate(); // Initialize useNavigate

  const handleLoginClick = () => {
    setShowForm(true); // Show the form after clicking "Login" button
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try { 
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setShowForm(true); // Set the user ID from the response
        handleSignupClick(data.user.uniqueId);
      } else {
        // Handle error
      }
    } catch (error) {
      // Handle network error
    }
  }

  const handleSignupClick = (userId) => {
    navigate(`/userdash/${email}/${userId}`); // Navigate to the signup page using navigate function
  };

  return (
    
    <form onSubmit={handleSubmit} className='form-container'>
        <h1>User Login</h1>
      <label>
        Username
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        Password
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <button type="submit" >Login</button><br></br>
      If you don't have an account click <a href='/signup1' className='but' >here</a>
    </form>
  );
}

export default UserLogin;
