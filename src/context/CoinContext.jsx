import { useEffect } from "react";
import { createContext } from "react";
export const coinContext = createContext();
import { useState } from "react";
const CoinContextProvider = ({ children }) => {
    const [allCoins, setAllCoins] = useState([]);
    const [currency , setCurrency] = useState({
        name : "usd",
        Symbol : "$"
    });

    const fetchAllCoin = async () => {
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-Q3ADpXtnejeJQHyhwximEr16'}
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(res => res.json())
            .then(res => setAllCoins(res))
            .catch(err => console.error(err));
    }
  
  useEffect(()=>{
    fetchAllCoin();
  },[currency])
    
    const contextValue = {
        allCoins, currency, setCurrency
    }
   return(
         <coinContext.Provider value={contextValue}>
              {children}
         </coinContext.Provider>
   )
}

export default CoinContextProvider;
