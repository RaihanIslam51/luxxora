import React from 'react';
import axios from 'axios'

const useAxiosSesure = () => {

  const instance = axios.create({
  baseURL: `https://feha-backed.vercel.app`
});
  return instance
    
  }
export default useAxiosSesure;