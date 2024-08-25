import { createContext,useContext,useState } from "react";

export let UserContext = createContext()

export default function UserContextProvider({children}){
    const [userData, setUserData] = useState(() => {
        return localStorage.getItem('userToken') || null;
      });
    const logout = () => {
        localStorage.removeItem('userToken');
        setUserData(null);
        localStorage.removeItem('likedProducts'); // Clear liked products from localStorage
    };
    return <UserContext.Provider value={{userData , setUserData , logout}}>
        {children}
    </UserContext.Provider>
}