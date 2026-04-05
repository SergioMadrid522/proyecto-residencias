import { prisma } from "@/lib/prisma";
import { createProject } from "@/services/project.service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = await createProject(body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.errors }, { status: 404 });
    }

    await prisma.proyecto.create({
      data: {
        ...validation.data,
      },
    });

    return NextResponse.json(
      { message: "Proyecto creado con éxito" },
      { status: 200 },
    );
  } catch (error) {
    console.error("error", error);
    return NextResponse.json(
      { message: "Server Internal Server" },
      { status: 500 },
    );
  }
}
