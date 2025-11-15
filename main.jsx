import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { auth } from "./Firebase";
import { onAuthStateChanged, getIdToken } from "firebase/auth";

function monitorAuthToken() {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // get token and force refresh false (cached) — use true to force refresh
      const token = await getIdToken(user, /* forceRefresh = */ false);
      console.log("🔥 Firebase user signed in:", user.email, "UID:", user.uid);
      console.log("🧾 ID Token (saved to localStorage):", token);
      localStorage.setItem("fb_id_token", token);
      // optional user info
      localStorage.setItem("fb_user_email", user.email);
      localStorage.setItem("fb_user_uid", user.uid);
    } else {
      console.log("🔒 No user signed in.");
      localStorage.removeItem("fb_id_token");
      localStorage.removeItem("fb_user_email");
      localStorage.removeItem("fb_user_uid");
    }
  });
}

monitorAuthToken();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
