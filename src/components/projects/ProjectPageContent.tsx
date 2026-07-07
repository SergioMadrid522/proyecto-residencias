import {
  getProject,
  getTicket,
  getTicketLevel,
  getTicketModule,
  getTicketStatus,
  getUsers,
} from "@/utils/getFunctions";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";

export default async function ProjectPageContent({ id }: { id: string }) {
  const ticketId = Number(id);
  const data = await getProject(ticketId);
  const { project, error } = data;

  if (!project) {
    return <p>{error}</p>;
  }

  return (
    <div className="grid grid-cols-3 w-full">
      <div className="col-span-2 p-6">
        <h1 className="py-4 text-[26px]">ID: #{project.id}</h1>
        <h2 className="py-0 text-[26px]">
          Titulo: {capitalizeFirstLetter(project.nombreProyecto)}
        </h2>

        <div className="py-4">
          <p>Descripción:</p>
          <p className="">{capitalizeFirstLetter(project.descripcion!)}</p>
        </div>
      </div>
    </div>
  );
}
