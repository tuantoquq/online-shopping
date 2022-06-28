import styles from './CSS/listOrderedItem.module.css'
import { Button, CardActionArea, ButtonGroup } from '@mui/material';
import {useState, useEffect} from 'react';
import clsx from 'clsx'
import axiosConfig from '../config/axios';
import {deleteCartItem, updateCartItem} from '../service/CustomerService';
function OrderItem({productId, quantity, cartId}){
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
    return (
      <div className={styles.content}>
      
          <div className={styles.listProduct}>
          <div className={clsx(styles.all,styles.elm1)}>
                  <img src={productData?.imageUrls[0].base_url} className={styles.image}/>
                  <div className={styles.left_comp}>
                      <div className={styles.comp1}>
                          <p>{productData?.productName}</p>
                          <p>Giá sản phẩm : {productData?.price}</p>
                          <p>Số lượng: {itemCount}</p>
                      </div>
                      
                      <div className={styles.count}>
                        <ButtonGroup>
                          <Button
                            onClick={() => {
                              setItemCount(Math.max(itemCount - 1, 1));
                              updateCartItem({cartItemsId:cartId, quantity: Math.max(itemCount - 1, 1)}).then(res => {
                                console.log(res);
                              });
                            }}
                          >
                            {"-"}
                          </Button>
                          <Button
                            onClick={() => {
                              setItemCount(itemCount + 1);
                              updateCartItem({cartItemsId:cartId, quantity: itemCount+1}).then(res => {
                                console.log(res);
                              });
                            }}
                          >
                            {"+"}
                          </Button>
                        </ButtonGroup>
                      </div>
                      <div className={styles.comp2}>
                              <Button className={styles.last}
                                onClick={() => {
                                  deleteCartItem(cartId).then(res => {
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
