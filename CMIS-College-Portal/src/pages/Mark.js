import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "./Mark.css";

function Marks() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const [marks, setMarks] = useState([]);
  const [studentEmail, setStudentEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [score, setScore] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/", { replace: true });
      return;
    }

    API.get("/marks")
      .then((res) => setMarks(res.data))
      .catch(() => navigate("/", { replace: true }));

  }, [navigate]);

  const handleAddMark = () => {
    if (!studentEmail || !subject || !score) return;

    API.post("/marks", {
      studentEmail,
      subject,
      score,
    }).then(() => {
      setStudentEmail("");
      setSubject("");
      setScore("");
      API.get("/marks").then((res) => setMarks(res.data));
    });
  };

  const handleDelete = (id) => {
    API.delete(`/marks/${id}`).then(() => {
      setMarks(marks.filter((m) => m.id !== id));
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
          <h2>Marks Management</h2>
        </div>

        {(role === "ADMIN" || role === "FACULTY") && (
          <div className="table-card">
            <h3>Add Mark</h3>

            <input
              type="text"
              placeholder="Student Email"
              value={studentEmail}
              onChange={(e) => setStudentEmail(e.target.value)}
            />

            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />

            <input
              type="number"
              placeholder="Score"
              value={score}
              onChange={(e) => setScore(e.target.value)}
            />

            <button onClick={handleAddMark}>Add</button>
          </div>
        )}

        <div className="table-card">
          <div className="table-header">
            {role !== "STUDENT" && <span>Student</span>}
            <span>Subject</span>
            <span>Score</span>
            {role === "ADMIN" && <span>Action</span>}
          </div>

          {marks.map((m) => (
            <div key={m.id} className="table-row">
              {role !== "STUDENT" && <span>{m.studentName}</span>}
              <span>{m.subject}</span>
              <span>{m.score}</span>
              {role === "ADMIN" && (
                <span>
                  <button onClick={() => handleDelete(m.id)}>
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

export default Marks;
