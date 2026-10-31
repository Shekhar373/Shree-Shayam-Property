import { NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/connectdb";
import Property from "@/models/Property";
import { isAdminAuthenticated } from "@/lib/auth";

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


export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid property ID" },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Only allow fields that the admin form is supposed to edit.
    const {
      title,
      slug,
      description,
      listingType,
      propertyType,
      price,
      priceUnit,
      address,
      specifications,
      images,
      status,
      featured,
      publishedAt,
    } = body;

    await dbConnect();

    const property = await Property.findByIdAndUpdate(
      id,
      {
        title,
        slug,
        description,
        listingType,
        propertyType,
        price,
        priceUnit,
        address,
        specifications,
        images,
        status,
        featured,
        publishedAt,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!property) {
      return NextResponse.json(
        { success: false, message: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, property });
  } catch (error) {
    console.error("Update property error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to update property" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAdmin = await isAdminAuthenticated();

    if (!isAdmin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid property ID" },
        { status: 400 }
      );
    }

    await dbConnect();

    const property = await Property.findById(id);

    if (!property) {
      return NextResponse.json(
        { success: false, message: "Property not found" },
        { status: 404 }
      );
    }

    // Delete the database record first.
    await Property.findByIdAndDelete(id);

    // Then attempt to delete its Cloudinary images.
    const images = property.images ?? [];

    const cleanupResults = await Promise.allSettled(
      images
        .filter((image) => image.publicId)
        .map((image) => cloudinary.uploader.destroy(image.publicId))
    );

    const cleanupFailed = cleanupResults.some(
      (result) =>
        result.status === "rejected" ||
        (result.status === "fulfilled" &&
          result.value.result !== "ok" &&
          result.value.result !== "not found")
    );

    return NextResponse.json({
      success: true,
      message: cleanupFailed
        ? "Property deleted, but some images could not be removed from Cloudinary."
        : "Property and images deleted successfully.",
      cleanupFailed,
    });
  } catch (error) {
    console.error("Delete property error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to delete property" },
      { status: 500 }
    );
  }
}
