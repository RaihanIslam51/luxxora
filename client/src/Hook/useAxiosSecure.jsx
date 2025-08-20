import axios from 'axios';

const useAxiosSesure = () => {

  const instance = axios.create({
  baseURL: `http://localhost:5000`
});
  return instance
    
  }
export default useAxiosSesure;