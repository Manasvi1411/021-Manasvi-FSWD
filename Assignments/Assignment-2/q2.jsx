import React, { useState } from 'react';

/**
 * Question 2:
 * React code to demonstrate event handling:
 * 1. A box that changes its colour on mouse over and mouse out
 * 2. Displays a message on double click
 * 3. Shows the key pressed in an input field (onKeyDown)
 * 4. A form whose onSubmit handler uses preventDefault() and shows an alert.
 */
export default function EventHandlingDemo() {
  // 1. Box State: Mouse Over & Mouse Out (color state), and Double Click message
  const [isHovered, setIsHovered] = useState(false);
  const [boxMessage, setBoxMessage] = useState('Double-click the box above to see an event message.');

  // 2. Keyboard State: onKeyDown key capture
  const [keyPressed, setKeyPressed] = useState('None');
  const [keyCode, setKeyCode] = useState('-');

  // 3. Form State: onSubmit with preventDefault()
  const [feedbackInput, setFeedbackInput] = useState('');

  // Handler: Mouse enter / hover
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Handler: Mouse leave / out
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Handler: Double click
  const handleDoubleClick = () => {
    const timestamp = new Date().toLocaleTimeString();
    setBoxMessage(`🎉 Box double-clicked at ${timestamp}! (onDoubleClick event triggered)`);
  };

  // Handler: onKeyDown
  const handleKeyDown = (event) => {
    setKeyPressed(event.key === ' ' ? 'Space' : event.key);
    setKeyCode(event.code || event.key);
  };

  // Handler: Form onSubmit with preventDefault()
  const handleSubmit = (event) => {
    // Prevent default browser reload
    event.preventDefault();

    if (!feedbackInput.trim()) {
      alert('⚠️ Please enter some text before submitting the form!');
      return;
    }

    // Alert displaying submitted input
    alert(
      `✅ Form Submitted Successfully!\n` +
      `Default page reload was prevented using e.preventDefault().\n\n` +
      `Input Value: "${feedbackInput}"`
    );

    // Reset input
    setFeedbackInput('');
  };

  const boxStyle = {
    width: '280px',
    height: '150px',
    backgroundColor: isHovered ? '#38a169' : '#3182ce',
    color: '#ffffff',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    padding: '10px',
    textAlign: 'center'
  };

  return (
    <div style={{ maxWidth: '800px', margin: '30px auto', fontFamily: 'Segoe UI, sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#1a365d' }}>React Event Handling Demo</h2>

      {/* Part 1: Mouse Over, Mouse Out & Double Click Box */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '20px', margin: '20px 0' }}>
        <h3 style={{ color: '#2b6cb0', marginBottom: '15px' }}>1. Mouse Hover & Double Click Box</h3>
        <div
          style={boxStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onDoubleClick={handleDoubleClick}
        >
          <strong>{isHovered ? '🟢 Mouse Over (Green)' : '🔵 Default State (Blue)'}</strong>
          <span style={{ fontSize: '12px', marginTop: '6px' }}>Hover to change color | Double click for message</span>
        </div>
        <div style={{ marginTop: '15px', padding: '10px', background: '#ebf8ff', border: '1px solid #bee3f8', borderRadius: '6px', textAlign: 'center', color: '#2b6cb0' }}>
          <strong>Message:</strong> {boxMessage}
        </div>
      </div>

      {/* Part 2: onKeyDown on Input Field */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '20px', margin: '20px 0' }}>
        <h3 style={{ color: '#2b6cb0', marginBottom: '15px' }}>2. Key Press Detection (onKeyDown)</h3>
        <input
          type="text"
          placeholder="Type here to test onKeyDown..."
          onKeyDown={handleKeyDown}
          style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '15px' }}
        />
        <div style={{ marginTop: '10px', padding: '10px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
          <strong>Last Key Pressed:</strong> <span style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>{keyPressed}</span> (Code: {keyCode})
        </div>
      </div>

      {/* Part 3: Form onSubmit with preventDefault() */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '20px', margin: '20px 0' }}>
        <h3 style={{ color: '#2b6cb0', marginBottom: '15px' }}>3. Form onSubmit with preventDefault()</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="Enter feedback or text..."
            value={feedbackInput}
            onChange={(e) => setFeedbackInput(e.target.value)}
            style={{ flex: 1, padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '15px' }}
          />
          <button
            type="submit"
            style={{ backgroundColor: '#3182ce', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
