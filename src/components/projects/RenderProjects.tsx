import { getProjects } from "@/utils/getFunctions";

import Link from "next/link";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import ActionButtons from "./ActionsButtons";

export default async function RenderProjects() {
  const { projects } = await getProjects();

  if (!projects) {
    return <p>No hay proyectos para mostrar</p>;
  }

  return (
    <>
      {projects.map(({ id, nombreProyecto }) => (
        <tbody key={id}>
          <tr className="border-b border-gray-100 transition-colors hover:bg-gray-50">
            <td className="border-b border-gray-100 px-5 py-4 text-center text-sm text-gray-500">
              #{id}
            </td>

            <td className="px-5 py-4">
              <Link
                href={`/user/admin/projects/project/${id}`}
                className="font-medium text-gray-700 hover:text-gray-900 hover:underline"
              >
                {capitalizeFirstLetter(nombreProyecto)}
              </Link>
            </td>

            <td className="px-5 py-4 text-center">
              <ActionButtons id={id} />
            </td>
          </tr>
        </tbody>
      ))}
    </>
  );
}
