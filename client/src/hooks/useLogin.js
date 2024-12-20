import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  //setting usestate for loading and error
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  //destructure dispatch from authcontext
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    //making the http request that return a response from server
    const response = await fetch(
      `${process.env.REACT_APP_MAIN_API_URL}/auth/login`,
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    //convert the responst into js object
    const jsonRes = await response.json();

    //checking if response got any error
    if (!response.ok) {
      setIsLoading(false);
      setError(jsonRes.error);
    }

    if (response.ok) {
      //save the token to local storage
      localStorage.setItem("user", JSON.stringify(jsonRes));
      setIsLoading(false);
      setError(null);

      //update the authContext
      dispatch({ type: "LOGIN", payload: jsonRes });
    }
  };
  return { login, isLoading, error };
};
