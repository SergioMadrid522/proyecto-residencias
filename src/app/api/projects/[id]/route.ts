import { prisma } from "@/lib/prisma";
import { updateProjectData, updateUserData } from "@/services/update.service";
import { getProject } from "@/utils/getFunctions";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;
    const { project } = await getProject(Number(id));

    return NextResponse.json(project, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Error del servidor" },
      { status: 500 },
    );
  }
}
