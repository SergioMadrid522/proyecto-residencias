import { statsOverview } from "@/data";

export default function DashboardOverview() {
  return (
    <div className="grid grid-cols-4 gap-3 justify-around px-6 rounded-2xl ">
      {statsOverview.map(({ icon: Icon, iconViewbox, title, color, stats }) => (
        <div key={title} className="border rounded-md shadow-lg px-2 py-4">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svag"
              width="25"
              height="25"
              fill={color}
              viewBox={iconViewbox}
            >
              <Icon />
            </svg>
            <p className="text-[18px]">{title}</p>
          </div>
          <p className="px-1 font-bold">
            {title.toLowerCase() === "mttr promedio" ? (
              <>
                <span className="text-[25px]">{stats}</span>
                <span className="text-[18px]"> h</span>
              </>
            ) : (
              <span className="text-[25px]">{stats}</span>
            )}
          </p>
        </div>
      ))}
    </div>
  );
}
