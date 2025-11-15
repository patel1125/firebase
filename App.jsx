import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Products from "./components/Products";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Router>
      <div className="container mt-4">
        {/* ✅ Navigation Bar */}
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm rounded mb-4">
  <div className="container">
    <Link className="navbar-brand fw-bold text-primary" to="/">
      🔥 Firebase App
    </Link>

    {/* Toggle button for mobile */}
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    {/* Collapsible menu */}
    <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
      <ul className="navbar-nav gap-3">
        <li className="nav-item">
          <Link className="btn btn-outline-primary" to="/">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="btn btn-outline-success" to="/register">Register</Link>
        </li>
        <li className="nav-item">
          <Link className="btn btn-outline-info" to="/profile">Profile</Link>
        </li>
        <li className="nav-item">
          <Link className="btn btn-outline-dark" to="/products">Products</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>



        {/* ✅ Routes */}
        <Routes>
  <Route path="/" element={<Login />} />
  <Route path="/register" element={<Register />} />

  <Route
    path="/profile"
    element={
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    }
  />

  <Route
    path="/products"
    element={
      <ProtectedRoute>
        <Products />
      </ProtectedRoute>
    }
  />
</Routes>

      </div>
    </Router>
  );
}
