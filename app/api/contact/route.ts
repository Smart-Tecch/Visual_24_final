import { NextResponse, connection } from "next/server";
import { createContactMessage } from "@/lib/actions/contact.actions";

export async function POST(request: Request) {
  await connection();

  try {
    const formData = await request.formData();

    const result = await createContactMessage(formData);

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("POST /api/contact error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      { status: 500 },
    );
  }
}
