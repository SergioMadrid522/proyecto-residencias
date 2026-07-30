import { validatePrompt } from "@/services/ai.service";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const result = await validatePrompt("CREATE_REPORT");

    if (!result.success) {
      return NextResponse.json(result, {
        status: result.status,
      });
    }

    return NextResponse.json(
      {
        success: true,
        report: result.output,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error creando el reporte:", error);

    return NextResponse.json(
      {
        success: false,
        error: "No fue posible generar el reporte.",
      },
      {
        status: 500,
      },
    );
  }
}
