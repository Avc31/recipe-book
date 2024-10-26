import connectDb from "@/backend/config/connectDb";
import Recipe from "@/backend/models/recipes";
import { NextResponse } from "next/server";


export async function GET(req) {
    try {
        await connectDb();

        const { searchParams } = new URL(req.url); 
        const userName = searchParams.get('username'); 

        const query = userName ? { userName } : {};

        const recipes = await Recipe.find(query);

        return NextResponse.json({ success: true, recipes }, { status: 200 });

    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Server Error: " + error.message },
            { status: 500 }
        );
    }
}
