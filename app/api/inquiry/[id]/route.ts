
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/connectdb";
import Inquiry from "@/models/Inquiry";

const allowedStatuses = [
  "new",
  "contacted",
  "interested",
  "closed",
  "spam",
];

export async function GET(_request, { params }) {
  try {
    const { id } = await params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json(
        { message: "Invalid inquiry ID." },
        { status: 400 }
      );
    }

    await dbConnect();

    const inquiry = await Inquiry.findById(id)
      .populate("property", "title slug")
      .lean();

    if (!inquiry) {
      return NextResponse.json(
        { message: "Inquiry not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, inquiry });
  } catch (error) {
    console.error("Get inquiry error:", error);

    return NextResponse.json(
      { message: "Failed to retrieve inquiry." },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json(
        { message: "Invalid inquiry ID." },
        { status: 400 }
      );
    }

    const updates = {};

    if (Object.hasOwn(body, "status")) {
      if (!allowedStatuses.includes(body.status)) {
        return NextResponse.json(
          { message: "Invalid inquiry status." },
          { status: 400 }
        );
      }

      updates.status = body.status;
    }

    if (Object.hasOwn(body, "notes")) {
      if (typeof body.notes !== "string") {
        return NextResponse.json(
          { message: "Notes must be text." },
          { status: 400 }
        );
      }

      updates.notes = body.notes.trim();
    }

    if (Object.hasOwn(body, "followUpAt")) {
      if (body.followUpAt === null || body.followUpAt === "") {
        updates.followUpAt = null;
      } else {
        const date = new Date(body.followUpAt);

        if (Number.isNaN(date.getTime())) {
          return NextResponse.json(
            { message: "Invalid follow-up date." },
            { status: 400 }
          );
        }

        updates.followUpAt = date;
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { message: "No valid fields provided." },
        { status: 400 }
      );
    }

    await dbConnect();

    const inquiry = await Inquiry.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    ).populate("property", "title slug");

    if (!inquiry) {
      return NextResponse.json(
        { message: "Inquiry not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, inquiry });
  } catch (error) {
    console.error("Update inquiry error:", error);

    return NextResponse.json(
      { message: "Failed to update inquiry." },
      { status: 500 }
    );
  }
}
