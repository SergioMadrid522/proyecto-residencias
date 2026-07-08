import { useRolMapper } from "@/hooks/useRolMapper";
import RenderOptions from "./RenderOptions";

export default async function LeftSideMenu() {
  const data = await useRolMapper();
  return (
    <div>
      <RenderOptions data={data} />
    </div>
  );
}
