import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

export const useDeleteUser = () => {
  const [deletePending, setDeletePending] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const { user, dispatch } = useAuthContext();
  const navigate = useNavigate();

  const deleteUser = async (password) => {
    if (!user) {
      return;
    }
    setDeleteError("");
    setDeletePending(true);

    const response = await fetch(
      `${process.env.REACT_APP_MAIN_API_URL}/auth/dashboard/updateuser/deleteUser`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ password }),
      }
    );

    const jsonRes = await response.json();
    if (!response.ok) {
      setDeletePending(false);
      setDeleteError(jsonRes.error);
    }
    if (response.ok) {
      setDeletePending(false);
      setDeleteError(jsonRes.message);
      dispatch({ type: "LOGOUT" });
      localStorage.removeItem("user");
      navigate("/");
    }
  };

  return { deleteUser, deletePending, deleteError };
};
