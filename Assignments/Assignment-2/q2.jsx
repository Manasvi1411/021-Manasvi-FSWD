import React, { useState } from 'react';

export default function EventHandlingDemo() {
  const [boxColor, setBoxColor] = useState('lightblue');
  const [message, setMessage] = useState('');
  const [keyPressed, setKeyPressed] = useState('');
  const [formData, setFormData] = useState('');

  const handleMouseOver = () => {
    setBoxColor('coral');
  };

  const handleMouseOut = () => {
    setBoxColor('lightblue');
  };

  const handleDoubleClick = () => {
    setMessage('Box was double clicked!');
  };

  const handleKeyDown = (e) => {
    setKeyPressed(e.key);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted successfully with input: ' + formData);
    setFormData('');
  };

  return (
    <div style={{ maxWidth: '500px', margin: '30px auto', background: 'white', padding: '25px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h2>React Event Handling</h2>

      <div style={{ margin: '20px 0', padding: '15px', borderBottom: '1px solid #eee' }}>
        <h3>Mouse Events & Double Click</h3>
        <div
          style={{
            width: '250px',
            height: '120px',
            margin: '20px auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: boxColor === 'lightblue' ? '#333' : 'white',
            fontWeight: 'bold',
            borderRadius: '6px',
            cursor: 'pointer',
            backgroundColor: boxColor,
            transition: 'background-color 0.3s'
          }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onDoubleClick={handleDoubleClick}
        >
          Hover or Double Click Me
        </div>
        {message && <p style={{ color: 'green', fontWeight: 'bold' }}>{message}</p>}
      </div>

      <div style={{ margin: '20px 0', padding: '15px', borderBottom: '1px solid #eee' }}>
        <h3>Key Down Event</h3>
        <input
          type="text"
          placeholder="Type here..."
          onKeyDown={handleKeyDown}
          style={{ width: '80%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <p>Key Pressed: <strong>{keyPressed}</strong></p>
      </div>

      <div style={{ margin: '20px 0', padding: '15px' }}>
        <h3>Form Submit Event</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter text..."
            value={formData}
            onChange={(e) => setFormData(e.target.value)}
            style={{ width: '80%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <br />
          <button
            type="submit"
            style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
