import React, { useState } from 'react';

export default function StudentRegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    let err = {};

    if (!formData.name.trim()) {
      err.name = 'Name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      err.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      err.email = 'Invalid email format';
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone) {
      err.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      err.phone = 'Phone must be exactly 10 digits';
    }

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!formData.password) {
      err.password = 'Password is required';
    } else if (formData.password.length < 8) {
      err.password = 'Password must be at least 8 characters';
    } else if (!strongPasswordRegex.test(formData.password)) {
      err.password = 'Password must contain uppercase, lowercase, number, and special character';
    }

    if (!formData.confirmPassword) {
      err.confirmPassword = 'Confirm password is required';
    } else if (formData.confirmPassword !== formData.password) {
      err.confirmPassword = 'Passwords do not match';
    }

    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmittedData(formData);
    } else {
      setSubmittedData(null);
    }
  };

  return (
    <div style={{ maxWidth: '450px', margin: '30px auto', background: 'white', padding: '25px 30px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Student Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          {errors.name && <div style={{ color: 'red', fontSize: '13px', marginTop: '4px' }}>{errors.name}</div>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          {errors.email && <div style={{ color: 'red', fontSize: '13px', marginTop: '4px' }}>{errors.email}</div>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Phone Number:</label>
          <input
            type="text"
            name="phone"
            maxLength="10"
            value={formData.phone}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          {errors.phone && <div style={{ color: 'red', fontSize: '13px', marginTop: '4px' }}>{errors.phone}</div>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          {errors.password && <div style={{ color: 'red', fontSize: '13px', marginTop: '4px' }}>{errors.password}</div>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          {errors.confirmPassword && <div style={{ color: 'red', fontSize: '13px', marginTop: '4px' }}>{errors.confirmPassword}</div>}
        </div>

        <button
          type="submit"
          style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer', marginTop: '10px' }}
        >
          Register
        </button>
      </form>

      {submittedData && (
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e8f4fd', border: '1px solid #b8daff', borderRadius: '4px' }}>
          <h3 style={{ color: '#0c5460', marginTop: 0 }}>Submitted Details</h3>
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Phone:</strong> {submittedData.phone}</p>
        </div>
      )}
    </div>
  );
}
