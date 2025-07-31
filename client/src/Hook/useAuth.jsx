import { use } from 'react';
import { AuthContext } from '../Authantation/Context/AuthContext';


const useAuth = () => {
const AuthInfo = use(AuthContext)
  return AuthInfo
};

export default useAuth;