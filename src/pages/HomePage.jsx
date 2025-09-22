import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTable from "../components/UserTable";
import axios from "axios";

export default function HomePage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Get logged-in user from localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // Redirect to login if no user found
  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  // Fetch users with axios
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // Filter search
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <div className="max-w-full w-[1200px] mx-auto text-white">
      {/* Users Table */}
      <UserTable users={filteredUsers} />
    </div>
  );
}
