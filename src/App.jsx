import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import UserDetailsPage from "./pages/UserDetailsPage";
import AddUserPage from "./pages/AddUserPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage"; // ✅ import Signup page
import EditUserPage from "./pages/EditUserPage";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Navbar */}
      <nav className="bg-indigo-600 p-4 text-white">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="font-bold text-2xl">
            Users App
          </Link>

          <div className="flex items-center gap-4">
            {currentUser ? (
              <>
                <span className="text-sm">
                  Welcome,{" "}
                  <span className="font-semibold">{currentUser.name}</span>
                </span>
                <Link
                  to="/add"
                  className="bg-white text-indigo-600 px-3 py-1 rounded"
                >
                  Add User
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-white text-indigo-600 px-3 py-1 rounded"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-white text-indigo-600 px-3 py-1 rounded"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Routes */}
      <div className="p-6 max-w-6xl mx-auto">
        <Routes>
          <Route
            path="/"
            element={
              currentUser ? <HomePage /> : <LoginPage setCurrentUser={setCurrentUser} />
            }
          />
          <Route
            path="/edit/:id"
            element={
              currentUser ? <EditUserPage /> : <LoginPage setCurrentUser={setCurrentUser} />
            }
          />
          <Route
            path="/user/:id"
            element={
              currentUser ? <UserDetailsPage /> : <LoginPage setCurrentUser={setCurrentUser} />
            }
          />
          <Route
            path="/add"
            element={
              currentUser ? <AddUserPage /> : <LoginPage setCurrentUser={setCurrentUser} />
            }
          />
          <Route
            path="/login"
            element={<LoginPage setCurrentUser={setCurrentUser} />}
          />
          <Route
            path="/signup"
            element={<SignupPage />}
          />
        </Routes>
      </div>
    </div>
  );
}
