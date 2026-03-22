import { getUserSession } from "@/utils/getFunctions";

export default async function GlobalNavbar() {
  const { rol } = await getUserSession();
  return (
    <div className="grid grid-cols-[230px_1fr] items-center w-full h-full border-b gap-4">
      <h1 className="border-r h-full py-5 text-center">Bug Tracker</h1>
      <h2>{`Panel del ${rol}`}</h2>
    </div>
  );
}
