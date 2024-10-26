import connectDb from "@/backend/config/connectDb";
import Recipe from "@/backend/models/recipes";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        // Connect to the database
        await connectDb();

        // Parse the incoming request body
        const body = await req.json();

        const { title, description, fullRecipe, imgurl, userName } = body;

        // Check if all required fields are provided
        if (!title || !description || !fullRecipe || !imgurl || !userName ) {
            return NextResponse.json(
                { success: false, message: "Please provide all required fields." },
                { status: 400 }
            );
        }

        // Create a new recipe using the provided data
        const newRecipe = await Recipe.create({
            title,
            description,
            fullRecipe,
            imgurl,
            userName,
        });

        // Return a success response with the new recipe
        return NextResponse.json({ success: true, recipe: newRecipe }, { status: 201 });

    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Server Error: " + error.message },
            { status: 500 }
        );
    }
}

// Handle GET request to retrieve all users
export async function GET(req) {
    try {
        // Connect to the database
        await connectDb();

        // Retrieve all users from the database
        const recipes = await Recipe.find(); // Assuming you're using Mongoose

        // Return a success response with the user data
        return NextResponse.json({ success: true, recipes }, { status: 200 });

    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Server Error: " + error.message },
            { status: 500 }
        );
    }
}