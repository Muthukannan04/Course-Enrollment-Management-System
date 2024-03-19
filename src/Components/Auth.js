import React , {useContext,useState} from "react";

const AuthContext=React.createContext(null)

export const Auth=({children})=>{
    const[user,setUser]=useState(null)
    const Login=(user)=>{
        setUser(user)
    }
    const Logout=()=>{
        setUser(null)
    }
    return(
   <div>
    <AuthContext.Provider value={{user,Login,Logout}}>
        {children}
    </AuthContext.Provider>
   </div>
    )
}
export const UseAuth=()=>{
    return useContext(AuthContext)
}