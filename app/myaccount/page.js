"use client";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import LoadingIcons from "react-loading-icons";

const page = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const decodedToken = jwtDecode(token);
        const loggedInUserEmail = decodedToken.email;

        const response = await fetch("/api/users");
        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        const currentUser = data.users.find(user => user.email === loggedInUserEmail);

        if (currentUser) {
          setUser(currentUser);
        } else {
          throw new Error("User not found");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserData();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!user) return <p className="w-full text-center flex justify-center mt-12"><LoadingIcons.SpinningCircles className="" fill="#ca8a04" /></p>;

  return (
    <div className="account-details p-4 bg-gray-100 rounded shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Account Details</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <button
        className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded"
        onClick={() => alert("Edit functionality can go here!")}
      >
        Edit Details
      </button>
    </div>
  );
};

export default page;
