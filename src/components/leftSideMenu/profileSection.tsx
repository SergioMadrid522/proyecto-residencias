import LogoutButton from "./LogoutButton";

export default function ProfileSection() {
  return (
    <div className="flex flex-col items-center gap-2.5 p-8">
      <p>Fabian A. | Admin</p>

      <LogoutButton />
    </div>
  );
}
