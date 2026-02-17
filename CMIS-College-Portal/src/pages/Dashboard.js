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

  const [marks, setMarks] = useState([]);

  //  Protect Dashboard
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  //  Load Marks (For Stats + Chart Only)
  useEffect(() => {
    API.get("/marks")
      .then((res) => setMarks(res.data))
      .catch(() => navigate("/", { replace: true }));
  }, [navigate]);

  //   Chart Data
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
        <h2>CMIS Portal</h2>
        <ul>
          <li onClick={() => navigate("/dashboard")}>Dashboard</li>
          <li onClick={() => navigate("/marks")}>Marks</li>
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

        {/* Header */}
        <div className="header">
          <h2>Welcome, {name}</h2>
          <span className="role-badge">{role}</span>
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

        {/* Chart Section */}
        <div className="table-card">
          <h3>Marks Analysis</h3>
          {marks.length > 0 ? (
            <Bar data={chartData} />
          ) : (
            <p>No data available</p>
          )}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
