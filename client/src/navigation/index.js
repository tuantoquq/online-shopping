import { Routes, Route } from "react-router-dom";
import Home from "../screens/home";
import CommentProduct from "../screens/commentProduct";
import ProductInformation from "../components/product";

function RootRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/comment" element={<CommentProduct />} />
            <Route path="/ProductTest" element = {<ProductInformation />} />
      </Routes>
    )
}


export default RootRoutes