import ProductItem from "./productItem"
import styles from './CSS/orderProduct.module.css'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {useEffect, useState} from 'react';
import {getCartItem} from "../service/CustomerService";
import axiosConfig from '../config/axios';
function OrderProductShip(){
    const [cartItem, setCartItem] = useState([]);
    const [totalPrice, setTotalPrice] = useState();
    const [price, setPrice] = useState();
    function getItemPrice(productId) {
        let path = `/product/get?productId=${productId}`;
        axiosConfig.get(path).then(res=>{
            const data = res?.data?.data?.price
            setPrice(data);
            console.log(price)
          })
          .catch(err=>{
            console.log(err)
          })
        // console.log(price)
        return price;
    }
    
    useEffect(() => {
        getCartItem().then(
            res => {
                // console.log(res?.data);
                setCartItem(res?.data?.data);
            }
        )
        .then(()=>{
            let total = 10000;
            for (let i = 0; i < cartItem.length; i++) {
                total += parseInt(getItemPrice(cartItem[i].productId))* parseInt(cartItem[i].count);
                console.log(parseInt(cartItem[i].count));
            }
            setTotalPrice(total);}
        )
        .catch(err => {
            console.log(err);
        });

    }, []);
    // useEffect(() => {
    //     let total = 10000;
    //     for (let i = 0; i < cartItem.length; i++) {
    //         total += parseInt(getItemPrice(cartItem[i].productId))* parseInt(cartItem[i].count);
    //         // console.log(parseInt(cartItem[i].count));
    //     }
    //     setTotalPrice(total);
    // }, [cartItem]);

    return (
        <div className={styles.content}>
            <div className={styles.listProduct}>
            <div>
            {
                cartItem.map((item,index) => {
                    return <ProductItem productId={item.productId} quantity={item.count} key={index}/>
                })
            }
            </div>
            </div>
            <div className={styles.comp1}>
            <div className={styles.displayMoney}>
                    <p className={styles.disTotalPrice}>Chi phí vận chuyển:</p>
                    <p className={styles.totalPrice}>10.000</p>
                </div>
                <div className={styles.displayMoney}>
                    <p className={styles.disTotalPrice}>Tổng số tiền:</p>
                    <p className={styles.totalPrice}>{totalPrice}</p>
                </div>

                {/* <div className={styles.comp3}>
                    <Stack spacing={2} direction="row">
                        <Button variant="outlined" color="success">Chi tiết</Button>
                    </Stack>
                </div> */}
            

            </div>

        </div>
    )

}

export default OrderProductShip