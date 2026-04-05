import { leftSideMenuOptions } from "@/data";
import { LeftSideMenuOption } from "@/types";
import { getUserSession } from "@/utils/getFunctions";

export async function useRolMapper() {
  const { rolId } = await getUserSession();

  const rolMapper: Record<number, keyof LeftSideMenuOption> = {
    1: "admin",
    2: "dev",
    3: "tester",
  };

  const activeRol = rolMapper[rolId] || "unkown";
  const option = leftSideMenuOptions[activeRol];
  const basePath = `/user/${activeRol}`;
  console.log(activeRol);
  return { option, basePath, rolMapper };
}
