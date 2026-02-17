import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "./Mark.css";

function Courses() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [instructor, setInstructor] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/", { replace: true });
      return;
    }

    API.get("/courses")
      .then((res) => setCourses(res.data))
      .catch(() => navigate("/", { replace: true }));

  }, [navigate]);

  const handleAddCourse = () => {
    if (!courseName || !instructor) return;

    API.post("/courses", {
      courseName,
      instructor,
    }).then(() => {
      setCourseName("");
      setInstructor("");
      API.get("/courses").then((res) => setCourses(res.data));
    });
  };

  const handleDelete = (id) => {
    API.delete(`/courses/${id}`).then(() => {
      setCourses(courses.filter((c) => c.id !== id));
    });
  };

  return (
    <div className="layout">

      {/* Sidebar */}
      <div className="sidebar">
        <h2>CMIS Portal</h2>
        <ul>
          <li onClick={() => navigate("/dashboard")}>Dashboard</li>
          <li onClick={() => navigate("/marks")}>Marks</li>
          <li onClick={() => navigate("/fees")}>Fees</li>
          <li onClick={() => navigate("/courses")}>Courses</li>
          <li className="logout" onClick={() => {
            localStorage.clear();
            navigate("/", { replace: true });
          }}>Logout</li>
        </ul>
      </div>

      {/* Main */}
      <div className="main">
        <div className="header">
          <h2>Courses Management</h2>
        </div>

        {role === "ADMIN" && (
          <div className="table-card">
            <h3>Add Course</h3>

            <input
              type="text"
              placeholder="Course Name"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Instructor"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
            />

            <button onClick={handleAddCourse}>Add</button>
          </div>
        )}

        <div className="table-card">
          <div className="table-header">
            <span>Course</span>
            <span>Instructor</span>
            {role === "ADMIN" && <span>Action</span>}
          </div>

          {courses.map((c) => (
            <div key={c.id} className="table-row">
              <span>{c.courseName}</span>
              <span>{c.instructor}</span>
              {role === "ADMIN" && (
                <span>
                  <button onClick={() => handleDelete(c.id)}>
                    Delete
                  </button>
                </span>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Courses;
