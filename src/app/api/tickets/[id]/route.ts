import { getTicket } from "@/utils/getFunctions";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  try {
    const res = await getTicket(Number(id));
    if (!res) {
      return NextResponse.json(
        { message: "No hay algún ticket registado con ese id." },
        { status: 404 },
      );
    }
    return NextResponse.json(res, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Error while connecting to the API" },
      { status: 500 },
    );
  }
}
