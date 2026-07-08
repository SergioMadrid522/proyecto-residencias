import { getUserSession } from "@/utils/getFunctions";
import { DangerZoneOption } from "./DangerZoneOption";
import EliminateButton from "./EliminateButton";

export default async function DangerZone() {
  const { rol } = await getUserSession();

  return (
    <DangerZoneOption.Card>
      <DangerZoneOption.TitleSection>
        <DangerZoneOption.Title>Zona de peligro</DangerZoneOption.Title>

        <DangerZoneOption.Subtitle>
          Estas acciones afectan múltiples registros, proceda con cuidado.
        </DangerZoneOption.Subtitle>
      </DangerZoneOption.TitleSection>

      <EliminateButton rol={rol} />
    </DangerZoneOption.Card>
  );
}
