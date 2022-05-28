import Header from "../components/header";
import Footer from "../components/footer";
import CommentItem from "../components/commentItem";
import li_Item from "../components/listOrderedItem";
function OrderHistory() {
    return(
        
        <div>
            <Header/> 
            <li_Item/>
            <CommentItem/>
            <div >
                <button>Trở lại</button>
                <button>Hoàn thành</button>
            </div>
            <Footer/>
        </div>
        
    )
}

export default OrderHistory;
