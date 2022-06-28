import Header from "../components/header";
import Footer from "../components/footer";
import OrderItem from "../components/OrderItem";
import styles from "./CSS/cart.module.css";
import { useState , useEffect} from "react";
import {getCartItem} from "../service/CustomerService";
import axiosConfig from '../config/axios';
import { useNavigate } from 'react-router-dom';

function getItemPrice(productId) {
    let path = `/product/get?productId=${productId}`;
    let price = 0;
    axiosConfig.get(path).then(res=>{
    price =  res?.data?.data?.price;
        
      })
      .catch(err=>{
        console.log(err)
      })
    //   console.log(price)
    return price;
}
function Cart() {
    const navigate = useNavigate();
    const navigatePath = function (path) {
        if (window.location.pathname !== path) {
        navigate(path);
        }
    };
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
    useEffect(() => {
        let total = 100;
        for (let i = 0; i < cartItem.length; i++) {
            total += parseInt(getItemPrice(cartItem[i].productId))* parseInt(cartItem[i].count);
            // console.log(parseInt(cartItem[i].count));
        }
        setTotalPrice(total);
    }, [cartItem]);
    
    return(
        // console.log(numberProduct),
        <div >
            <Header/> 
                <div>
                    <div className="container" >
                        <h3 >Giỏ hàng</h3> 
                    </div>       
                    <div >
                        {
                            cartItem.map(item => {
                                return <OrderItem productId={item.productId} quantity={item.count} cartId={item._id}/>
                            })
                        }
                    </div>

                    <div className={styles.comp1}>
                        <div className={styles.displayMoney}>
                            <p className={styles.disTotalPrice}>Tổng số tiền:</p>
                            <p className={styles.totalPrice}>{totalPrice}</p>
                        </div>

                    </div>
                    <div >
                        <button>Trở lại</button>
                        <button
                        onClick={() =>navigatePath("/user/checkout")}>Hoàn thành</button>
                    </div>
                </div>
            <Footer/>
        </div>
        
    )
}

export default Cart;
