import styles from './CSS/listOrderedItem.module.css'
import { Button, CardActionArea, ButtonGroup } from '@mui/material';
import {useState} from 'react';
import clsx from 'clsx'
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
    const [itemCount, setItemCount] = useState(1);
    return (
      <div className={styles.content}>
      
          <div className={styles.listProduct}>
          <div className={clsx(styles.all,styles.elm1)}>
                  <img src='assets/laptop.jpg' className={styles.image}/>
                  <div className={styles.left_comp}>
                      <div className={styles.comp1}>
                          <p>Laptop Dell</p>
                          <p>Phân loại hàng: laptop Gaming</p>
                          <p>Số lượng: {itemCount}</p>
                      </div>
                      
                      <div className={styles.count}>
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
                      </div>
                      <div className={styles.comp2}>
                              <Button className={styles.last}>Xóa</Button>
                              <p className={styles.product_price}>{150000 *itemCount}</p>  
                      </div>
                  </div>
              </div>
          </div>

      </div>
    )
}

export default OrderItem
