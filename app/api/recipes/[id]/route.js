import connectDb from "@/backend/config/connectDb";
import Recipe from "@/backend/models/recipes";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(req, { params }) {
    try {
        await connectDb();

        const { id } = params;


        //const recipe = await Recipe.findById(id);
        const recipe = await Recipe.findById(new mongoose.Types.ObjectId(id));

        if (!recipe) {
            return NextResponse.json(
                { success: false, message: "Recipe not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, recipe }, { status: 200 });

    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Server Error: " + error.message },
            { status: 500 }
        );
    }
}
