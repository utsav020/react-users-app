import { useState } from "react";
import { useUsers } from "../context/UsersContext";
import axios from "axios";

export default function AddUserPage() {
  const { setUsers } = useUsers();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      id: Date.now(),
      name,
      email,
      phone,
      company: { name: company }, // ✅ keep structure consistent
    };

    try {
      // Send data to API using Axios
      await axios.post("https://jsonplaceholder.typicode.com/users", newUser);

      // Update global state
      setUsers((prev) => [...prev, newUser]);

      // Show success message
      setSuccess(true);

      // Clear form
      setName("");
      setEmail("");
      setPhone("");
      setCompany("");

      setTimeout(() => setSuccess(false), 1500);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-black text-white p-6 shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-white">Add User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full rounded bg-transparent text-white placeholder-gray-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full rounded bg-transparent text-white placeholder-gray-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone"
          className="border p-2 w-full rounded bg-transparent text-white placeholder-gray-400"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Company Name"
          className="border p-2 w-full rounded bg-transparent text-white placeholder-gray-400"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded w-full"
        >
          Add
        </button>
      </form>
      {success && (
        <p className="mt-4 text-green-500">User added successfully!</p>
      )}
    </div>
  );
}
