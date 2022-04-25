import React, { createContext, useContext, useEffect, useState } from 'react'

const Crypto = createContext();

const Context = ({children}) => {
    const [currency,setCurrency] = useState('INR');
    const [symbol,setSymbol]= useState('Rs')

    useEffect(()=>{
      if(currency==='INR') setSymbol('Rs')
      else if(currency==='USD') setSymbol('$')
    },[currency])
  return (
    <Crypto.Provider value={{symbol ,currency,setCurrency}}>{children}</Crypto.Provider>
  )
}

export default Context

export const CryptoState =()=>{
   return useContext(Crypto)
}