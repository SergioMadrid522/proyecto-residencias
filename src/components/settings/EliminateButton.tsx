"use client";
import { useEliminateCanceledTickets } from "@/hooks/useEliminateCanceledTickets";
import { GLOBAL } from "@/icons.data";
import { DangerZoneOption } from "./DangerZoneOption";
import { useEliminateClosedTickets } from "@/hooks/useEliminateClosedTicket";

export default function EliminateButton({ rol }: { rol: string }) {
  const { loadingCanceled, handleEliminateCanceledSubmit } =
    useEliminateCanceledTickets();
  const { loadingClosed, handleEliminateClosedSubmit } =
    useEliminateClosedTickets();
  const { circleSpin: LoadingIcon } = GLOBAL;

  return (
    <>
      {rol.toLowerCase() === "admin" && (
        <>
          <DangerZoneOption.Option>
            <div>
              <p>Eliminar Ticket cancelados</p>
              <p>
                <span className="italic font-semibold">
                  Ejecuta un soft-detelete
                </span>{" "}
                de todos aquellos tickets{" "}
                <span className="italic font-semibold">
                  con estado en Cancelado
                </span>
              </p>
            </div>

            <DangerZoneOption.Action>
              <button
                type="button"
                onClick={handleEliminateCanceledSubmit}
                disabled={loadingCanceled}
                className="outline rounded-md p-1 cursor-pointer"
              >
                {loadingCanceled ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      {LoadingIcon()}
                    </svg>
                    Eliminando Proyectos...
                  </span>
                ) : (
                  "Eliminar"
                )}
              </button>
            </DangerZoneOption.Action>
          </DangerZoneOption.Option>

          <DangerZoneOption.Option>
            <div>
              <p>Eliminar Ticket cerrados</p>
              <p>
                <span className="italic font-semibold">
                  Ejecuta un soft-detelete
                </span>{" "}
                de todos aquellos tickets{" "}
                <span className="italic font-semibold">
                  con estado en Cerrado
                </span>
              </p>
            </div>

            <DangerZoneOption.Action>
              <button
                type="button"
                onClick={handleEliminateClosedSubmit}
                disabled={loadingClosed}
                className="outline rounded-md p-1 cursor-pointer"
              >
                {loadingClosed ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      {LoadingIcon()}
                    </svg>
                    Eliminando Proyectos...
                  </span>
                ) : (
                  "Eliminar"
                )}
              </button>
            </DangerZoneOption.Action>
          </DangerZoneOption.Option>
        </>
      )}
    </>
  );
}
