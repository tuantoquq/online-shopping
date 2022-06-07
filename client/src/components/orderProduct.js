import ProductItem from "./productItem"
import styles from './CSS/orderProduct.module.css'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';



function OrderProduct(){

    return (
        <div className={styles.content}>
            <p className={styles.customerName}>Nguyễn Văn A</p>
            <div className={styles.listProduct}>
                <ProductItem/>
                <ProductItem/>
            </div>
            <div className={styles.comp1}>
                <div className={styles.displayMoney}>
                    <p className={styles.disTotalPrice}>Tổng số tiền:</p>
                    <p className={styles.totalPrice}>đ 300.000</p>
                </div>

                <div className={styles.comp2}>
                    <Stack spacing={2} direction="row">
                        <Button variant="outlined" color="success">Chi tiết</Button>
                        <Button variant="contained" color="success">Chấp nhận</Button>
                        <Button variant="contained" color="error">Từ chối</Button>
                    </Stack>
                </div>

            </div>

        </div>
    )

}

export default OrderProduct