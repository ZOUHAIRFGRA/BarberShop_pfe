// components/Login.js
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/authActions';
import { useNavigate } from 'react-router-dom';

const Login = ({ setContentVisible, login, isLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulate authentication (replace with actual authentication logic)
    const userData = {
      email,
      password,
    };

    // Dispatch the login action
    login(userData);

    // Redirect to homepage upon successful login
    navigate('/');
  };

  useEffect(() => {
    setContentVisible(true);
    // Redirect to homepage if already logged in
    if (isLoggedIn) {
      navigate('/');
    }
  }, [setContentVisible, isLoggedIn, navigate]);


  return (
    <div className='min-vh-100 mt-auto'>
      <div className="container mt-5 w-50 border border-1 ">
        <h2 className='text-center mt-4'>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address:
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
    </div>
  );
};
const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  login: (userData) => dispatch(login(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);