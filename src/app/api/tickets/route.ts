import { prisma } from "@/lib/prisma";
import { createTicket } from "@/services/ticket.service";
import { findTicketById } from "@/services/user.service";
import { getTickets, getTicketById } from "@/utils/getFunctions";
import { NextResponse } from "next/server";

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

    return NextResponse.json(
      { message: "El ticket se ha creado con éxito." },
      { status: 200 },
    );
  } catch (error) {
    console.error("error: ", error);
    return NextResponse.json(
      { message: "Server Internal Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const ticket = await getTicketById(body.id);

    await prisma.ticket.delete({
      where: { id: ticket.id },
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error del servidor", error },
      { status: 500 },
    );
  }
}
