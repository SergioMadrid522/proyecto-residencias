"use client";
import { RenderOptionsProps } from "@/types/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RenderOptions({ data }: RenderOptionsProps) {
  const { option, basePath } = data;
  const pathname = usePathname();
  return (
    <div className="py-8">
      <div className="flex flex-col gap-3">
        {option.map(({ label, link, icon, viewbox }) => {
          const fullPath = `${basePath}${link}`;
          const isActive = pathname === fullPath;
          const isProject = label.toLowerCase() === "proyectos";
          return (
            <Link
              href={`${basePath}${link}`}
              key={label}
              className={`flex px-8 py-3 gap-2.5 ${
                isActive
                  ? "bg-gray-200 text-black/70 font-semibold"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="currentColor"
                viewBox={viewbox}
              >
                {isProject ? (
                  <>
                    <path d="M4 3.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5z" />
                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1" />
                  </>
                ) : (
                  <path d={icon} />
                )}
              </svg>
              {label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
