import TicketPageContent from "@/components/tickets/TicketComponent";
import { validateTicketURL } from "@/helpers/validateURL";
import { notFound } from "next/navigation";

export default async function TicketPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isFinite(numericId)) {
    notFound();
  }

  const ticket = await validateTicketURL(numericId);

  if (!ticket) {
    notFound();
  }

  return <TicketPageContent id={id} />;
}
