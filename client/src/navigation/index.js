import { Routes, Route, Link } from "react-router-dom";
import Home from "../screens/home";
import CommentProduct from "../screens/commentProduct";
import AcceptOrder from "../screens/seller_acceptOrder";

function RootRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/comment" element={<CommentProduct />} />
            <Route path="/seller/accept-order" element={<AcceptOrder />} />
      </Routes>
    )
}


export default RootRoutes