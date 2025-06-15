import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import GoogleSignInButton from "../components/GoogleSignInButton";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      // Optionally save user info
      localStorage.setItem("user", JSON.stringify(userCredential.user));

      // Navigate to dashboard or home
      navigate("/");
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to create account.");
      }
    }
  };

  return (
    <div className="flex flex-wrap gap-6 p-6 bg-[#0f1c3f] min-h-screen w-screen items-center justify-center text-white">
      <div className="h-[90vh] w-full flex items-center justify-center bg-orange-400 px-4 rounded-lg">
        <div className="w-full max-w-4xl bg-white p-12 rounded-lg shadow-lg">
          <div>
            <h2 className="text-center text-3xl font-semibold text-gray-900">
              Create an account
            </h2>
            <p className="mt-1 text-center text-sm text-gray-600">
              Start your 30-day free trial.
            </p>
          </div>

          {error && (
            <div className="mt-4 text-red-500 text-sm text-center">{error}</div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name<span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="mt-1 w-full rounded-md border border-gray-700 px-3 py-2 text-sm shadow-sm text-black focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email<span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="mt-1 w-full rounded-md border border-gray-700 px-3 py-2 text-sm text-black shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password<span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="mt-1 w-full rounded-md border border-gray-700 px-3 py-2 text-sm text-black shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
              <p className="mt-1 text-xs text-gray-500">
                Must be at least 8 characters.
              </p>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm text-gray-700 shadow-sm hover:bg-gray-100"
            >
              Get started
            </button>

            <GoogleSignInButton isSignup />
          </form>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/" className="text-blue-600 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
