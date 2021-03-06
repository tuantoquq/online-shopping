import React from 'react'
import stylesProduct from '../screens/CSS/productInfor.module.css';
import {useState} from 'react';
import { Button } from '@mui/material';

function ButtonChangeValue({titleLeft, titleRight, startValue, numberProduct, plus, minus, write}) {
    const [count, setCount] = useState(startValue);

    const handleChange = event => {
      if (isNaN(event.target.value)) {
        return;
      }
      const result = event.target.value.replace(/\D/g, '');
      if(Number(result) >= numberProduct){
        setCount(numberProduct);
        write(numberProduct);
      }
      else
        setCount(result);
        write(result);
    };

    return (
      <div className={stylesProduct.soldInfo}>
        <div className={stylesProduct.button}>
          <Button 
              onClick={() => {setCount(Number(count) - 1 < 1 ? 1 : Number(count) - 1); minus()}}
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
              onClick={() => {setCount(Number(count) + 1 > numberProduct ? Number(count) : Number(count) + 1); plus()}}
          >
              {titleRight}
          </Button>          
        </div>

        <p  className={stylesProduct.numberProduct}>{numberProduct}Sản phẩm còn hàng</p>
      </div>
    );
  };

export default ButtonChangeValue;