import React, { useState, useEffect } from 'react';
import './StudentForm.css';

const StudentForm = ({ fetchStudents, editingStudent, setEditingStudent }) => {
  const [s_id, setSId] = useState('');
  const [s_name, setSName] = useState('');
  const [department, setDepartment] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    if (editingStudent) {
      setSId(editingStudent.s_id);
      setSName(editingStudent.s_name);
      setDepartment(editingStudent.department);
      setMobileNo(editingStudent.mobileNo);
      setEmail(editingStudent.email);
      setAge(editingStudent.age);
      setGender(editingStudent.gender);
    } else {
      setSId('');
      setSName('');
      setDepartment('');
      setMobileNo('');
      setEmail('');
      setAge('');
      setGender('');
    }
  }, [editingStudent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const student = { s_id, s_name, department, mobileNo, email, age, gender };

    try {
      if (editingStudent) {
        await fetch(`http://localhost:8080/studentservice/${s_id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(student),
        });
      } else {
        await fetch('http://localhost:8080/studentservice', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(student),
        });
      }

      fetchStudents();
      setEditingStudent(null);
      setSId('');
      setSName('');
      setDepartment('');
      setMobileNo('');
      setEmail('');
      setAge('');
      setGender('');
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>{editingStudent ? 'Edit Student' : 'Add Student'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={s_id}
          onChange={(e) => setSId(e.target.value)}
          placeholder="Student ID"
          required
          disabled={!!editingStudent}
        />
        <input
          type="text"
          value={s_name}
          onChange={(e) => setSName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          placeholder="Department"
          required
        />
        <input
          type="text"
          value={mobileNo}
          onChange={(e) => setMobileNo(e.target.value)}
          placeholder="Mobile No"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
          required
        />
        <input
          type="text"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          placeholder="Gender"
          required
        />
        <button type="submit">{editingStudent ? 'Update Student' : 'Add Student'}</button>
      </form>
    </div>
  );
};

export default StudentForm;
