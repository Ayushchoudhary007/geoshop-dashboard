import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import GoogleSignInButton from "../components/GoogleSignInButton";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        sessionStorage.setItem("user", JSON.stringify(user));
      }

      navigate("/");
    } catch (err: any) {
      console.error(err);
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="flex flex-wrap gap-6 p-6 bg-[#0f1c3f] min-h-screen w-screen items-center justify-center text-white">
      <div className="min-h-screen w-full flex items-center justify-center bg-orange-400 px-4">
        <div className="w-full max-w-4xl bg-white p-12 rounded-lg shadow-lg">
          <div>
            <h2 className="text-center text-3xl font-semibold text-gray-900">
              Log in to your account
            </h2>
            <p className="mt-1 text-center text-sm text-gray-600">
              Welcome back! Please enter your details.
            </p>
          </div>

          {error && (
            <div className="mt-4 text-red-500 text-sm text-center">{error}</div>
          )}

          <form onSubmit={handleLogin} className="mt-6 space-y-6">
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
                className="mt-1 w-full rounded-md border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
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
                className="mt-1 w-full rounded-md border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
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
              <Link to="#" className="text-blue-600 hover:underline">
                Forgot password
              </Link>
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Sign in
            </button>

            <GoogleSignInButton />
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/Register" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
