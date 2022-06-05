import Header from "../components/header";
import Footer from "../components/footer";
import OrderItem from "../components/OrderItem";
import styles from "./CSS/cart.module.css";
function Cart() {
    return(
        
        <div >
            <Header/> 
            <div className="container">
                <h3 >Giỏ hàng</h3> 
            </div>       
            <div className={styles.all}>
                <OrderItem/>
                <OrderItem/>
            </div>
            <div className={styles.totalprice}>Tổng giỏ hàng</div>
            <div >
                <button>Trở lại</button>
                <button>Hoàn thành</button>
            </div>
            <Footer/>
        </div>
        
    )
}

export default Cart;
