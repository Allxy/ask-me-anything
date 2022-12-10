import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import User from '../models/User';

interface UserContextType {
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>>
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {}
});

interface UserContextProviderProps {
  children: React.ReactNode
  value: User | null
}

export const UserContextProvider: React.FC<UserContextProviderProps> = ({ children, value }) => {
  const [user, setUser] = useState<User | null>(value);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => useContext(UserContext);

export default UserContext;
