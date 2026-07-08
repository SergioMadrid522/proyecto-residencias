import { getUserSession } from "@/utils/getFunctions";
import { DangerZoneOption } from "./DangerZoneOption";
import { useEliminateCanceledTickets } from "@/hooks/useEliminateCanceledTickets";
import { GLOBAL } from "@/icons.data";
import EliminateButton from "./EliminateButton";

export default async function DangerZone() {
  const { rol } = await getUserSession();

  return (
    <DangerZoneOption.Card>
      <DangerZoneOption.TitleSection>
        <DangerZoneOption.Title>Zona de peligro</DangerZoneOption.Title>
      </DangerZoneOption.TitleSection>

      <EliminateButton rol={rol} />
    </DangerZoneOption.Card>
  );
}
