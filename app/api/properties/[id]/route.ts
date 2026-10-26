import { NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/connectdb";
import Property from "@/models/Property";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid property ID." },
        { status: 400 },
      );
    }

    await dbConnect();

    const property = await Property.findById(id).lean();

    if (!property) {
      return NextResponse.json(
        { success: false, message: "Property not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, property });
  } catch (error) {
    console.error("Failed to fetch property:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch property." },
      { status: 500 },
    );
  }
}
