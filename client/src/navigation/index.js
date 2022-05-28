import { Routes, Route, Link } from "react-router-dom";
import Home from "../screens/home";
import CommentProduct from "../screens/commentProduct";
import UserInformation from "../screens/UserInformation";
import OrderHistory from "../screens/OrderHistory";
function RootRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/comment" element={<CommentProduct />} />
            <Route path="/user" element={<UserInformation />} />
            <Route path="/orderhistory" element={<OrderHistory />} />
      </Routes>
    )
}


export default RootRoutes