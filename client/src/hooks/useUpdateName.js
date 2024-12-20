import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const useUpdateName = () => {
  const [namePending, setNamePending] = useState(false);
  const [nameError, setNameError] = useState("");

  const { user } = useAuthContext();

  const updateName = async (name) => {
    if (!user) {
      return;
    }
    setNameError("");
    setNamePending(true);

    const response = await fetch(
      `${process.env.REACT_APP_MAIN_API_URL}/auth/dashboard/updateuser/changename`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ name }),
      }
    );

    const jsonRes = await response.json();
    if (!response.ok) {
      setNamePending(false);
      setNameError(jsonRes.error);
    }
    if (response.ok) {
      setNamePending(false);
      setNameError(jsonRes.message);
    }
  };

  return { updateName, namePending, nameError };
};
