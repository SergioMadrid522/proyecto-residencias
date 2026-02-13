import { createTicket } from "@/app/actions";
import { prisma } from "@/lib/prisma";
import { getTickets } from "@/utils/getFunctions";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = await createTicket(body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.errors }, { status: 400 });
    }

    await prisma.ticket.create({
      data: {
        ...validation.data,
      },
    });
  } catch (error) {
    console.error("error: ", error);
    return NextResponse.json(
      { message: "Server Internal Error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const tickets = await getTickets();

    if (!tickets.success) {
      return NextResponse.json(
        { message: "No hay tickets para mostrar" },
        { status: 404 },
      );
    }

    return NextResponse.json(tickets, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Server Internal Error" },
      { status: 500 },
    );
  }
}
