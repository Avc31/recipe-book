"use client";

import { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import LoadingIcons from 'react-loading-icons';

const UserRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          router.push('/login');
          return;
        }

        const decodedToken = jwtDecode(token);
        const loggedInUserEmail = decodedToken.email;

        const response = await fetch("/api/users");
        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        const currentUser = data.users.find(user => user.email === loggedInUserEmail);
        if (currentUser) {
          setUser(currentUser);
          setUserName(currentUser.name);
        } else {
          throw new Error("User not found");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserData();
  }, [router]);

  useEffect(() => {

    if (userName) {

      const fetchUserRecipes = async () => {
        try {
          const response = await fetch(`/api/myrecipes?username=${userName}`);
          const data = await response.json();

          if (!data.success) {
            throw new Error(data.message);
          }

          setRecipes(data.recipes);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchUserRecipes();
    }
  }, [userName]);

  if (loading) return <p className="w-full text-center flex justify-center mt-12"><LoadingIcons.SpinningCircles className="" fill="#ca8a04" /></p>;

  if (error) return <p className="text-red-500">{error}</p>;

  if (!recipes.length) return <p>You have not uploaded any recipes so far.</p>;

  return (
    <div>
      <div className="flex flex-wrap" >
        {recipes.map((recipe) => (
          <div key={recipe._id} className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
            <img src={recipe.imgurl || "https://placehold.co/600x400/EEE/31343C"} alt={recipe.title} className="w-full h-48 object-cover rounded-lg mb-4"  onError={(e) => { e.target.src = "https://placehold.co/600x400/EEE/31343C"; }} />
            <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">{recipe.title}</h2>
            <p className="leading-relaxed text-base mb-4">{recipe.description}</p>
            {/* <p className="text-gray-600 text-sm mb-4">Uploaded by: <span className="font-medium text-gray-700">{recipe.userName}</span></p> */}
            <Link href={`/recipes/${recipe._id}`} className="text-yellow-600 inline-flex items-center">View Recipe
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserRecipes;
