import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForm, setShowForm] = useState(false); // State to manage form visibility
  const navigate = useNavigate(); // Initialize useNavigate

 
  
  const handleUserClick = () => {
    navigate('/user-login'); // Navigate to the signup page using navigate function
  };
  const handleCompanyClick = () => {
    navigate('/compnay-login'); // Navigate to the signup page using navigate function
  };
  const handleInstiClick = () => {
    navigate('/institution-login'); // Navigate to the signup page using navigate function
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
        setShowForm(true);
      } else {
        // Handle error
      }
    } catch (error) {
      // Handle network error
    }
  };

  return (
    <div className='mainpage'>
      <h1 >Select Login type</h1>
      <ul className='mainlinks'>
      <li><a href='/user-login' className='navlink' >User</a><br></br></li>
      <li><a href='/company-login' className='navlink' >Company</a><br></br></li>
      <li><a href='/institution-login' className='navlink' >Institution</a><br></br></li>
      </ul>
    </div>
  );
}

export default Login;
