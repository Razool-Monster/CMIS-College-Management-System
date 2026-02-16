import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "./Dashboard.css";

function Fees() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  const [fees, setFees] = useState([]);

  // 🔐 Protect page
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  // 📥 Load fees
  useEffect(() => {
    API.get("/fees")
      .then((res) => {
        setFees(res.data);
      })
      .catch(() => {
        alert("Unauthorized");
        navigate("/", { replace: true });
      });
  }, [navigate]);

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
          <h2>Fees Details</h2>
          <span>{name} ({role})</span>
        </div>

        <div className="table-card">
          <h3>Fees Overview</h3>

          <div className="table-header">
            {role !== "STUDENT" && <span>Student</span>}
            <span>Amount</span>
            <span>Status</span>
          </div>

          {fees.length === 0 ? (
            <p>No fees available</p>
          ) : (
            fees.map((f) => (
    <div key={f.id} className="table-row">
    {role !== "STUDENT" && (
      <span>{f.studentName}</span>   // ✅ PUT IT HERE
    )}
      <span>₹ {f.amount}</span>
      <span>{f.status}</span>
                <span
                  style={{
                    color:
                      f.status === "PAID" ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {f.status}
                </span>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default Fees;
