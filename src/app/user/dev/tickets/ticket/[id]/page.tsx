import TicketPageContent from "@/components/tickets/TicketComponent";

export default async function TicketPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <TicketPageContent id={id} />;
}
