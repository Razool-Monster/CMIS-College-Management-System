import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [registerNumber, setRegisterNumber] = useState("");
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (isSignUp) {
        await API.post("/auth/register", {
          name,
          email,
          password,
          registerNumber,
          course,
        });

        alert("Registration Successful!");
        setIsSignUp(false);
      } else {
        const res = await API.post("/auth/login", {
          email,
          password,
        });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("registerNumber", res.data.registerNumber);
        localStorage.setItem("course", res.data.course);

        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      alert("Operation Failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <h2>{isSignUp ? "Student Sign Up" : "Sign In"}</h2>

          {isSignUp && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="Register Number"
                value={registerNumber}
                onChange={(e) => setRegisterNumber(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="Course"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                required
              />
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            {isSignUp ? "Register" : "Login"}
          </button>

          <p
            className="switch-text"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </p>
        </form>
      </div>
    </div>
  );
}

export default AuthPage;
