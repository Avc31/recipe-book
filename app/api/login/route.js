import connectDb from "@/backend/config/connectDb";
import User from "@/backend/models/users";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
var jwt = require('jsonwebtoken');

export async function POST(req) {
    try {
        // Connect to the database
        await connectDb();

        // Parse the incoming request body
        const body = await req.json();
        console.log("Incoming body data:", body);

        const { email, password } = body;

        // Check if both email and password are provided
        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: "Please provide both email and password." },
                { status: 400 }
            );
        }

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            // If no user found, return an error
            return NextResponse.json(
                { success: false, message: "Invalid email or password." },
                { status: 401 }
            );
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            // If the passwords don't match, return an error
            return NextResponse.json(
                { success: false, message: "Invalid email or password." },
                { status: 401 }
            );
        }

        // If authentication is successful, return a success response

        var token = jwt.sign({ name: user.name, email: user.email }, process.env.JWTSECRET, { expiresIn: '1h' });

        return NextResponse.json(
            // { success: true, message: "Login successful!", user: { name: user.name, email: user.email } },
            { success: true, token  },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error during POST /api/login:", error);
        return NextResponse.json(
            { success: false, message: "Server Error: " + error.message },
            { status: 500 }
        );
    }
}

// Handle GET request to retrieve all users
// export async function GET(req) {
//     try {
//         // Connect to the database
//         await connectDb();

//         // Retrieve all users from the database
//         const users = await User.find(); // Assuming you're using Mongoose

//         // Return a success response with the user data
//         return NextResponse.json({ success: true, users }, { status: 200 });

//     } catch (error) {
//         console.error("Error during GET /api/users:", error);
//         return NextResponse.json(
//             { success: false, message: "Server Error: " + error.message },
//             { status: 500 }
//         );
//     }
// }