import Header from "../components/header";
import Footer from "../components/footer";
import OrderItem from "../components/OrderItem";
import styles from "./CSS/cart.module.css";
import { useState , useEffect} from "react";
import {getCartItem} from "../service/CustomerService";
import axiosConfig from '../config/axios';
import { useNavigate } from 'react-router-dom';


function Cart() {
    const navigate = useNavigate();
    const navigatePath = function (path) {
        if (window.location.pathname !== path) {
        navigate(path);
        }
    };
    const [cartItem, setCartItem] = useState([]);
    const [totalPrice, setTotalPrice] = useState();
    const [price, setPrice] = useState();
    function getItemPrice(productId) {
        let path = `/product/get?productId=${productId}`;
        axiosConfig.get(path).then(res=>{
            setPrice(res?.data?.data?.price);
            console.log(price)
          })
          .catch(err=>{
            console.log(err)
          })
        console.log(price)
        return price;
    }
    useEffect(() => {
        getCartItem().then(
            res => {
                // console.log(res?.data);
                setCartItem(res?.data?.data);
            }
        ).then(
            ()=>{
            let total = 0;
            for (let i = 0; i < cartItem.length; i++) {
                total += parseInt(getItemPrice(cartItem[i].productId))* parseInt(cartItem[i].count);
                console.log(parseInt(getItemPrice(cartItem[i].productId)));
            }
            setTotalPrice(total);
            }
        )
        .catch(err => {
            console.log(err);
        });

    }, []);
    // useEffect(() => {
    //     let total = 0;
    //     for (let i = 0; i < cartItem.length; i++) {
    //         total += parseInt(getItemPrice(cartItem[i].productId))* parseInt(cartItem[i].count);
    //         // console.log(parseInt(cartItem[i].count));
    //     }
    //     setTotalPrice(total);
    // }, [cartItem]);
    
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
                            cartItem.map((item, index) => {
                                return <OrderItem productId={item.productId} quantity={item.count} cartId={item._id} key = {index}/>
                            })
                        }
                    </div>

                    <div className={styles.comp1}>
                        <div className={styles.displayMoney}>
                            <p className={styles.disTotalPrice}>Tổng số tiền:</p>
                            <p className={styles.totalPrice}> {totalPrice}</p>
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
