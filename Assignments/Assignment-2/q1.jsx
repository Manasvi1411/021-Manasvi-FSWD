import React, { useState } from 'react';

export default function EmployeeTable() {

  const [employees] = useState([
    { id: 101, name: 'Alice Johnson', department: 'Engineering', salary: 75000 },
    { id: 102, name: 'Bob Smith', department: 'Marketing', salary: 45000 },
    { id: 103, name: 'Charlie Brown', department: 'Human Resources', salary: 52000 },
    { id: 104, name: 'Diana Prince', department: 'Product Design', salary: 68000 },
    { id: 105, name: 'Evan Wright', department: 'Sales', salary: 42000 },
    { id: 106, name: 'Fiona Gallagher', department: 'Finance', salary: 81000 },
    { id: 107, name: 'George Clark', department: 'Operations', salary: 49000 },
    { id: 108, name: 'Hannah Abbott', department: 'Engineering', salary: 56000 }
  ]);

  const SALARY_THRESHOLD = 50000;

 
  const highSalaryStyle = {
    backgroundColor: '#d1fae5',
    color: '#065f46',
    fontWeight: '600'
  };

  const normalSalaryStyle = {
    backgroundColor: '#ffffff',
    color: '#334155'
  };

  const badgeHighStyle = {
    backgroundColor: '#059669',
    color: '#ffffff',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600'
  };

  const badgeNormalStyle = {
    backgroundColor: '#e2e8f0',
    color: '#475569',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600'
  };

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', fontFamily: 'Segoe UI, sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#1a365d' }}>Employee Directory</h2>
      <p style={{ textAlign: 'center', color: '#64748b' }}>
        Highlighting employees with salary &gt; ₹50,000 using conditional styling
      </p>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>ID</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Department</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Salary (₹)</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          
          {employees.map((employee) => {
            const isAbove50k = employee.salary > SALARY_THRESHOLD;

            return (
              <tr
                key={employee.id}
                style={{
                  ...(isAbove50k ? highSalaryStyle : normalSalaryStyle),
                  borderBottom: '1px solid #e2e8f0'
                }}
              >
                <td style={{ padding: '12px' }}>#{employee.id}</td>
                <td style={{ padding: '12px' }}>{employee.name}</td>
                <td style={{ padding: '12px' }}>{employee.department}</td>
                <td style={{ padding: '12px' }}>₹{employee.salary.toLocaleString()}</td>
                <td style={{ padding: '12px' }}>
                  {isAbove50k ? (
                    <span style={badgeHighStyle}>High Salary (&gt; 50k)</span>
                  ) : (
                    <span style={badgeNormalStyle}>Standard</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
