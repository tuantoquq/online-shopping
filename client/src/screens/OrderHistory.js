import Header from "../components/header";
import Footer from "../components/footer";
import ListOrderedItem from "../components/listOrderedItem";
import styles from "./CSS/orderhistory.module.css";
function OrderHistory() {
    return(
        
        <div >
            <Header/> 
            <div className="container">
                <h3 >Lịch sử mua hàng</h3> 
            </div>       
            <div className={styles.all}>
                <ListOrderedItem className={styles.space}/>
                <ListOrderedItem/>
            </div>
            <div >
                <button>Trở lại</button>
                <button>Hoàn thành</button>
            </div>
            <Footer/>
        </div>
        
    )
}

export default OrderHistory;
