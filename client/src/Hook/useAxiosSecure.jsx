import axios from 'axios';

const useAxiosSesure = () => {

  const instance = axios.create({
  baseURL: `https://luxxora-server-pied.vercel.app`
});
  return instance
    
  }
export default useAxiosSesure;