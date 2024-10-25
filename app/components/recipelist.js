"use client"; // to ensure it's a client component

import { useEffect, useState } from "react";
import Link from "next/link";

const Recipelist = () => {
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch("/api/recipes"); // Adjust the path if needed
                if (!response.ok) {
                    throw new Error("Failed to fetch recipes");
                }
                const data = await response.json();
                setRecipes(data.recipes);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching recipes:", err);
            }
        };

        fetchRecipes();
    }, []); // Empty dependency array means this runs once when the component mounts

    return (
        <>
            {error && <p>Error: {error}</p>}

            {recipes.map((recipe) => (

                    <div key={recipe._id} className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60" >
                        {console.log(recipe._id)}
                        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">{recipe.title}</h2>
                        <p className="leading-relaxed text-base mb-4">{recipe.description}</p>
                        <Link href={`/recipes/${recipe._id}`} className="text-indigo-500 inline-flex items-center">Learn More
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
