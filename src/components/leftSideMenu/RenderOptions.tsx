import { useRolMapper } from "@/hooks/useRolMapper";
import Link from "next/link";

export default async function RenderOptions() {
  const { option, basePath } = await useRolMapper();

  return (
    <div className="py-8">
      <div className="flex flex-col gap-3">
        {option.map(({ label, link, icon, viewbox }) => (
          <Link
            href={`${basePath}${link}`}
            key={label}
            className="flex px-8 py-3 gap-2.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="currentColor"
              className=""
              viewBox={viewbox}
            >
              <path d={icon} />
            </svg>
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
