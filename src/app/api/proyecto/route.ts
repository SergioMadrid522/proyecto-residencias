import { prisma } from "@/lib/prisma";
import { createProject } from "@/services/project.service";
import { updateProjectData } from "@/services/update.service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = await createProject(body);

    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    await prisma.proyecto.create({
      data: validation.data,
    });

    return NextResponse.json(
      { message: "Proyecto creado con éxito" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server Internal Server" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const { id, nombreProyecto, descripcion, projectStatus } =
      await updateProjectData(body);

    await prisma.proyecto.update({
      where: { id: id },
      data: {
        nombreProyecto: nombreProyecto,
        descripcion: descripcion,
        activo: projectStatus,
      },
    });

    return NextResponse.json(
      { message: "Se ha eliminado el proyecto" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server Internal Server" },
      { status: 500 },
    );
  }
}
