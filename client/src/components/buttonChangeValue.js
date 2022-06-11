import React from 'react'
import stylesProduct from '../screens/CSS/productInfor.module.css';
import {useState} from 'react';

function ButtonChangeValue({titleLeft, titleRight, startValue, numberProduct}){
    const [count, setCount] = useState(startValue);

    const handleChange = event => {
      if (isNaN(event.target.value)) {
        return;
      }
      const result = event.target.value.replace(/\D/g, '');
      if(Number(result) >= numberProduct){
        setCount(numberProduct);
      }
      else
        setCount(result);
    };

    return (
      <div className={stylesProduct.soldInfo}>
        <button 
            className={stylesProduct.button}
            onClick={() => setCount(Number(count) - 1 < 1 ? 1 : Number(count) - 1)}
        >
            {titleLeft}
        </button>
        <input 
            className={stylesProduct.button1} 
            value={count}
            type="text" 
            onChange={handleChange}
        />
        <button 
            className={stylesProduct.button}
            onClick={() => setCount(Number(count) + 1 > numberProduct ? Number(count) : Number(count) + 1)}
        >
            {titleRight}
        </button>
        <p  className={stylesProduct.numberProduct}>{numberProduct} san pham con hang</p>
      </div>
    );
  };

export default ButtonChangeValue;