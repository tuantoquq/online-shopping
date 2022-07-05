import React from "react";
import ProductItem from "./productItem"
import styles from './CSS/orderProduct.module.css'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



function OrderProduct(props) {
    const type = props?.type
    const listOrder = props?.data
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={styles.content}>
            {
                listOrder?.map((item, index) => {
                    return <div key={index}>
                        <div className={styles.displayInfo}>
                            <p className={styles.customerName}>{item?.receiverName}</p>
                            {type === 0 &&
                                <p className={styles.infor}>Chờ xác nhận</p>

                            }
                            {type === 1 &&
                                <p className={styles.infor}>Đơn đang giao</p>

                            }
                            {type === 2 &&
                                <p className={styles.infor}>Đã giao</p>

                            }
                            {type === 3 &&
                                <p className={styles.infor}>Đơn từ chối</p>

                            }
                        </div>


                        <div className={styles.listProduct}>
                            <ProductItem data={item}/>
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
                                        <Button variant="contained" color="error" onClick={handleClickOpen}>Từ chối</Button>
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

                        <Dialog open={open} onClose={handleClose} fullWidth='sm'>
                            <DialogTitle>Từ chối đơn hàng</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Lý do từ chối
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Reason"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="error">Huỷ bỏ</Button>
                                <Button onClick={handleClose}>Xác nhận</Button>
                            </DialogActions>
                        </Dialog>

                    </div>

                })
            }


        </div>
    )

}

export default OrderProduct