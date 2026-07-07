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

      <table className="w-full border-collapse">
        <thead>
          <tr className="border">
            <th className="border p-2">ID</th>
            <th className="border p-2">Titulo</th>
            <th className="border p-2"></th>
          </tr>
        </thead>

        <RenderProjects />
      </table>

      <CreateProject user={user} />
      <EditProject />
    </>
  );
}
