import { isAdminAuthenticated } from "@/lib/auth";
import dbConnect from "@/lib/connectdb";
import Inquiry from "@/models/Inquiry";
import Property from "@/models/Property";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, phone, propertyType, message } = body;

    if (
      !name?.trim() ||
      !email?.trim() ||
      !phone?.toString().trim() ||
      !message?.trim()
    ) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 },
      );
    }

    await dbConnect();

    const inquiry = await Inquiry.create({
      name,
      email,
      phone,
      message,
      // Include propertyType only if it exists in your schema.
    });

    return NextResponse.json(
      {
        success: true,
        message: "Inquiry submitted successfully!",
        inquiryId: inquiry._id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Inquiry error:", error);

    return NextResponse.json(
      { error: "Failed to submit inquiry" },
      { status: 500 },
    );
  }
}

// Created a get request for reading inquiries
export async function GET() {

  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    await dbConnect();

    void Property;

    const inquiries = await Inquiry.find({})
      .populate("property", "title slug")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      inquiries,
    });
  } catch (error) {
    console.error("Failed to fetch inquiries:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch inquiries",
      },
      { status: 500 }
    );
  }
}
