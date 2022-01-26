import {createContext, useState} from "react";


export const DataContext = createContext(null);

export const DataProvider = ({children}) => {
  const initUser = {id: '', name: '', avatar: '', createdAt: ''};

  const [userState, setUserState] = useState(initUser);

  const value = {
    initUser,
    userState,
    setUserState
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}
