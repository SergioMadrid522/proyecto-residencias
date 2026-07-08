import AddNewProjectButton from "@/components/projects/AddNewProjectButton";
import CreateProject from "@/components/projects/createProjectModal/CreateProject";
import EditProject from "@/components/projects/editProjectModal/EditProject";
import RenderProjects from "@/components/projects/RenderProjects";
import { useRolMapper } from "@/hooks/useRolMapper";
import { getUsers } from "@/utils/getFunctions";

export default async function Projects() {
  const { user } = await getUsers();
  const { activeRol } = await useRolMapper();

  return (
    <>
      <div className="flex justify-end my-4 gap-3">
        <AddNewProjectButton activeRol={activeRol} />
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-5 py-3 text-center text-sm font-semibold text-gray-700">
                ID
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                Nombre del proyecto
              </th>
              <th className="w-24 px-5 py-3 text-center text-sm font-semibold text-gray-700">
                Acciones
              </th>
            </tr>
          </thead>

          <RenderProjects />
        </table>
      </div>

      <CreateProject />
      <EditProject />
    </>
  );
}
