import { getUserSession } from "@/utils/getFunctions";
import { DangerZoneOption } from "./DangerZoneOption";

export default async function DangerZone() {
  const { rol } = await getUserSession();

  return (
    <DangerZoneOption.Card>
      <DangerZoneOption.TitleSection>
        <DangerZoneOption.Title>Zona de peligro</DangerZoneOption.Title>
        <DangerZoneOption.Subtitle>
          Estas acciones son irreversibles. Procede con cuidado.
        </DangerZoneOption.Subtitle>
      </DangerZoneOption.TitleSection>

      {rol.toLowerCase() === "admin" && (
        <>
          <DangerZoneOption.Option>
            <div>
              <p>Eliminar Ticket cancelados</p>
              <p>Elimina todos aquellos tickets con estado en Cancelado</p>
            </div>

            <DangerZoneOption.Action>
              <button
                type="button"
                className="outline rounded-md p-1 cursor-pointer"
              >
                Eliminar
              </button>
            </DangerZoneOption.Action>
          </DangerZoneOption.Option>
        </>
      )}
    </DangerZoneOption.Card>
  );
}
