"use client";
import { useUserContext } from "@/context/userContext";

export default function InactiveUsers() {
  const { userType } = useUserContext();
  console.log(userType);
}
