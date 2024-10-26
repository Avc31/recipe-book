"use client";

import React from 'react'
import { useState, useEffect } from 'react';

const page = ({ params }) => {

    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipeDetail = async () => {
            try {
                const response = await fetch(`/api/recipes/${params.recipeId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch recipe details');
                }
                const data = await response.json();
                setRecipe(data.recipe);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }

        };

        fetchRecipeDetail();
    }, [params.recipeId]);

    if (loading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">{error}</div>;
    }

    if (!recipe) {
        return <div className="text-center py-10">Recipe not found</div>;
    }

    const formattedDate = new Date(recipe.createdAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });


    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
            {recipe ? (
                <div>
                    <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
                    <img src={recipe.imgurl} alt={recipe.title} className="w-full h-64 object-cover rounded-md mb-4" />
                    <p className="text-gray-700 text-lg">{recipe.fullRecipe}</p>
                    <div className="mt-6 text-gray-600">
                        <p>
                            <strong>Uploaded By:</strong> {recipe.userName}
                        </p>
                        <p>
                            <strong>Uploaded On:</strong> {formattedDate}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="text-center py-10">Recipe not found</div>
            )}
        </div>
    );
};

export default page;
