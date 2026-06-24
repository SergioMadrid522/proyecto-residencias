import { useState } from "react";

export function useEditTicket() {
  const [loadingEdit, setLoadingEdit] = useState(false);
  const handleEditSubmit = async (id: number) => {
    const apiURL = process.env.NEXT_PUBLIC_API_URL_EDIT_TICKET;
  };
  return {
    loadingEdit,
    handleEditSubmit,
  };
}
