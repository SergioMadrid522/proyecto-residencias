import { GoogleGenAI } from "@google/genai";
import { getPrompt } from "@/utils/getFunctions";
import { AIPrompt, ValidationResult } from "@/types";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) throw new Error("GEMINI_API_KEY no está definida");

const genAI = new GoogleGenAI({ apiKey: apiKey });

export async function validatePrompt(
  data: AIPrompt,
): Promise<ValidationResult> {
  const prompt = getPrompt(data);

  try {
    const interaction = await genAI.interactions.create({
      model: "gemini-2.5-flash",
      input: prompt,
    });

    if (!interaction.output_text) {
      return {
        success: false,
        error: "La IA no devolvió una respuesta.",
        status: 500,
      };
    }

    return {
      success: true,
      output: interaction.output_text,
    };
  } catch (error: any) {
    if (error.status === 401) {
      return {
        success: false,
        error: "La API Key de Gemini no es válida.",
        status: 401,
      };
    }

    if (error.status === 429 || error.message?.includes("RESOURCE_EXHAUSTED")) {
      return {
        success: false,
        error: "Límite de tokens agotado. Intenta más tarde.",
        status: 429,
      };
    }

    return {
      success: false,
      error:
        error.message ||
        "Ocurrió un error inesperado al procesar la solicitud.",
      status: error.status || 500,
    };
  }
}
