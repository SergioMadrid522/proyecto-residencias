import { statsOverview } from "@/data";

export default function DashboardOverview() {
  return (
    <div className="grid grid-cols-4 gap-5">
      {statsOverview.map(({ icon, iconViewbox, title, stats }) => (
        <div key={title} className="border rounded-md shadow-lg px-2 py-4">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svag"
              width="25"
              height="25"
              fill="currentColor"
              className=""
              viewBox={iconViewbox}
            >
              <path d={icon} />
            </svg>
            <p className="text-xl">{title}</p>
          </div>
          <p className="text-lg">{stats}</p>
        </div>
      ))}
    </div>
  );
}
