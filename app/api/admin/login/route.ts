import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {
  createAdminSession,
  COOKIE_NAME,
  SESSION_DURATION,
} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const adminEmail = process.env.ADMIN_EMAIL;
    const passwordHash = process.env.ADMIN_PASSWORD_HASH;

    if (!adminEmail || !passwordHash) {
      return NextResponse.json(
        { message: "Admin credentials are not configured." },
        { status: 500 }
      );
    }

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      email.trim().toLowerCase() !== adminEmail.trim().toLowerCase() ||
      !(await bcrypt.compare(password, passwordHash))
    ) {
      console.log("Auth Debug:", {
        emailExists: !!process.env.ADMIN_EMAIL,
        hashExists: !!process.env.ADMIN_PASSWORD_HASH,
        emailMatches:
          email.trim().toLowerCase() ===
          process.env.ADMIN_EMAIL?.trim().toLowerCase(),
        hashLength: process.env.ADMIN_PASSWORD_HASH?.length,
      });
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }

    const token = await createAdminSession();
    const response = NextResponse.json({ success: true });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_DURATION,
    });

    return response;
  } catch {
    return NextResponse.json(
      { message: "Unable to sign in." },
      { status: 400 }
    );
  }
}