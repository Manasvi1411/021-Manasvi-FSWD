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

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center' }}>Employee Details</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#2c3e50', color: 'white' }}>
            <th style={{ border: '1px solid #ccc', padding: '10px' }}>ID</th>
            <th style={{ border: '1px solid #ccc', padding: '10px' }}>Name</th>
            <th style={{ border: '1px solid #ccc', padding: '10px' }}>Department</th>
            <th style={{ border: '1px solid #ccc', padding: '10px' }}>Salary</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr
              key={emp.id}
              style={{
                backgroundColor: emp.salary > 50000 ? '#d4edda' : 'white',
                fontWeight: emp.salary > 50000 ? 'bold' : 'normal',
                textAlign: 'center'
              }}
            >
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>{emp.id}</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>{emp.name}</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>{emp.department}</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>Rs. {emp.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
