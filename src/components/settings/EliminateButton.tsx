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
              <h3 className="font-semibold text-gray-900">
                Eliminar tickets cancelados
              </h3>

              <p className="mt-1 text-sm text-gray-600">
                Marca como <span className="font-medium">inactivos</span> todos
                los tickets cuyo estado sea{" "}
                <span className="font-semibold">Cancelado</span>. Esta acción no
                elimina permanentemente la información.
              </p>
            </div>

            <DangerZoneOption.Action>
              <button
                type="button"
                onClick={handleEliminateCanceledSubmit}
                disabled={loadingCanceled}
                className={`flex items-center justify-center rounded-lg px-4 py-2 font-medium text-white transition-all duration-200 ${
                  loadingCanceled
                    ? "cursor-not-allowed bg-red-400"
                    : "cursor-pointer bg-red-600 hover:bg-red-700 hover:shadow-md active:scale-95"
                }`}
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
              <h3 className="font-semibold text-gray-900">
                Eliminar tickets cerrados
              </h3>

              <p className="mt-1 text-sm text-gray-600">
                Marca como <span className="font-medium">inactivos</span> todos
                los tickets cuyo estado sea{" "}
                <span className="font-semibold">Cerrado</span>. Esta acción no
                elimina permanentemente la información.
              </p>
            </div>

            <DangerZoneOption.Action>
              <button
                type="button"
                onClick={handleEliminateClosedSubmit}
                disabled={loadingClosed}
                className={`flex items-center justify-center rounded-lg px-4 py-2 font-medium text-white transition-all duration-200 ${
                  loadingCanceled
                    ? "cursor-not-allowed bg-red-400"
                    : "cursor-pointer bg-red-600 hover:bg-red-800 hover:shadow-md active:scale-95"
                }`}
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
