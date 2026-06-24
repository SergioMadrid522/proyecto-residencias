import { getUserById } from "@/utils/getFunctions";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;

    const data = await getUserById(Number(id));
    const { user } = data;
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
