import { createContext, useContext, useState } from "react";
import { apiClient } from "../apiService/ApiClient";
import { executeJWTAuthenticationService } from "./AuthenticationApiService";

//1: Create a Context
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {

    //Put some state in the context
    const [isAuthenticated, setAuthenticated ] = useState(false);
    const [token, setToken ] = useState(null);

    const [username, setUsername ] = useState(null);

    async function login(username, password){

        try {
            const response = await executeJWTAuthenticationService(username, password);

            if(response.status === 200){
                const jwtToken =  `Bearer ${response.data.token}`;
                apiClient.interceptors.request.use(
                    (config) => {
                        console.log('intercepting and adding a token')
                        config.headers.Authorization = jwtToken;
                        return config
                    })
                    setToken(jwtToken);
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
        <AuthContext.Provider value={ {isAuthenticated, login, logout, username, token} }>
            {children}
        </AuthContext.Provider>
    )
}