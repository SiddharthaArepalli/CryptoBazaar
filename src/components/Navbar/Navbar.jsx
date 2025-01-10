import React , {useContext} from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import arrow_icon from '../../assets/arrow_icon.png'
import { coinContext } from "../../context/CoinContext";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const {setCurrency} = useContext(coinContext);
  const currencyHandler = (e) =>{
    switch (e.target.value) {
      case 'usd':
        setCurrency({
          name : "usd",
          Symbol : "$"
        })
        break;
      case 'eur':
        setCurrency({
          name : "eur",
          Symbol : "€"
        })
        break;
      case 'inr':
        setCurrency({
          name : "inr",
          Symbol : "₹"
        })
        break;
      default:
        setCurrency({
          name : "inr",
          Symbol : "₹"
        })
        break;
    } 
  }
  return (
    <div className='navbar'>
           <Link to={"/"}>
                <h1>CryptoBazaar</h1>
           </Link>
      
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/features">Features</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
          <div className="nav-right">
             <select onChange={currencyHandler}>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="inr">INR</option>
             </select>
             <button>Sign up <img src={arrow_icon} alt="" /></button>
          </div>
    </div>
  )
}

export default Navbar

