import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthComponent() {
  const navigate = useNavigate(); // Corrected usage of useNavigate hook
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');
    const email = formData.get('email');
    
    let url;
    let successMessage;

    if (isLogin) {
      // Login
      url = 'http://localhost:8000/api/login/';
      successMessage = 'Login successful! Redirecting...';
    } else {
      // Register
      url = 'http://localhost:8000/api/register/';
      successMessage = 'Registration successful! Please login now.';
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,
        }),
      });

      if (response.ok) {
        // Registration or login successful
        const responseData = await response.json();
        // If login, store token in localStorage
        if (isLogin) {
          localStorage.setItem('accessToken', responseData.access);
        }
        alert(successMessage);
        // Redirect to "/home" after successful login
        navigate('/home');
      } else {
        // Registration or login failed
        const errorData = await response.json();
        alert("Not a valid user.. Have you registered ?"); // Display error message returned by server
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className='text-3xl font-bold mb-6'>You must login to view your courses.</h1>
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username:</label>
            <input type="text" id="username" name="username" className="w-full border rounded-md px-3 py-2" required />
          </div>
          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email:</label>
              <input type="email" id="email" name="email" className="w-full border rounded-md px-3 py-2" required />
            </div>
          )}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password:</label>
            <input type="password" id="password" name="password" className="w-full border rounded-md px-3 py-2" required />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <button onClick={toggleForm} className="mt-4 text-sm text-gray-600 hover:text-gray-800 focus:outline-none">
          {isLogin ? 'Switch to Register' : 'Switch to Login'}
        </button>
      </div>
    </div>
  );
}

export default AuthComponent;
