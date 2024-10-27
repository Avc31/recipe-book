import Recipe from '@/backend/models/recipes';
import connectDb from '@/backend/config/connectDb';
import { NextResponse } from 'next/server';

export async function POST(req, { params }) {
    await connectDb();
    const { id } = params;
    const { reviewer, rating, comment } = await req.json();

    try {
        const recipe = await Recipe.findById(id);
        if (!recipe) {
            return NextResponse.json({ success: false, message: 'Recipe not found' }, { status: 404 });
        }

        recipe.reviews.push({ reviewer, rating, comment });
        await recipe.save();

        return NextResponse.json({ success: true, recipe }, { status: 201 });
    } catch (error) {
        console.error("Error adding review:", error);
        return NextResponse.json({ success: false, message: 'Error adding review' }, { status: 500 });
    }
}
