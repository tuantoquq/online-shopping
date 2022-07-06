import styles from './CSS/listOrderedItem.module.css'
import { Button, CardActionArea } from '@mui/material';
import { styled } from '@mui/material/styles';
import {useState} from 'react';
import OrderProduct from './orderProduct';
function Single_Ordered() {
    const [item, setItem] = useState({
        name: 'tên sản phẩm',
        quantity: 'số lượng',
        price: 'đơn giá',
        image: 'assets/sanpham.jpg'
    });
    return(
        <div className={styles.container}>
        <img
            src= {item.image}
            alt="Item_image"
            border="0"
            height={150}
        ></img>
        <p className={styles.middle}>
            {item.name} <br />
            <br></br>
            {item.quantity} <br />
        </p>
        <p className={styles.last}> {item.price}</p>
        <p className={styles.footer}>Tổng tiền</p>
        <Button className={styles.button}>Mua lại</Button>
    </div>
    )
}
function ListOrderedItem(){
    
    return (
    <div>
        <div>
            <h2 className={styles.alignleft}> Đơn hàng </h2>
            <Button className={styles.alignright}>Mua lại</Button>
        </div>
        <div className={styles.clear}></div>
        <OrderProduct/>
        {/* <Single_Ordered/>
        <p className={styles.totalprice}>Tổng đơn hàng</p> */}
    </div>
    )
}

export default ListOrderedItem