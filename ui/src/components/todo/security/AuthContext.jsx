import { createContext, useContext, useState } from "react";
import { apiClient } from "../apiService/ApiClient";
import { executeBasicAuthenticationService } from "../apiService/todoService";

//1: Create a Context
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {

    //Put some state in the context
    const [isAuthenticated, setAuthenticated ] = useState(false);

    const [username, setUsername ] = useState(null);

    async function login(username, password){

        const baToken = 'Basic ' + window.btoa( username + ":" + password )

        try {
            const response = await executeBasicAuthenticationService(baToken);

            if(response.status === 200){
                apiClient.interceptors.request.use(
                    (config) => {
                        console.log('intercepting and adding a token')
                        config.headers.Authorization = baToken
                        return config
                    })
                    setAuthenticated(true);
                    setUsername(username);
                    return true;
            }else{
                logout()
                return false
            }
        } catch (error) {
            logout()
            return false
        
        }
       

       
    }

    function logout(){
        setAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={ {isAuthenticated, login, logout, username} }>
            {children}
        </AuthContext.Provider>
    )
}