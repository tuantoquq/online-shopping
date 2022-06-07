import ProductItem from "./productItem"
import styles from './CSS/orderProduct.module.css'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';



function OrderProduct({type}){

    return (
        <div className={styles.content}>
            {
                type === 0 &&
                <div className={styles.displayInfo}>
                    <p className={styles.customerName}>Nguyễn Văn A</p>
                    <p className={styles.infor}>Chờ xác nhận</p>
                </div>
            }
            {
                type === 1 &&
                <div className={styles.displayInfo}>
                    <p className={styles.customerName}>Nguyễn Văn A</p>
                    <p className={styles.infor}>Đơn đang giao</p>
                </div>
            }
            {
                type === 2 &&
                <div className={styles.displayInfo}>
                    <p className={styles.customerName}>Nguyễn Văn A</p>
                    <p className={styles.infor}>Đã giao</p>
                </div>
            }
            {
                type === 3 &&
                <div className={styles.displayInfo}>
                    <p className={styles.customerName}>Nguyễn Văn A</p>
                    <p className={styles.infor}>Đơn từ chối</p>
                </div>
            }

            <div className={styles.listProduct}>
                <ProductItem/>
                <ProductItem/>
            </div>
            <div className={styles.comp1}>
                <div className={styles.displayMoney}>
                    <p className={styles.disTotalPrice}>Tổng số tiền:</p>
                    <p className={styles.totalPrice}>đ 300.000</p>
                </div>

                {
                    type === 0 &&
                    <div className={styles.comp2}>
                        <Stack spacing={2} direction="row">
                            <Button variant="outlined" color="success">Chi tiết</Button>
                            <Button variant="contained" color="success">Chấp nhận</Button>
                            <Button variant="contained" color="error">Từ chối</Button>
                        </Stack>
                    </div>
                }


                {
                    type !== 0 &&
                    <div className={styles.comp3}>
                        <Stack spacing={2} direction="row">
                            <Button variant="outlined" color="success">Chi tiết</Button>
                        </Stack>
                    </div>
                }   

            </div>

        </div>
    )

}

export default OrderProduct