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
            
          <div className={styles.comp1}>
              <div className={styles.displayMoney}>
                  <p className={styles.disTotalPrice}>Tổng số tiền:</p>
                  <p className={styles.totalPrice}>đ 300.000</p>
              </div>

          </div>
            <div >
                <button>Trở lại</button>
                <button>Hoàn thành</button>
            </div>
            <Footer/>
        </div>
        
    )
}

export default Cart;
