import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { isAdminAuthenticated } from "@/lib/auth";


const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export async function POST(request: Request) {
  try {
    // 1. Authenticate admin
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2. Receive file
    const formData = await request.formData();
    const file = formData.get("image");

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json(
        { success: false, message: "Please select an image." },
        { status: 400 }
      );
    }

    // 3. Validate type and size
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: "Use JPEG, PNG, or WebP." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, message: "Maximum image size is 5 MB." },
        { status: 400 }
      );
    }

    // 4. Convert file to Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // 5. Upload to Cloudinary
    const result = await new Promise<{
      secure_url: string;
      public_id: string;
    }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "properties",
            resource_type: "image",
          },
          (error, result) => {
            if (error || !result) {
              reject(error ?? new Error("Cloudinary upload failed"));
              return;
            }

            resolve({
              secure_url: result.secure_url,
              public_id: result.public_id,
            });
          }
        )
        .end(buffer);
    });

    // 6. Return image details
    return NextResponse.json({
      success: true,
      image: {
        url: result.secure_url,
        publicId: result.public_id,
        alt: file.name,
      },
    });
  } catch (error) {
    console.error("Upload error:", error);

    return NextResponse.json(
      { success: false, message: "Image upload failed." },
      { status: 500 }
    );
  }
}