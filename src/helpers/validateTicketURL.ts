import { findTicketById } from "@/services/ticket.service";

export async function validateTicketURL(id: number) {
  try {
    const ticket = await findTicketById(id);

    if (!ticket) return null;

    return {
      success: true,
    };
  } catch {
    return null;
  }
}
