import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const useUpdateAvatar = () => {
  const [avatarPending, setAvatarPending] = useState(false);
  const [avatarError, setAvatarError] = useState("");

  const { user } = useAuthContext();

  const updateAvatar = async (avatar) => {
    if (!user) {
      return;
    }
    setAvatarError("");
    setAvatarPending(true);

    const response = await fetch(
      `${process.env.REACT_APP_MAIN_API_URL}/auth/dashboard/updateuser/changeavatar`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ avatar }),
      }
    );

    const jsonRes = await response.json();
    if (!response.ok) {
      setAvatarPending(false);
      setAvatarError(jsonRes.error);
    }
    if (response.ok) {
      setAvatarPending(false);
      setAvatarError(jsonRes.message);
    }
  };

  return { updateAvatar, avatarPending, avatarError };
};
