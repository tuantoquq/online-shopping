import { Routes, Route, Link } from "react-router-dom";
import Home from "../screens/home";
import CommentProduct from "../screens/commentProduct";

function RootRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/comment" element={<CommentProduct />} />
      </Routes>
    )
}


export default RootRoutes