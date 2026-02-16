import React from "react";
import { useNavigate } from "react-router-dom";
import "./Courses.css";

function Courses() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const courses = [
    { name: "Mathematics", faculty: "Dr. John" },
    { name: "Physics", faculty: "Dr. Smith" },
    { name: "Computer Science", faculty: "Prof. David" },
  ];

  return (
    <div className="layout">

      {/* Sidebar */}
      <div className="sidebar">
        <h2>CMIS</h2>
        <ul>
          <li onClick={() => navigate("/dashboard")}>Dashboard</li>
          <li onClick={() => navigate("/fees")}>Fees</li>
          {role !== "STUDENT" && (
            <li onClick={() => navigate("/courses")}>Courses</li>
          )}
          <li
            className="logout"
            onClick={() => {
              localStorage.clear();
              navigate("/", { replace: true });
            }}
          >
            Logout
          </li>
        </ul>
      </div>

      {/* Main */}
      <div className="main">
        <div className="header">
          <h2>Available Courses</h2>
        </div>

        <div className="table-card">
          <div className="table-header">
            <span>Course Name</span>
            <span>Faculty</span>
          </div>

          {courses.map((course, index) => (
            <div key={index} className="table-row">
              <span>{course.name}</span>
              <span>{course.faculty}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Courses;
