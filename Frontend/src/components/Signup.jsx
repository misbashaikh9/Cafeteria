import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import eyeIcon from "../assets/eye-close.png";
import eyeOffIcon from "../assets/eye-open.png";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return Swal.fire('Error', 'Passwords do not match!', 'error');
    }

    if (!/^(?=.*[0-9])(?=.*[!@#$%^&]).{6,}$/.test(password)) {
      return Swal.fire(
        'Weak Password',
        'Must include 1 number + 1 special char & min 6 chars',
        'warning'
      );
    }

    try {
      const res = await axios.post('http://localhost:3001/signup', {
        name,
        email,
        password,
      });

      if (res.status === 201 || res.status === 200) {
        // Save token and username in localStorage
        localStorage.setItem('username', res.data.username);
        localStorage.setItem('token', res.data.token);

        Swal.fire({
          icon: 'success',
          title: `Welcome ${res.data.username}! ☕`,
          text: 'Your account is ready!',
          timer: 1500,
          showConfirmButton: false,
        }).then(() => navigate('/signin'));
      }
    } catch (err) {
      if (err.response?.status === 409) {
        Swal.fire('Oops!', 'Email already exists!', 'error');
      } else {
        Swal.fire('Error', 'Something went wrong', 'error');
      }
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#f6f1eb',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: '#fffaf4',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          maxWidth: '420px',
          width: '100%',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            color: '#6f4e37',
            marginBottom: '30px',
            fontWeight: '600',
          }}
        >
          Create Your Account
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <input
          type="email"
          placeholder="Email Address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <div style={{ position: 'relative', marginBottom: '16px' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyleWithIcon}
          />
          <img
            src={showPassword ? eyeOffIcon : eyeIcon}
            alt="toggle"
            onClick={() => setShowPassword(!showPassword)}
            style={eyeIconStyle}
          />
        </div>

        <div style={{ position: 'relative', marginBottom: '24px' }}>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={inputStyleWithIcon}
          />
          <img
            src={showConfirmPassword ? eyeOffIcon : eyeIcon}
            alt="toggle"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            style={eyeIconStyle}
          />
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            backgroundColor: '#a47148',
            color: 'white',
            border: 'none',
            padding: '12px',
            borderRadius: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '16px',
            marginBottom: '12px',
          }}
        >
          Sign Up
        </button>

        <div
          style={{
            textAlign: 'center',
            fontSize: '14px',
            color: '#5e4632',
          }}
        >
          Already registered?{' '}
          <span
            onClick={() => navigate('/signin')}
            style={{
              color: '#6f4e37',
              fontWeight: 'bold',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Sign In
          </span>
        </div>
      </form>
    </div>
  );
};

// Styles outside component
const inputStyle = {
  marginBottom: '16px',
  padding: '12px',
  borderRadius: '10px',
  border: '1px solid #cdbba7',
  width: '100%',
  fontSize: '14px',
  backgroundColor: '#fff',
};

const inputStyleWithIcon = {
  ...inputStyle,
  paddingRight: '40px',
};

const eyeIconStyle = {
  position: 'absolute',
  top: '50%',
  right: '12px',
  transform: 'translateY(-50%)',
  width: '20px',
  height: '20px',
  cursor: 'pointer',
  opacity: 0.7,
};

export default Signup;
