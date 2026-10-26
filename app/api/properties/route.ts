import dbConnect from "@/lib/connectdb";
import Property from "@/models/Property";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const properties = await Property.find({})
    .sort({ createdAt: -1})
    .lean();

    return NextResponse.json(
      {
        success: true,
        count: Property.length,
        properties,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log("fetch properties error", error);
    return NextResponse.json(
      {
        success: false,
        message: "failed to fetch properties",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();

    const property = await Property.create(body);

    return NextResponse.json(
      {
        success: true,
        property,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log("failed to create peroperty", error);

    return NextResponse.json(
      {
        success: false,
        message: "failed to create property",
      },
      {
        status: 500,
      },
    );
  }
}
