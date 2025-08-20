import axios from 'axios';

const useAxiosSesure = () => {

  const instance = axios.create({
  baseURL: `https://luxxora-server.vercel.app`
});
  return instance
    
  }
export default useAxiosSesure;