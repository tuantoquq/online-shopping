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
    
    useEffect(() => {
        getCartItem().then(
            res => {
                // console.log(res?.data.data);
                setCartItem(res?.data?.data);
                const list_id  = res.data.data.map(item=>item.productId);
                const list_count = res.data.data.map(item=>item.count);
                let total = 10000;
                for (let i = 0; i < list_id.length; i++) {
                    let path = `/product/get?productId=${list_id[i]}`
                    axiosConfig.get(path).then(res=>{
                        let price = res?.data?.data?.price
                        total += price* parseInt(list_count[i]);
                        setTotalPrice(total);
                        // console.log('total:',total);
                      })
                      .catch(err=>{
                        console.log(err)
                      })
                }
            }
        )
        .catch(err => {
            console.log(err);
        });

    }, []);
    // console.log(cartItem);
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
                    <p className={styles.totalPrice}>{cartItem.length !=0 ? 10000: 0}</p>
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