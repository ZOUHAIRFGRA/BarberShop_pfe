import React, { useEffect, useState } from 'react';

const Login = ({setContentVisible}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login clicked');
    console.log('Email:', email);
    console.log('Password:', password)
  };
  useEffect(() => {
    setContentVisible(true);
  }, [setContentVisible])


  return (
    <div className="container mt-5 w-50 border border-1">
      <h2 className='text-center mt-4'>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit" className="btn btn-primary ">
          Login
        </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
