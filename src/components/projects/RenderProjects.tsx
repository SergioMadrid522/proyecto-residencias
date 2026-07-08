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
          <tr key={id} className="border">
            <td className="border-r p-2 text-center">{id}</td>
            <td className="border-r p-2">
              <Link
                href={`/user/admin/projects/project/${id}`}
                className="underline"
              >
                {capitalizeFirstLetter(nombreProyecto)}
              </Link>
            </td>
            <td>
              <ActionButtons id={id} />
            </td>
          </tr>
        </tbody>
      ))}
    </>
  );
}
