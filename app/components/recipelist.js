"use client"; 

import { useEffect, useState } from "react";
import Link from "next/link";
import LoadingIcons from "react-loading-icons";

const Recipelist = () => {
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch("/api/recipes"); 
                if (!response.ok) {
                    throw new Error("Failed to fetch recipes");
                }
                const data = await response.json();
                setRecipes(data.recipes);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    if (loading) return <p className="w-full text-center flex justify-center mt-12"><LoadingIcons.SpinningCircles className="" fill="#ca8a04" /></p>;

    return (
        <>
            {error && <p>Error: {error}</p>}

            {recipes.map((recipe) => (

                    <div key={recipe._id} className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60" >
                        <img src={recipe.imgurl || "https://placehold.co/600x400/EEE/31343C"} alt={recipe.title} className="w-full h-48 object-cover rounded-lg mb-4"  onError={(e) => { e.target.src = "https://placehold.co/600x400/EEE/31343C"; }} />
                        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">{recipe.title}</h2>
                        <p className="leading-relaxed text-base mb-4">{recipe.description}</p>
                        <p className="text-gray-600 text-sm mb-4">Uploaded by: <span className="font-medium text-gray-700">{recipe.userName}</span></p>
                        <Link href={`/recipes/${recipe._id}`} className="text-yellow-600 inline-flex items-center">View Recipe
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                        </Link>
                    </div>

            ))}

        </>
    );
};

export default Recipelist;
