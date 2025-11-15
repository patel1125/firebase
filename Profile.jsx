import React, { useEffect, useState } from "react";
import { auth } from "../Firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const idToken = await currentUser.getIdToken();
        setToken(idToken);
      } else {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 rounded-4" style={{ maxWidth: "500px", margin: "0 auto" }}>
        <h3 className="text-center mb-4 text-primary">Profile</h3>

        {user ? (
          <>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>UID:</strong> {user.uid}</p>
            <div className="bg-light p-3 rounded mb-3" style={{ wordBreak: "break-all" }}>
              <strong>Token:</strong>
              <p className="small text-muted mb-0">{token}</p>
            </div>
            <button className="btn btn-danger w-100" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <p className="text-center">Loading user information...</p>
        )}
      </div>
    </div>
  );
}
