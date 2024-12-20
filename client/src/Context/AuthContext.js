import { useState, createContext, useEffect, useReducer } from 'react'




export const AuthContext = createContext()



export const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}



export const AuthContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(AuthReducer, { user: null })
  const [isLoading, setIsLoading] = useState(true);
  //tracking the user state


  //initial check if user token is already in local storage or not
  useEffect(() => {

    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      dispatch({ type: 'LOGIN', payload: user })
    } else {
      dispatch({ type: "LOGOUT" });
    }

    setIsLoading(false);
  }, [])

  console.log("AuthContext: ", state);
  if (isLoading) {
    return <div>Loading</div>
  }
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}



