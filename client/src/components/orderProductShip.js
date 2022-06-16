import ProductItem from "./productItem"
import styles from './CSS/orderProduct.module.css'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';



function OrderProductShip(){

    return (
        <div className={styles.content}>
            <div className={styles.listProduct}>
                <ProductItem/>
                <ProductItem/>
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