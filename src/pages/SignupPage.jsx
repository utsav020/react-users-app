import { useState, useEffect } from "react";
import { useUsers } from "../context/UsersContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignupPage() {
  const { users, setUsers } = useUsers(); // Access global users context
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Load existing users from localStorage if context is empty
  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers && users.length === 0) {
      setUsers(JSON.parse(storedUsers));
    }
  }, [setUsers, users.length]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !company) {
      setError("Please fill all required fields.");
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password: password || "123456", // Default password if not provided
      phone,
      company: { name: company },
      createdAt: new Date().toISOString(), // Signup timestamp
    };

    try {
      // Send to API
      await axios.post("https://jsonplaceholder.typicode.com/users", newUser);

      // Update global users
      setUsers((prev) => {
        const updatedUsers = [...prev, newUser];
        // Save to localStorage as fallback
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        return updatedUsers;
      });

      // Show success message
      setSuccess(true);
      setError("");

      // Clear form
      setName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setPassword("");

      // Redirect after 1.5s
      setTimeout(() => {
        setSuccess(false);
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.error("Error adding user:", err);
      setError("Failed to signup. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800 text-white p-6 shadow rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>

      {error && <p className="text-red-400 mb-2 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full rounded bg-transparent text-white placeholder-gray-400"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full rounded bg-transparent text-white placeholder-gray-400"
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 w-full rounded bg-transparent text-white placeholder-gray-400"
          required
        />
        <input
          type="text"
          placeholder="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="border p-2 w-full rounded bg-transparent text-white placeholder-gray-400"
          required
        />
        <input
          type="password"
          placeholder="Password (default 123456)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full rounded bg-transparent text-white placeholder-gray-400"
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded w-full"
        >
          Signup
        </button>
      </form>

      {success && (
        <p className="mt-4 text-green-400 text-center">
          Signup successful! Redirecting to login...
        </p>
      )}
    </div>
  );
}
