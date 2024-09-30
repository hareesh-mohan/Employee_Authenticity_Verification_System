import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
function Signup1() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
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
        body: JSON.stringify({ name, age, gender,email, userType, institution, password }),
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
        Name:
        <input type="text" value={name} placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Age:
        <input type="number" value={age} placeholder="Enter your age"  onChange={(e) => setAge(e.target.value)} />
      </label>
      <label>
        Gender:
        <input type="text" value={gender} placeholder="Enter your gender"  onChange={(e) => setGender(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Institution:
        <input type="text" value={institution} placeholder="Enter your institution" onChange={(e) => setInstitution(e.target.value)} />
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

export default Signup1;
