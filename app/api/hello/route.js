import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        hello: 'Avesh'
    })
}

export async function POST(request) {
    try {
        const data = await request.json();
        return NextResponse.json({
            data,
        });
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }
}