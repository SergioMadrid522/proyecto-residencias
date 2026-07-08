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
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-full">
      <div className="rounded-2xl p-8 shadow-sm">
        <div className="border-b border-gray-200 pb-6">
          <p className="text-sm font-medium text-gray-500">
            Proyecto #{project.id}
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            {capitalizeFirstLetter(project.nombreProyecto)}
          </h1>
        </div>

        <div className="mt-8">
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            Descripción
          </h2>

          <p className="leading-7 text-gray-700">
            {capitalizeFirstLetter(project.descripcion!)}
          </p>
        </div>
      </div>
    </div>
  );
}
