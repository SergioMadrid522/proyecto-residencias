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

  const activeRol = rolMapper[rolId] || "unknown";
  const option = leftSideMenuOptions[activeRol];
  const basePath = `/user/${activeRol}`;
  return { option, basePath, rolMapper };
}
