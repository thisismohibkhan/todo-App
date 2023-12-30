import { createContext, useContext, useState } from "react";

//1: Create a Context
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {

    //Put some state in the context
    const [isAuthenticated, setAuthenticated ] = useState(false);

    function login(username, password){
        if(username === 'mohib' && password === 'khan'){
            setAuthenticated(true);
            return true;
        }else{
            setAuthenticated(false);
           return false;
        }
    }

    function logout(){
        setAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={ {isAuthenticated, login, logout} }>
            {children}
        </AuthContext.Provider>
    )
}