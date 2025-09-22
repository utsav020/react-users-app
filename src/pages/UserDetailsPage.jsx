import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUsers } from "../context/UsersContext"; 
import axios from "axios";

export default function UserDetailsPage() {
  const { id } = useParams();
  const { users } = useUsers(); 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    // 1️⃣ Check local users first
    const localUser = users.find((u) => String(u.id) === String(id));
    if (localUser) {
      setUser(localUser);
      setLoading(false);
      return;
    }

    // 2️⃣ Otherwise fetch from API with axios
    setLoading(true);
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
        setUser(null);
        setLoading(false);
      });
  }, [id, users]);
  
  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading user details...</p>;
  }

  if (!user || !user.id) {
    return (
      <div className="max-w-2xl text-black mx-auto bg-white p-6 shadow rounded-lg text-center">
        <p className="text-red-500 mb-4">User not found!</p>
        <Link to="/" className="bg-indigo-600 text-white px-4 py-2 rounded">
          Back
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl text-black mx-auto bg-white p-6 shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">{user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Website:</strong> {user.website || "N/A"}</p>
      <p><strong>Company:</strong> {user.company?.name}</p>
      <p>
        <strong>Address:</strong>{" "}
        {user.address
          ? `${user.address.street}, ${user.address.city}`
          : "N/A" }
      </p>

      <Link
        to="/"
        className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Back
      </Link>
    </div>
  );
}
