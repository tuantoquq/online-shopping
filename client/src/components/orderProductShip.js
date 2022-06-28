import ProductItem from "./productItem"
import styles from './CSS/orderProduct.module.css'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {useEffect, useState} from 'react';
import {getCartItem} from "../service/CustomerService";

function OrderProductShip(){
    const [cartItem, setCartItem] = useState([]);
    const [totalPrice, setTotalPrice] = useState();
    useEffect(() => {
        getCartItem().then(
            res => {
                console.log(res?.data);
                setCartItem(res?.data?.data);
            }
        ).catch(err => {
            console.log(err);
        });

    }, []);
    return (
        <div className={styles.content}>
            <div className={styles.listProduct}>
            <div>
            {
                cartItem.map(item => {
                    return <ProductItem productId={item.productId} quantity={item.count} />
                })
            }
            </div>
            </div>
            <div className={styles.comp1}>
            <div className={styles.displayMoney}>
                    <p className={styles.disTotalPrice}>Chi phí vận chuyển:</p>
                    <p className={styles.totalPrice}>đ 10.000</p>
                </div>
                <div className={styles.displayMoney}>
                    <p className={styles.disTotalPrice}>Tổng số tiền:</p>
                    <p className={styles.totalPrice}>đ 310.000</p>
                </div>

                <div className={styles.comp3}>
                    <Stack spacing={2} direction="row">
                        <Button variant="outlined" color="success">Chi tiết</Button>
                    </Stack>
                </div>
            

            </div>

        </div>
    )

}

export default OrderProductShip