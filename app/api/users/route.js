import connectDb from "@/backend/config/connectDb";
import User from "@/backend/models/users";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

export async function POST(req) {
    try {
        // Connect to the database
        await connectDb();
        

        // Parse the incoming request body
        const body = await req.json();
        console.log("Incoming body data:", body);

        

        const { name, email, password } = body;

        // Check if all required fields are provided
        if (!name || !email || !password) {
            return NextResponse.json(
                { success: false, message: "Please provide all required fields." },
                { status: 400 }
            );
        }

        // Create a new recipe using the provided data
        const newUser = await User.create({
            name,
            email,
            password,
        });

        // Return a success response with the new recipe
        return NextResponse.json({ success: true, user: newUser }, { status: 201 });

    } catch (error) {
        console.error("Error during POST /api/recipes:", error);
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
        const users = await User.find(); // Assuming you're using Mongoose

        // Return a success response with the user data
        return NextResponse.json({ success: true, users }, { status: 200 });

    } catch (error) {
        console.error("Error during GET /api/users:", error);
        return NextResponse.json(
            { success: false, message: "Server Error: " + error.message },
            { status: 500 }
        );
    }
}