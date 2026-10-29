import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { isAdminAuthenticated } from "@/lib/auth";

export async function DELETE(request: Request) {
  try {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { publicId } = await request.json();

    if (
      typeof publicId !== "string" ||
      !publicId.startsWith("properties/")
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid image ID" },
        { status: 400 }
      );
    }

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== "ok" && result.result !== "not found") {
      return NextResponse.json(
        { success: false, message: "Could not delete image" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Image deletion error:", error);

    return NextResponse.json(
      { success: false, message: "Image deletion failed" },
      { status: 500 }
    );
  }
}