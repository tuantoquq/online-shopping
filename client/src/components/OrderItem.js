import styles from './CSS/listOrderedItem.module.css'
import { Button, CardActionArea, ButtonGroup } from '@mui/material';
import {useState, useEffect} from 'react';
import clsx from 'clsx'
import axiosConfig from '../config/axios';
import {deleteCartItem, updateCartItem} from '../service/CustomerService';
function OrderItem({productId, quantity, cartId, handle}) {
    const [productData, setProductData] = useState();
    const [itemCount, setItemCount] = useState(parseInt(quantity));
    let path = `/product/get?productId=${productId}`
    useEffect(()=>{
      axiosConfig.get(path).then(async res=>{
        setProductData(res?.data?.data)
      })
      .catch(err=>{
        console.log(err)
      })

    },[])

    useEffect(()=>{
      if(itemCount === 0){
        setItemCount(1);
        updateCartItem({cartItemsId:cartId, quantity: Math.max(itemCount - 1, 1)}).then(res => {
          handle();
        // console.log(res);
      });
      }
    },[itemCount])
    const handleChange = event => {
      if (isNaN(event.target.value)) {
        return;
      }
      const result = event.target.value.replace(/\D/g, '');
      if(Number(result) >= productData?.count){
        setItemCount(productData?.count);
      }
      else{
        setItemCount(Number(result));
      }

    };
    return (
      <div className={styles.content}>
          <div className={styles.listProduct}>
            <div className={clsx(styles.all,styles.elm1)}>
              <img src={productData?.imageUrls[0].base_url} className={styles.image}/>
              <div className={styles.left_comp}>
                  <div className={styles.comp1}>
                      <p>{productData?.productName}</p>
                      <p>Số lượng:</p>
                      <input 
                            className={styles.input} 
                            value={itemCount}
                            type="text" 
                            onChange={handleChange}
                            onBlur={()=>{
                                updateCartItem({cartItemsId:cartId, quantity: itemCount}).then(res => {
                                handle();
                              console.log(res);
                            });
                            }}
                        />
                      {/* <p>Số lượng: {itemCount}</p> */}
                  </div>
                  
                  <div className={styles.count} style={{marginTop:'50px'}}>
                    <ButtonGroup>
                      <Button
                        onClick={() => {
                          setItemCount(Math.max(itemCount - 1, 1));
                          updateCartItem({cartItemsId:cartId, quantity: Math.max(itemCount - 1, 1)}).then(res => {
                              // handle();
                            // console.log(res);
                          });
                        }}
                      >
                        {"-"}
                      </Button>
                      <Button
                        onClick={() => {
                          setItemCount(itemCount + 1);
                          updateCartItem({cartItemsId:cartId, quantity: itemCount+1}).then(res => {
                              handle();
                            // console.log(res);
                          });
                        }}
                      >
                        {"+"}
                      </Button>
                    </ButtonGroup>
                  </div>
                  <div className={styles.comp2}>
                          <Button  variant="outlined"  className={styles.last}
                            onClick={() => {
                              deleteCartItem(cartId).then(res => {
                                handle(); 
                                window.location.reload();
                                console.log(res);
                              })
                            }}
                          >Xóa</Button>
                          <p className={styles.product_price}>{Number(productData?.price) * itemCount}</p>  
                  </div>
              </div>
            </div>
          </div>

      </div>
    )
}

export default OrderItem
