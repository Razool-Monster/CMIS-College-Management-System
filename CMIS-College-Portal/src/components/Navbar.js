import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const role = localStorage.getItem("role");

  return (
    <div className="navbar">
      <h2>CMIS</h2>

      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>

        {role !== "STUDENT" && (
          <Link to="/courses">Courses</Link>
        )}

        <Link to="/fees">Fees</Link>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
