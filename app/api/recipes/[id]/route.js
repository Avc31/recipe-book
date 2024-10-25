import connectDb from "@/backend/config/connectDb";
import Recipe from "@/backend/models/recipes";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        await connectDb();

        const { id } = params;


        const recipe = await Recipe.findById(id);

        if (!recipe) {
            console.error("Recipe not found in DB");
            return NextResponse.json(
                { success: false, message: "Recipe not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, recipe }, { status: 200 });

    } catch (error) {
        console.error("Error during GET /api/recipes/[id]:", error);
        return NextResponse.json(
            { success: false, message: "Server Error: " + error.message },
            { status: 500 }
        );
    }
}
