import React from 'react'
import stylesProduct from '../screens/CSS/productInfor.module.css';
import {useState} from 'react';
import { Button } from '@mui/material';

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
        <div className={stylesProduct.button}>
          <Button 
              onClick={() => setCount(Number(count) - 1 < 1 ? 1 : Number(count) - 1)}
          >
              {titleLeft}
          </Button>          
        </div>

        <input 
            className={stylesProduct.button1} 
            value={count}
            type="text" 
            onChange={handleChange}
        />
        <div className={stylesProduct.button}>
          <Button 
              onClick={() => setCount(Number(count) + 1 > numberProduct ? Number(count) : Number(count) + 1)}
          >
              {titleRight}
          </Button>          
        </div>

        <p  className={stylesProduct.numberProduct}>{numberProduct} san pham con hang</p>
      </div>
    );
  };

export default ButtonChangeValue;