import React, { useState } from "react"; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card p-4 shadow" style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h3 className="mb-3 text-center">Register</h3>
      {error && <p className="text-danger text-center">{error}</p>}

      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label>Email</label>
          <input
            className="form-control"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            className="form-control"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>
        <button className="btn btn-success w-100" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
