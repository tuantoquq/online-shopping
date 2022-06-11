import Header from "../components/header";
import Footer from "../components/footer";
import ListOrderedItem from "../components/listOrderedItem";
import styles from "./CSS/orderhistory.module.css";

function OrderHistory() {
    return(
        
        <div >
            <Header/> 
            <div >
                <div className="container">
                    <h1 >Lịch sử mua hàng</h1> 
                </div>       
                <div>
                    <ListOrderedItem/>
                    <ListOrderedItem/>
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

export default OrderHistory;
