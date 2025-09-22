import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UsersContext = createContext();

export function UsersProvider({ children }) {
  const [users, setUsers] = useState([]);

  // Load initial users from API with axios
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("https://jsonplaceholder.typicode.com/users");
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <UsersContext.Provider value={{ users, setUsers }}>
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  return useContext(UsersContext);
}
