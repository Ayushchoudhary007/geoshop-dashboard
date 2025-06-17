import { useState } from "react";
import { auth } from "../firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

// Define prop type
type GoogleSignInButtonProps = {
  isSignup?: boolean; // optional prop
};

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  isSignup,
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userInfo = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };
      localStorage.setItem("user", JSON.stringify(userInfo));

      // Navigate conditionally if needed
      navigate(isSignup ? "/welcome" : "/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Google sign-in error:", error.message);
      } else {
        console.error("Google sign-in unknown error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      disabled={loading}
      className={`flex w-full items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm text-gray-700 shadow-sm hover:bg-gray-100 transition ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {loading ? (
        <span>{isSignup ? "Signing up..." : "Signing in..."}</span>
      ) : (
        <>
          <FcGoogle className="text-lg" />
          {isSignup ? "Sign up with Google" : "Sign in with Google"}
        </>
      )}
    </button>
  );
};

export default GoogleSignInButton;
