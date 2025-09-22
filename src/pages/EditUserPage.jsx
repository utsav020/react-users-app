import { useParams, useNavigate } from "react-router-dom";
import { useUsers } from "../context/UsersContext";
import { useState, useEffect } from "react";

export default function EditUserPage() {
  const { id } = useParams();
  const { users, setUsers } = useUsers();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: { name: "" },
  });

  const [error, setError] = useState("");

  // Load user data when component mounts
  useEffect(() => {
    const userId = parseInt(id, 10); // Convert string to number
    const user = users.find((u) => u.id === userId);

    if (user) {
      // Ensure company object exists
      setFormData({
        ...user,
        company: user.company || { name: "" },
      });
    } else {
      setError("User not found.");
      // Redirect to users table after 2 seconds
      setTimeout(() => navigate("/"), 2000);
    }
  }, [id, users, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "company") {
      setFormData({ ...formData, company: { name: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.email) {
      setError("Name and Email are required.");
      return;
    }

    const updatedUsers = users.map((u) =>
      u.id === parseInt(id, 10) ? { ...formData } : u
    );

    // Update context and localStorage
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    navigate("/"); // Go back to users table
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-900 text-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>

      {error && <p className="text-red-400 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company.name}
          onChange={handleChange}
          className="px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
