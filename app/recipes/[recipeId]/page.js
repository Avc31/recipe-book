"use client";

import React from 'react'
import { useState, useEffect } from 'react';
import LoadingIcons from 'react-loading-icons';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { CiEdit } from "react-icons/ci";

const page = ({ params }) => {

    const router = useRouter();

    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [reviews, setReviews] = useState([]);
    const [hasSubmittedReview, setHasSubmittedReview] = useState(false);


    const [user, setUser] = useState(null);
    const [userName, setuserName] = useState("");

    useEffect(() => {
        const fetchRecipeDetail = async () => {
            try {
                const response = await fetch(`/api/recipes/${params.recipeId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch recipe details');
                }
                const data = await response.json();
                setRecipe(data.recipe);
                setReviews(data.recipe.reviews || []);

                // Check if the user has already submitted a review
                const token = localStorage.getItem("token");

                // if (!token) {
                //     router.push('/login');
                //     return;
                // }

                if (token) {
                    const decodedToken = jwtDecode(token);
                    setuserName(decodedToken.name)
                    const loggedInUserEmail = decodedToken.email;
                    const userReview = data.recipe.reviews.find(
                        (rev) => rev.reviewer === decodedToken.name
                    );
                    if (userReview) {
                        setHasSubmittedReview(true);
                    }
                }

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }

        };

        fetchRecipeDetail();
    }, [params.recipeId]);

    const handleSubmit = async (e) => {
        // e.preventDefault();
        if (!userName) {
            router.push('/login');
            return;
        }
        try {
            const response = await fetch(`/api/recipes/${params.recipeId}/review`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ reviewer: userName, rating: rating, comment: review }),
            });
            if (!response.ok) {
                throw new Error('Failed to submit review');
            }
            const newReview = await response.json();
            setReviews([...reviews, newReview]);
            setRating(0);
            setReview('');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleRatingClick = (star) => {
        setRating(star);
    };

    if (loading) {
        return <p className="w-full text-center flex justify-center mt-12"><LoadingIcons.SpinningCircles className="" fill="#ca8a04" /></p>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">{error}</div>;
    }

    if (!recipe) {
        return <div className="text-center py-10">Recipe not found</div>;
    }

    const userReview = reviews.find((rev) => rev.reviewer === userName);
    const otherReviews = reviews.filter((rev) => rev.reviewer !== userName);

    const formattedDate = new Date(recipe.createdAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();

        return `${month}/${day}/${year}`;
    };



    // Average rating and review count
    const reviewCount = reviews.length;
    const averageRating = reviewCount > 0
        ? (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviewCount).toFixed(1)
        : 0;


    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
            {recipe ? (
                <div>
                    <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>

                    <div className="flex items-center mb-4">
                        <p className="text-gray-600 mr-4">{reviewCount} Reviews</p>
                        <div className="flex items-center">
                            {Array.from({ length: 5 }, (_, index) => (
                                <svg
                                    key={index}
                                    fill={index < Math.round(averageRating) ? "#ca8a04" : "gray"}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 23 23"
                                    className="w-5 h-5"
                                >
                                    <path d="M12 .587l3.668 7.431 8.206 1.185-5.934 5.565 1.401 8.185L12 18.897l-7.341 3.85 1.401-8.185-5.934-5.565 8.206-1.185L12 .587z" />
                                </svg>
                            ))}
                        </div>
                    </div>
                    <img src={recipe.imgurl || "https://placehold.co/600x400/EEE/31343C"} alt={recipe.title} className="w-full h-64 object-cover rounded-md mb-4" onError={(e) => { e.target.src = "https://placehold.co/600x400/EEE/31343C"; }} />
                    <p className="text-gray-700 text-lg">{recipe.fullRecipe}</p>
                    <div className="mt-6 text-gray-600">
                        <p>
                            <strong>Uploaded By:</strong> {recipe.userName}
                        </p>
                        <p>
                            <strong>Uploaded On:</strong> {formattedDate}
                        </p>

                        {/* Rating and Review Form */}
                        {!hasSubmittedReview ? (
                            <form onSubmit={handleSubmit} className="mt-6">
                                <h2 className="text-2xl font-bold mb-4">Rate this Recipe</h2>
                                <div className="flex items-center mb-4">
                                    <span className="mr-2">Rating:</span>
                                    <div className="flex space-x-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <svg
                                                key={star}
                                                onClick={() => setRating(star)}
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill={star <= rating ? "#ca8a04" : "gray"}
                                                viewBox="0 0 23 23"
                                                className="w-6 h-6 cursor-pointer"
                                            >
                                                <path d="M12 .587l3.668 7.431 8.206 1.185-5.934 5.565 1.401 8.185L12 18.897l-7.341 3.85 1.401-8.185-5.934-5.565 8.206-1.185L12 .587z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="review" className="block mb-2">Review:</label>
                                    <textarea
                                        id="review"
                                        value={review}
                                        onChange={(e) => setReview(e.target.value)}
                                        className="border border-gray-300 rounded p-2 w-full"
                                        rows="4"
                                    />
                                </div>
                                <button type="submit" className="bg-yellow-500 text-white py-2 px-4 rounded">Submit Review</button>
                            </form>
                        ) : (
                            // <div className="text-green-600 mt-4">
                            //     <p>Your review has been submitted. Thank you for your feedback!</p>
                            // </div>
                            <div className="border border-gray-300 p-4 rounded-md relative bg-gray-50 shadow-md mb-4 mt-4">
                                {/* Edit button at top right */}
                                <button
                                    className="absolute top-2 right-2 text-sm text-blue-500 hover:text-blue-700 focus:outline-none"
                                      // Add your edit function here
                                >
                                    <CiEdit className='text-yellow-500' size={30}></CiEdit>
                                </button>

                                <div className="font-bold mb-2">My Review</div>
                                <div className="flex items-center mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            fill={i < userReview.rating ? "#ca8a04" : "gray"}
                                            viewBox="0 0 23 23"
                                            className="w-5 h-5"
                                        >
                                            <path d="M12 .587l3.668 7.431 8.206 1.185-5.934 5.565 1.401 8.185L12 18.897l-7.341 3.85 1.401-8.185-5.934-5.565 8.206-1.185L12 .587z" />
                                        </svg>
                                    ))}
                                    <span className='ml-2 text-sm pt-0'>{formatDate(userReview.createdAt)}</span>
                                </div>

                                <p>{userReview.comment}</p>
                            </div>

                        )}


                        {/* Display Reviews */}
                        <div className="mt-6">
                            <h2 className="text-2xl font-bold mb-4">Reviews</h2>


                            {otherReviews.length > 0 ? (
                                otherReviews.map((rev, index) => (
                                    <div key={index} className="border-b border-gray-300 py-4">
                                        <div className="font-bold">{rev.reviewer || 'Anonymous'}</div>
                                        <div className="flex items-center mt-1">
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    fill={i < rev.rating ? "#ca8a04" : "gray"}
                                                    viewBox="0 0 24 24"
                                                    className="w-4 h-4"
                                                >
                                                    <path d="M12 .587l3.668 7.431 8.206 1.185-5.934 5.565 1.401 8.185L12 18.897l-7.341 3.85 1.401-8.185-5.934-5.565 8.206-1.185L12 .587z" />
                                                </svg>
                                            ))}
                                            <span className='ml-2 text-sm pt-0'>{formatDate(rev.createdAt)}</span>
                                        </div>
                                        
                                        <p>{rev.comment}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No reviews yet.</p>
                            )}
                        </div>

                    </div>
                </div>
            ) : (
                <div className="text-center py-10">Recipe not found</div>
            )}
        </div>
    );
};

export default page;
