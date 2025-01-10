import React ,{useEffect, useState, useContext}from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom';
import { coinContext } from "../../context/CoinContext";
import LineChart from '../../components/LineChart/LineChart';
const Coin = () => {
  const {coinId} = useParams();
  const [coinData, setCoinData] = useState();
  const [histData, sethistData] = useState();
  const {currency} = useContext(coinContext);
  const fetchCoinData = async ()=>{
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-Q3ADpXtnejeJQHyhwximEr16'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then(res => res.json())
      .then(res => setCoinData(res))
      .catch(err => console.error(err));
  }


  useEffect(()=>{
      fetchCoinData();
      fetchHistData();
  },[currency])

  const fetchHistData = async ()=>{
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-Q3ADpXtnejeJQHyhwximEr16'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
      .then(res => res.json())
      .then(res => sethistData(res))
      .catch(err => console.error(err));
  }


  if(coinData && histData){
  return (
    <div className='coin'>
         <div className="coin-name">
             <img src={coinData.image.large} alt="/" />
             <p><b>{coinData.name}({coinData.symbol.toUpperCase()})</b></p>
         </div>
          <div className="coin-chart">
             <LineChart histData={histData}/>
          </div>
          <div className="coin-info">
            <ul>
              <li>Crypto Market Rank</li>
              <li>{coinData.market_cap_rank}</li>
            </ul>
            <ul>
              <li>Current Price</li>
              <li>{currency.Symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</li>
            </ul>
            <ul>
              <li>Market Cap</li>
              <li>{currency.Symbol} {coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
            </ul>
            <ul>
              <li>24 Hour high</li>
              <li>{currency.Symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
            </ul>
            <ul>
              <li>24 Hour low</li>
              <li>{currency.Symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
            </ul>
          </div>
    </div>
  )
}else{
  return(
    <div className='spinner'>
         <div className="spin">
         </div>
    </div> 
  )
}
}
export default Coin
