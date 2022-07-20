import Header from '../components/header';
import Footer from '../components/footer';
import OrderItem from '../components/OrderItem';
import styles from './CSS/cart.module.css';
import { useState, useEffect } from 'react';
import { getCartItem } from '../service/CustomerService';
import axiosConfig from '../config/axios';
import { useNavigate, Navigate } from 'react-router-dom';
import TokenService from '../service/TokenService';
import RoleService from '../service/RoleService';
import { Button } from '@mui/material';

function Cart({ navigation }) {
  const navigate = useNavigate();
  const navigatePath = function (path) {
    if (window.location.pathname !== path) {
      navigate(path);
    }
  };
  const [cartItem, setCartItem] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [price, setPrice] = useState();
  const [change, setChange] = useState(0);
  const [isEmpty, setIsEmpty] = useState(false);
  function getChange() {
    setChange(change + 1);
  }
  useEffect(()=>{
    if(cartItem.length === 0){setIsEmpty(true); console.log('empty')}
    else{setIsEmpty(false); console.log('not empty')}
  },[cartItem])
  useEffect(() => {
    getCartItem()
      .then((res) => {
        // console.log(res?.data?.data);
        setCartItem(res.data.data);
        const list_id = res.data.data.map((item) => item.productId);
        const list_count = res.data.data.map((item) => item.count);
        let total = 0;
        for (let i = 0; i < list_id.length; i++) {
          let path = `/product/get?productId=${list_id[i]}`;
          axiosConfig
            .get(path)
            .then((res) => {
              let price = res?.data?.data?.price;
              total += price * parseInt(list_count[i]);
              setTotalPrice(total);
              // console.log('total:',total);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [change]);

  const accessToken = TokenService.getLocalAccessToken(
    RoleService.getLocalRole()
  );
  if (!accessToken) {
    return <Navigate to="/customer/login"></Navigate>;
  }
  if (accessToken) {
    if (RoleService.getLocalRole() === 'shopper') {
      return <Navigate to="/shopper/accept-order"></Navigate>;
    }
    if (RoleService.getLocalRole() === 'admin') {
      return <Navigate to="/admin"></Navigate>;
    }
    if (RoleService.getLocalRole() === 'customer') {
      return (
        // console.log(numberProduct),
        <div>
          <Header navigation={navigation}/>
          <div>
            <div className='container' style={{marginLeft:'10%'}}>
              <h1>Giỏ hàng</h1>
            </div>
            <div>
              {cartItem.map((item, index) => {
                return (
                  <OrderItem
                    productId={item.productId}
                    quantity={item.count}
                    cartId={item._id}
                    key={index}
                    handle={getChange}
                  />
                );
              })}
          {!isEmpty && (<div>
            <div className={styles.comp1}>
              <div className={styles.displayMoney}>
                <p className={styles.disTotalPrice}>Tổng số tiền:</p>
                <p className={styles.totalPrice}>
                  {' '}
                  {cartItem != 0 ? totalPrice : 0}
                </p>
              </div>
            </div>
            <div style={{marginLeft:'10%', marginBottom:'10px'}}>
              <button
                onClick={() => {
                  if (cartItem.length > 0) {
                    navigatePath('/');
                  }
                }}
              >Trở lại</button>
              <button
                onClick={() => {
                  if (cartItem.length > 0) {
                    navigatePath('/user/checkout');
                  }
                }}
              >
                Thanh toán
              </button>
            </div>
          </div>)}
          {isEmpty && (
          <div>
            <div className={styles.container}>
              <p className={styles.text}> Không có sản phẩm nào trong giỏ hàng</p>
              <Button
                className={styles.center}
                onClick={() => {
                  navigatePath('/');
                }}
              >Tiếp tục mua sắm</Button>         
            </div>
            <div className={styles.footer}>
              <Footer navigation={navigation}/>
            </div>
          </div>
          )}
          </div>
          </div>
          {!isEmpty && (
          <div >
            <Footer navigation={navigation}/>
          </div>)}
        </div>
      );
    }
  }
}

export default Cart;
