import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const useUpdatePassword = () => {
  const [passwordPending, setPasswordPending] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const { user } = useAuthContext();

  const updatePassword = async (oldPassword, newPassword) => {
    if (!user) {
      return;
    }
    setPasswordError("");
    setPasswordPending(true);

    const response = await fetch(
      `${process.env.REACT_APP_MAIN_API_URL}/auth/dashboard/updateuser/changepassword`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      }
    );

    const jsonRes = await response.json();
    if (!response.ok) {
      setPasswordPending(false);
      setPasswordError(jsonRes.error);
    }
    if (response.ok) {
      setPasswordPending(false);
      setPasswordError(jsonRes.message);
    }
  };

  return { updatePassword, passwordPending, passwordError };
};
