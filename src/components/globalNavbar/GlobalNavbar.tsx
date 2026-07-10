import { getUserSession } from "@/utils/getFunctions";
import Link from "next/link";

export default async function GlobalNavbar() {
  const { rol } = await getUserSession();

  return (
    <div className="grid grid-cols-[240px_1fr] items-center bg-white shadow-sm border-b border-gray-100 h-16">
      <div className="h-full flex items-center gap-3 px-5 border-r border-gray-100">
        <Link
          href={"/"}
          className="flex flex-col leading-none text-center w-full"
        >
          <span className="font-extrabold text-lg tracking-tight text-gray-900">
            Bug<span className="text-blue-600">Tracker</span>
          </span>

          <span className="text-[11px] text-gray-400">
            Issue System Manager
          </span>
        </Link>
      </div>

      <div className="px-6">
        <h2 className="text-lg font-semibold text-gray-700">Panel del {rol}</h2>
      </div>
    </div>
  );
}
