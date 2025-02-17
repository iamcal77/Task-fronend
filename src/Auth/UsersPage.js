import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";  // Import toastify components
import "react-toastify/dist/ReactToastify.css";  // Import the CSS for toast notifications

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the users from the backend
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://noones-com.onrender.com/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);  // Set the fetched users
      } catch (error) {
        toast.error("Failed to load users");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="text-center text-xl text-white">Loading...</div>;  // Show a loading state while fetching data
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-xl overflow-hidden">
        <h1 className="text-4xl font-semibold text-center text-green-800 p-6">Users List</h1>
        <div className="px-6 py-4">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Full Name</th>
                <th className="px-4 py-3 text-left">Password</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{user.id}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.fullName}</td>
                  <td className="px-4 py-3">{user.password}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
