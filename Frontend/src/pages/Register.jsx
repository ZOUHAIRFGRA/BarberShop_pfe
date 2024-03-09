import React, { useEffect, useState } from 'react';

const Register = ({setContentVisible}) => {
  useEffect(() => {
    setContentVisible(true);
  }, [setContentVisible])
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    // Add your registration logic here
    console.log('Register clicked');
    console.log('Username:', username);
    console.log('Full Name:', fullName);
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className='min-vh-100'>
      <div className="container mt-5 w-50 border border-1">
      <h2 className='text-center mt-4'>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className='text-center mb-4'>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Register;
