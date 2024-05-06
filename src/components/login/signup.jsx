import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
function Signup() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
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
        body: JSON.stringify({ name, age, email, userType, institution, password, uniqueId }),
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
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Age:
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Institution: 
        <input type="text" value={institution} onChange={(e) => setInstitution(e.target.value)} />
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
      <button type="submit" >Sign Up</button>
     
    </form>
  );
}

export default Signup;