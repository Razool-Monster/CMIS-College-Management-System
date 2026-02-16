import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "./Dashboard.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");
  const registerNumber = localStorage.getItem("registerNumber");
  const course = localStorage.getItem("course");

  const [marks, setMarks] = useState([]);

  // 🔐 Protect Dashboard
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  // 📥 Load Marks
  useEffect(() => {
    API.get("/marks")
      .then((res) => setMarks(res.data))
      .catch(() => {
        alert("Unauthorized");
        navigate("/", { replace: true });
      });
  }, [navigate]);

  const chartData = {
    labels: marks.map((m) => m.subject),
    datasets: [
      {
        label: "Scores",
        data: marks.map((m) => m.score),
        backgroundColor: "#4e73df",
      },
    ],
  };

  return (
    <div className="layout">

      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="logo">CMIS Portal</h2>
    
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

      {/* Main Area */}
      <div className="main">

        {/* Header */}
        <div className="header">
          <div>
            <h2>Welcome, {name}</h2>

            {role === "STUDENT" && (
              <div style={{ marginTop: "5px", fontSize: "14px" }}>
                <p><strong>Register No:</strong> {registerNumber}</p>
                <p><strong>Course:</strong> {course}</p>
              </div>
            )}
          </div>

          <span>{role}</span>
        </div>

        {/* Stats Cards */}
        <div className="cards">
          <div className="card">
            <h3>Total Marks</h3>
            <p>{marks.length}</p>
          </div>

          <div className="card">
            <h3>Highest Score</h3>
            <p>
              {marks.length > 0
                ? Math.max(...marks.map((m) => m.score))
                : 0}
            </p>
          </div>

          <div className="card">
            <h3>Subjects</h3>
            <p>
              {marks.length > 0
                ? new Set(marks.map((m) => m.subject)).size
                : 0}
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="table-card">
          <h3>Marks Analysis</h3>
          {marks.length > 0 ? (
            <Bar data={chartData} />
          ) : (
            <p>No data available</p>
          )}
        </div>

        {/* Marks Table */}
        <div className="table-card">
          <h3>Marks Overview</h3>

          <div className="table-header">
            {role !== "STUDENT" && <span>Student</span>}
            <span>Subject</span>
            <span>Score</span>
          </div>

          {marks.map((m) => (
            <div key={m.id} className="table-row">
              {role !== "STUDENT" && <span>{m.studentName}</span>}
              <span>{m.subject}</span>
              <span>{m.score}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
