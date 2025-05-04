import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

function Logout() {
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    // Clear local storage/session (optional, depends on how you're storing)
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");

    // Sign out from Firebase
    signOut(auth)
      .then(() => {
        console.log("Logged out successfully");
        navigate("/login"); // Redirect to login page
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  }, [auth, navigate]);

  return <p>Logging out...</p>; // You can show a spinner here
}

export default Logout;
