import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const useUpdateEmail = () => {
  const [emailPending, setEmailPending] = useState(false);
  const [emailError, setEmailError] = useState("");

  const { user } = useAuthContext();

  const updateEmail = async (email) => {
    if (!user) {
      return;
    }
    setEmailError("");
    setEmailPending(true);

    const response = await fetch(
      `${process.env.REACT_APP_MAIN_API_URL}/auth/dashboard/updateuser/changeemail`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ email }),
      }
    );

    const jsonRes = await response.json();
    if (!response.ok) {
      setEmailPending(false);
      setEmailError(jsonRes.error);
    }
    if (response.ok) {
      setEmailPending(false);
      setEmailError(jsonRes.message);
      let userStorage = JSON.parse(localStorage.getItem("user"));
      userStorage.email = email;
      localStorage.setItem("user", JSON.stringify(userStorage));
      user.email = email;
    }
  };

  return { updateEmail, emailPending, emailError };
};
