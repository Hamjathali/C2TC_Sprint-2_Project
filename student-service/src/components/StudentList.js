import React from "react";
import "./StudentList.css";

const StudentList = ({ students, fetchStudents, setEditingStudent }) => {
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8080/studentservice/${id}`, {
        method: "DELETE",
      });
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div className="student-list-container">
      <h2>Student Records</h2>
      {students.length === 0 ? (
        <p className="no-data">No students available.</p>
      ) : (
        <div className="student-grid">
          {students.map((student) => (
            <div key={student.s_id} className="student-card">
              <div className="student-details">
                <h3>{student.s_name}</h3>
                <p>
                  <strong>ID:</strong> {student.s_id}
                </p>
                <p>
                  <strong>Email:</strong> {student.email}
                </p>
                <p>
                  <strong>Mobile:</strong> {student.mobileNo}
                </p>
                <p>
                  <strong>Department:</strong> {student.department}
                </p>
                <p>
                  <strong>Age:</strong> {student.age}
                </p>
                <p>
                  <strong>Gender:</strong> {student.gender}
                </p>
              </div>
              <div className="card-buttons">
                <button
                  className="edit-btn"
                  onClick={() => setEditingStudent(student)}>
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(student.s_id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentList;
