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
    const [change, setChange] = useState(0);
    function getChange() {setChange(change+1)}
    useEffect(() => {


        getCartItem().then(
            res => {
                // console.log(res?.data?.data);
                setCartItem(res?.data?.data);
                const list_id  = res.data.data.map(item=>item.productId);
                const list_count = res.data.data.map(item=>item.count);
                let total = 0;
                for (let i = 0; i < list_id.length; i++) {
                    let path = `/product/get?productId=${list_id[i]}`
                    axiosConfig.get(path).then(res=>{
                        let price = res?.data?.data?.price
                        total += price* parseInt(list_count[i]);
                        setTotalPrice(total);
                        // console.log('total:',total);
                      })
                      .catch(err=>{
                        console.log(err)
                      })
                }
            }
        )
        .catch(err => {
            console.log(err);
        });

    }, [change]);
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
                                return <OrderItem productId={item.productId} quantity={item.count} cartId={item._id} key = {index} handle={getChange} />
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
                        onClick={() =>navigatePath("/user/checkout")}>Thanh toán</button>
                    </div>
                </div>
            <Footer/>
        </div>
        
    )
}

export default Cart;
