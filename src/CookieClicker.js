import React, { useState, useEffect } from 'react';
import './CookieClicker.css';
import cookieImage from './assets/cookie.png';

function CookieClicker() {
  const [cookies, setCookies] = useState(0);
  const [clickValue, setClickValue] = useState(1);
  const [clickUpgradeCost, setClickUpgradeCost] = useState(10);
  const [autoClickerCount, setAutoClickerCount] = useState(0);

  const handleClick = () => {
    setCookies(cookies + clickValue);
    document.getElementById("cookieImage").classList.add("pop");
    setTimeout(() => {
      document.getElementById("cookieImage").classList.remove("pop");
    }, 200);
  };

  const buyClickValueUpgrade = () => {
    if (cookies >= clickUpgradeCost) {
      setCookies(cookies - clickUpgradeCost);
      setClickValue(clickValue + 1);
      setClickUpgradeCost(clickUpgradeCost + 50);
    } else {
      alert("Not enough cookies to buy this upgrade!");
    }
  };

  const buyAutoClicker = () => {
    const autoClickerCost = 100;
    if (cookies >= autoClickerCost) {
      setCookies(cookies - autoClickerCost);
      setAutoClickerCount(autoClickerCount + 1);
    } else {
      alert("Not enough cookies to buy an auto-clicker!");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCookies(cookies + autoClickerCount);
    }, 1000);

    return () => clearInterval(interval);
  }, [autoClickerCount, cookies]);

  return (
    <div className="CookieClicker">
      <div className="cookieCount">Cookies: {cookies}</div>
      <div className="content">
        <img src={cookieImage} alt="Cookie" onClick={handleClick} className="cookieImage" id="cookieImage" />
        <div className="sideButtons">
          <button onClick={buyClickValueUpgrade} className="upgradeButton">Upgrade Click Value (Cost: {clickUpgradeCost} cookies)</button>
          <button onClick={buyAutoClicker} className="autoClickerButton">Buy Auto-Clicker (Cost: 100 cookies)</button>
        </div>
        <div className="stats">
          <p>Each click is worth {clickValue} cookies.</p>
          <p>You have {autoClickerCount} auto-clickers.</p>
        </div>
      </div>
    </div>
  );
}

export default CookieClicker;
