import { createContext, useContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({children}) => {
    const [isSidebarHide, setIsSidebarHide] = useState(false);     
    return (
        <GlobalContext.Provider value={{ isSidebarHide, setIsSidebarHide}}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalProvider = () => useContext(GlobalContext);
