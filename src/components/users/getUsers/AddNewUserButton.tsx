"use client";
import { useOpenModal } from "@/context/ModalContext";
import { useUserContext } from "@/context/userContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AddNewUserButton({ rol }: { rol: string }) {
  const { setModal } = useOpenModal();
  const isAdmin = rol.toLowerCase() === "admin";
  const { setUserType } = useUserContext();
  const pathname = usePathname();
  const isInactiveUserPage = pathname === "/user/admin/users/inactive";
  return (
    <>
      {/* {isAdmin && (
        <Link
          href="/user/admin/users/inactive"
          onClick={() => {
            setUserType({ type: "inactive-users" });
          }}
          className="border rounded-md px-2 py-1.5 cursor-pointer"
        >
          Usuarios Inactivos
        </Link>
      )} */}

      <button
        onClick={() => {
          setModal({ type: "create-user" });
        }}
        className="border rounded-md px-2 py-1.5 cursor-pointer"
      >
        Agregar nuevo usuario
      </button>
    </>
  );
}
