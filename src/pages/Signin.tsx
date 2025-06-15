import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import GoogleSignInButton from "../components/GoogleSignInButton";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      await setPersistence(
        auth,
        rememberMe ? browserLocalPersistence : browserSessionPersistence
      );

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Sign In:", userCredential.user);

      navigate("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("SignIn error:", err.message);
      } else {
        console.error("SignIn error:", err);
      }
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="flex flex-wrap gap-6 p-6 bg-[#0f1c3f] min-h-screen w-screen items-center justify-center text-white">
      <div className="h-[90vh] w-full flex items-center justify-center bg-orange-400 px-4 rounded-lg">
        <div className="w-full max-w-4xl bg-white p-12 rounded-lg shadow-lg">
          <div>
            <h2 className="text-center text-3xl font-semibold text-gray-900">
              Sign In to your account
            </h2>
            <p className="mt-1 text-center text-sm text-gray-600">
              Welcome back! Please enter your details.
            </p>
          </div>

          {error && (
            <div className="mt-4 text-red-500 text-sm text-center">{error}</div>
          )}

          <form onSubmit={handleSignin} className="mt-6 space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="mt-1 w-full rounded-md border border-gray-700 px-3 py-2 text-sm text-black shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 w-full rounded-md border border-gray-700 px-3 py-2 text-sm text-black shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                Remember for 30 days
              </label>
              <Link to="#" className="text-blue-400 hover:underline">
                Forgot password
              </Link>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm text-gray-700 shadow-sm hover:bg-gray-100"
            >
              Sign In
            </button>

            <GoogleSignInButton />
          </form>

          <p className="mt-6 text-center text-sm text-gray-700">
            Don’t have an account?{" "}
            <Link to="/Signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
