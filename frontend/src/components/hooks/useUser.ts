import { useContext } from 'react';
import UserContext, { UserContextType } from '../../contexts/UserContext';

const useUser = (): UserContextType => useContext(UserContext);

export default useUser;
