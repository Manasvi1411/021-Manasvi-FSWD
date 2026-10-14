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
  const [touched, setTouched] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  
  const getPasswordStrength = (pwd) => {
    if (!pwd) return { text: '', color: '#e2e8f0' };
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score += 1;
    if (/\d/.test(pwd)) score += 1;
    if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pwd)) score += 1;

    switch (score) {
      case 1:
        return { text: 'Weak', color: '#e53e3e' };
      case 2:
        return { text: 'Fair', color: '#dd6b20' };
      case 3:
        return { text: 'Good', color: '#3182ce' };
      case 4:
        return { text: 'Strong', color: '#38a169' };
      default:
        return { text: 'Too Short', color: '#e53e3e' };
    }
  };

 
  const validateField = (fieldName, value, allValues = formData) => {
    let error = '';

    switch (fieldName) {
      case 'name':
        if (!value.trim()) {
          error = 'Student name is required.';
        } else if (value.trim().length < 3) {
          error = 'Name must be at least 3 characters.';
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          error = 'Name should contain only letters and spaces.';
        }
        break;

      case 'email':
        if (!value.trim()) {
          error = 'Email address is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email address (e.g., student@example.com).';
        }
        break;

      case 'phone':
        if (!value.trim()) {
          error = 'Phone number is required.';
        } else if (!/^\d{10}$/.test(value.trim())) {
          error = 'Phone number must be exactly 10 digits.';
        }
        break;

      case 'password':
        if (!value) {
          error = 'Password is required.';
        } else if (value.length < 8) {
          error = 'Password must be at least 8 characters long.';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(value)) {
          error = 'Must contain uppercase, lowercase, number, and special character.';
        }
        break;

      case 'confirmPassword':
        if (!value) {
          error = 'Please confirm your password.';
        } else if (value !== allValues.password) {
          error = 'Passwords do not match.';
        }
        break;

      default:
        break;
    }

    return error;
  };

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);

    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value, updated) }));
    }

    if (name === 'password' && touched.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: validateField('confirmPassword', formData.confirmPassword, updated)
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value, formData) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fields = ['name', 'email', 'phone', 'password', 'confirmPassword'];
    const newErrors = {};
    const newTouched = {};

    fields.forEach((field) => {
      newTouched[field] = true;
      const err = validateField(field, formData[field], formData);
      if (err) newErrors[field] = err;
    });

    setTouched(newTouched);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmittedData({
        ...formData,
        submittedAt: new Date().toLocaleString()
      });
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
    setTouched({});
    setSubmittedData(null);
  };

  const strength = getPasswordStrength(formData.password);

  return (
    <div style={{ maxWidth: '600px', margin: '30px auto', fontFamily: 'Segoe UI, sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#1a365d' }}>Student Registration Form</h2>

      {submittedData ? (
        <div style={{ background: '#f0fff4', border: '2px solid #9ae6b4', borderRadius: '10px', padding: '25px', marginTop: '20px' }}>
          <h3 style={{ color: '#22543d', textAlign: 'center' }}>✓ Registration Successful!</h3>
          <p style={{ color: '#2f855a', textAlign: 'center' }}>Submitted Details:</p>
          <ul style={{ listStyleType: 'none', padding: '10px 0', lineHeight: '2' }}>
            <li><strong>Name:</strong> {submittedData.name}</li>
            <li><strong>Email:</strong> {submittedData.email}</li>
            <li><strong>Phone:</strong> {submittedData.phone}</li>
            <li><strong>Password:</strong> •••••••• (Validated)</li>
            <li><strong>Date:</strong> {submittedData.submittedAt}</li>
          </ul>
          <button
            onClick={handleReset}
            style={{ width: '100%', padding: '10px', background: '#3182ce', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Register Another Student
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ background: '#ffffff', padding: '25px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '5px' }}>Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter student full name"
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: errors.name && touched.name ? '1.5px solid #e53e3e' : '1px solid #cbd5e0' }}
            />
            {touched.name && errors.name && (
              <div style={{ color: '#e53e3e', fontSize: '13px', marginTop: '4px' }}>⚠️ {errors.name}</div>
            )}
          </div>

        
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '5px' }}>Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="student@example.com"
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: errors.email && touched.email ? '1.5px solid #e53e3e' : '1px solid #cbd5e0' }}
            />
            {touched.email && errors.email && (
              <div style={{ color: '#e53e3e', fontSize: '13px', marginTop: '4px' }}>⚠️ {errors.email}</div>
            )}
          </div>

         
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '5px' }}>Phone Number (10 digits) *</label>
            <input
              type="tel"
              name="phone"
              maxLength="10"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="9876543210"
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: errors.phone && touched.phone ? '1.5px solid #e53e3e' : '1px solid #cbd5e0' }}
            />
            {touched.phone && errors.phone && (
              <div style={{ color: '#e53e3e', fontSize: '13px', marginTop: '4px' }}>⚠️ {errors.phone}</div>
            )}
          </div>

         
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '5px' }}>Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Min 8 chars, 1 uppercase, 1 digit, 1 special char"
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: errors.password && touched.password ? '1.5px solid #e53e3e' : '1px solid #cbd5e0' }}
            />
            {formData.password && (
              <div style={{ fontSize: '12px', marginTop: '4px', color: strength.color }}>
                Strength: <strong>{strength.text}</strong>
              </div>
            )}
            {touched.password && errors.password && (
              <div style={{ color: '#e53e3e', fontSize: '13px', marginTop: '4px' }}>⚠️ {errors.password}</div>
            )}
          </div>

         
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '5px' }}>Confirm Password *</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Re-enter password"
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: errors.confirmPassword && touched.confirmPassword ? '1.5px solid #e53e3e' : '1px solid #cbd5e0' }}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <div style={{ color: '#e53e3e', fontSize: '13px', marginTop: '4px' }}>⚠️ {errors.confirmPassword}</div>
            )}
          </div>

          
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="submit"
              style={{ flex: 1, padding: '12px', background: '#3182ce', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Register Student
            </button>
            <button
              type="button"
              onClick={handleReset}
              style={{ flex: 1, padding: '12px', background: '#edf2f7', color: '#4a5568', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Reset
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
