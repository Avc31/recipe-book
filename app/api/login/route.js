import connectDb from "@/backend/config/connectDb";
import User from "@/backend/models/users";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
var jwt = require('jsonwebtoken');

export async function POST(req) {
    try {
        await connectDb();

        const body = await req.json();

        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: "Please provide both email and password." },
                { status: 400 }
            );
        }

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { success: false, message: "Invalid email or password." },
                { status: 401 }
            );
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return NextResponse.json(
                { success: false, message: "Invalid email or password." },
                { status: 401 }
            );
        }


        var token = jwt.sign({ name: user.name, email: user.email }, process.env.JWTSECRET, { expiresIn: '1h' });

        return NextResponse.json(
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
