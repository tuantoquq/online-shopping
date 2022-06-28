import Header from "../components/header";
import Footer from "../components/footer";
import styles from "./CSS/orderProductShip.module.css";
import OrderProductShip from '../components/orderProductShip.js';
import { useNavigate } from 'react-router-dom';
import {getCustomerProfile} from '../service/CustomerService.js';
import {useState, useEffect} from 'react';
function Checkout() {
    const navigate = useNavigate();
    const navigatePath = function (path) {
        if (window.location.pathname !== path) {
        navigate(path);
        }
    };
    const [user, setUser] = useState();
    useEffect(() => {
        getCustomerProfile().then(
            res => {
                console.log(res?.data?.data);
                setUser(res?.data?.data);
            }
        ).catch(err => {
            console.log(err);
        });

    }, []);
    return(
        
        <div >
            <Header/> 
            <div >
                <div className="container">
                    <h1 >Thanh toán</h1> 
                </div>
                <div className={styles.content}>
                    <h3>Địa chỉ nhận hàng</h3> 
                    <div className={styles.displayaddress}>
                        <div className={styles.disphone}>   
                            <p>{user.firstName +" "+ user.lastName}</p>
                            <p>Số điện thoại: {user.phoneNumber}</p>
                        </div>
                        <div className={styles.disaddress}> Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội</div>
                    </div> 
                </div> 
                       <OrderProductShip></OrderProductShip>
                <div>
                    
                </div>
                <div >
                    <button onClick={()=>navigatePath("/cart")}>Trở lại</button>
                    <button>Hoàn thành</button>
                </div>
            </div>
            <Footer/>
        </div>
        
    )
}

export default Checkout;
