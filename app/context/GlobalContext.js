"use client"
import { createContext, useContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({children,departmentID,departmentDataIDWise,serviceID,services,service,serviceDetails,departmentName}) => {
    const [isSidebarHide, setIsSidebarHide] = useState(false);     
    return (
        <GlobalContext.Provider value={{ isSidebarHide, setIsSidebarHide,departmentID,departmentDataIDWise,serviceID,services,service,serviceDetails,departmentName}}>  
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalProvider = () => useContext(GlobalContext);


