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

      <DangerZoneOption.Option>
        <div>
          <p>Exportar todos los tickets</p>
          <p>Descarga un archivo CSV con el historial completo del sistema</p>
        </div>

        <DangerZoneOption.Action>
          <button
            type="button"
            className="outline rounded-md p-1 cursor-pointer"
          >
            Descargar CSV
          </button>
        </DangerZoneOption.Action>
      </DangerZoneOption.Option>

      {rol.toLowerCase() === "admin" && (
        <DangerZoneOption.Option>
          <div>
            <p>Archivar tickets cerrados</p>
            <p>Mueve todos los tickets con estado CERRADO al archivo</p>
          </div>

          <DangerZoneOption.Action>
            <button
              type="button"
              className="outline rounded-md p-1 cursor-pointer"
            >
              Archivar
            </button>
          </DangerZoneOption.Action>
        </DangerZoneOption.Option>
      )}
    </DangerZoneOption.Card>
  );
}
