import ProjectPageContent from "@/components/projects/ProjectPageContent";
import { validateProjectURL } from "@/helpers/validateURL";
import { notFound } from "next/navigation";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isFinite(numericId)) {
    notFound();
  }

  const project = await validateProjectURL(numericId);

  if (!project) {
    notFound();
  }

  return <ProjectPageContent id={id} />;
}
