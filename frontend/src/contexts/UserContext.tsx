import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { IUser } from '../models/User';

export interface UserContextType {
  user: IUser | null
  setUser: Dispatch<SetStateAction<IUser | null>>
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {}
});

interface UserContextProviderProps {
  children: React.ReactNode
  value: IUser | null
}

export const UserContextProvider: React.FC<UserContextProviderProps> = ({ children, value }) => {
  const [user, setUser] = useState<IUser | null>(value);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
