import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage({ setCurrentUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Accept any email, only validate default password
    if (password === "123456") {
      const user = {
        name: email.split("@")[0], // use part of email as name
        email,
      };
      setError("");
      localStorage.setItem("currentUser", JSON.stringify(user));
      setCurrentUser(user); // update parent state
      navigate("/"); // redirect to home
    } else {
      setError("Invalid password. Default password is 123456");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
            {error}
          </div>
        )}

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your password"
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            Default password: <span className="font-semibold">123456</span>
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
