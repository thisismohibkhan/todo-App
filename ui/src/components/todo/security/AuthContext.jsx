import { createContext, useContext, useState } from "react";

//1: Create a Context
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {

    //Put some state in the context
    const [isAuthenticated, setAuthenticated ] = useState(false);

    return (
        <AuthContext.Provider value={ {isAuthenticated, setAuthenticated} }>
            {children}
        </AuthContext.Provider>
    )
}