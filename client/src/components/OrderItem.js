import styles from './CSS/listOrderedItem.module.css'
import { Button, CardActionArea, ButtonGroup } from '@mui/material';
import { styled } from '@mui/material/styles';
import {useState} from 'react';

function Single_Ordered() {
    const [item, setItem] = useState({
        name: 'tên sản phẩm',
        quantity: 'số lượng',
        price: 'đơn giá',
        image: 'assets/sanpham.jpg'
    });
    const [itemCount, setItemCount] = useState(1);
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
            {item.price} <br />
        </p>
        <p className={styles.quantity}>Số lượng: {itemCount}</p>
        <ButtonGroup>
          <Button
            onClick={() => {
              setItemCount(Math.max(itemCount - 1, 0));
            }}
          >
            {"-"}
          </Button>
          <Button
            onClick={() => {
              setItemCount(itemCount + 1);
            }}
          >
            {"+"}
          </Button>
        </ButtonGroup>
        <p className={styles.footer}>Tổng tiền</p>
        <Button className={styles.last}>Xóa</Button>
    </div>
    )
}
function OrderItem(){
    
    return (
    <div>
        <Single_Ordered/>
    </div>
    )
}

export default OrderItem