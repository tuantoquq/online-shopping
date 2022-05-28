import Header from "../components/header";
import Footer from "../components/footer";
import ListOrderedItem from "../components/listOrderedItem";
function OrderHistory() {
    return(
        
        <div>
            <Header/> 
            <div className="container">
                <h3 >Lịch sử mua hàng</h3> 
            </div>       
            <ListOrderedItem/>
            <ListOrderedItem/>
            <ListOrderedItem/>
            <div >
                <button>Trở lại</button>
                <button>Hoàn thành</button>
            </div>
            <Footer/>
        </div>
        
    )
}

export default OrderHistory;
