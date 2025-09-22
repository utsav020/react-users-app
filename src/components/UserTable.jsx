import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../context/UsersContext";

export default function UserTable() {
  const { users, setUsers } = useUsers();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const updatedUsers = users.filter((u) => u.id !== id);
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
  };

  return (
    <div className="w-[1200px] shadow-white shadow-md rounded-lg overflow-hidden p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-4 text-white">Users List</h1>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <table className="w-full text-left">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Phone</th>
            <th className="px-4 py-3">Company</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((u) => (
              <tr key={u.id} className="border-b text-white">
                <td className="px-4 py-3">{u.name}</td>
                <td className="px-4 py-3">{u.email}</td>
                <td className="px-4 py-3">{u.phone}</td>
                <td className="px-4 py-3">{u.company?.name}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button
                    onClick={() => navigate(`/user/${u.id}`)}
                    className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
                  >
                    View
                  </button>
                  <button
                    onClick={() => navigate(`/edit/${u.id}`)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center text-gray-400 py-4">
                No users match your search.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
