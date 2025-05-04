// src/components/GoogleSignInButton.tsx
import { auth } from "../firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const GoogleSignInButton = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (error) {
      console.error("Google sign-in error", error);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="flex w-full items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm text-gray-700 shadow-sm hover:bg-gray-100"
    >
      <FcGoogle className="text-lg" />
      Sign in with Google
    </button>
  );
};

export default GoogleSignInButton;
