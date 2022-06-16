import Header from "../components/header";
import Footer from "../components/footer";
import styles from "./CSS/orderProductShip.module.css";
import OrderProductShip from '../components/orderProductShip.js';
function Checkout() {
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
                            <p>Nguyễn Văn A</p>
                            <p>Số điện thoại: 0987654321</p>
                        </div>
                        <div className={styles.disaddress}> Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội</div>
                    </div> 
                </div> 
                       
                <div>
                    <OrderProductShip/>
                </div>
                <div >
                    <button>Trở lại</button>
                    <button>Hoàn thành</button>
                </div>
            </div>
            <Footer/>
        </div>
        
    )
}

export default Checkout;
