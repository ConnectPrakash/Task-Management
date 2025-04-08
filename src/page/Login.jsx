import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import image from '../assets/login-img.jpg';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('https://task-management-1-al5b.onrender.com/user/login', {
        email,
        password,
      });

      const token = response.data.token;
      if (!token) {
        throw new Error('Token not received from server ❌');
      }

      localStorage.setItem('token', token); // Store token
      navigate('/'); // Redirect to home page
    } catch (error) {
      console.error('Login Error:', error);
      setMessage(
        error.response?.data?.message ||
        'Something went wrong. Please try again ❌'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="image-container">
          <img src={image} alt="default-image" />
        </div>
        <div className="input-container">
          <h2>Login</h2>

          <form onSubmit={handleSubmit}>
            <div className="input">
              <label>Email</label>
              <input
                type="text"
                placeholder="Enter Email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter Password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="input">
              <button type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>

          {message && (
            <p className={`message ${message.includes('❌') ? 'error' : ''}`}>
              {message}
            </p>
          )}

          <p>
            If you dont have an account, <Link to="/signin">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
