import React, { useEffect } from 'react'
import './Home.css'
import { coinContext } from "../../context/CoinContext";
import { useContext } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const Home = () => {
  const {allCoins , currency } = useContext(coinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState('');
  const inputHandler = (e)=>{
         setInput(e.target.value);
         if(e.target.value === ""){
           setDisplayCoin(allCoins);
         }
  }
  
  const searchHandler = async (e)=>{
     e.preventDefault();
    const coins =  await allCoins.filter((coin)=>{
          return coin.name.toLowerCase().includes(input.toLowerCase())
     })
     setDisplayCoin(coins);
  }


  useEffect(()=>{
    setDisplayCoin(allCoins);
  },[allCoins])
  return (
    <div className='home'>
      <div className='hero'>
          <h1>Largest <br />Crypto Bazaar</h1>
          <p>Welcome to the worlds largest cryptocurrency markeplace. Sign up to explore more about cryptos.</p>
          <form onSubmit={searchHandler}>
             <input onChange={inputHandler} list='coinlist' value = { input} type="text" placeholder='Search Crypto' required/>
            <datalist id = "coinlist">
              {allCoins.map((coin , index)=>(
                <option key={index} value={coin.name} />
              ))}
            </datalist>
            <button type='submit'>Search</button>
          </form>
      </div>
      <div className="crypto-table">
          <div className="table-layout">
              <p>#</p>
              <p>Coins</p>
              <p>Price</p>
              <p style = {{textAlign:"center"}}>24H Change</p>
              <p className= 'market-cap'>Market Cap</p>
          </div>
          {
          displayCoin.slice(0,10).map((coin , index) =>(
            <Link to={`/coin/${coin.id}`}className="table-layout" key={index}>
               <p>{coin.market_cap_rank}</p>
               <div>
                 <img src={coin.image} alt="" />
                  <p>{coin.name + " - "+coin.symbol}</p> 
               </div>
               <p>
                {currency.Symbol +" " +coin.current_price.toLocaleString()}
               </p>
               <p className={coin.price_change_percentage_24h>0?"green":"red"}
               >{Math.floor(coin.price_change_percentage_24h*100)/100}</p>
               <p className='market-cap'>{currency.Symbol }{coin.market_cap.toLocaleString()}</p>
              </Link>
          ))
          }
      </div> 
    </div> 
  )
}

export default Home
