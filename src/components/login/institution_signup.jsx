import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
function Institution_signup() {
  const [name, setName] = useState('');
  const [aicteid, setId] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('');
  const [password, setPassword] = useState('');
  const [uniqueId, setUniqueId] = useState('');
  const [institution, setInstitution] = useState('');

  const handleGenerateUniqueId = () => {
    // Concatenate username and password to create a unique string
    const uniqueString = `${email}:${password}`;

    // Generate a UUID based on the unique string
    const generatedUniqueId = uuidv4(uniqueString);
    console.log(generatedUniqueId);
    // Set the generated unique ID to state
    setUniqueId(generatedUniqueId);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name,  email,aicteid, userType,  password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message)
      } else {
        // Handle error
      }
    } catch (error) {
      // Handle network error
    }
  }

  return (
    <form onSubmit={handleSubmit} className='form-container'>
      <h1>Sign Up</h1>
      <label>
        {/* Name: */}
        <input type="text" value={name} placeholder="Enter institution name" onChange={(e) => setName(e.target.value)} />
      </label>
      
      <label>
        {/* Email: */}
        <input type="email" value={email} placeholder="Enter institution email" onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        {/* Email: */}
        <input type="aicteid" value={aicteid} placeholder="Enter AICTE ID" onChange={(e) => setId(e.target.value)} />
      </label>
      
      <label>
        User Type:
        <select value={userType} onChange={(e) => setUserType(e.target.value)}>
          <option value=""></option>
          <option value="company">Company</option>
          <option value="user">User</option>
          <option value="institution">Institution</option>
        </select>
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit" >Register</button>
      
    </form>
  );
}

export default Institution_signup;