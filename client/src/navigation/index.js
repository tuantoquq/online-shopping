import { Routes, Route} from "react-router-dom";
import Home from "../screens/home";
import Login from "../screens/login";

function RootRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user/login" element={<Login role="user" />} />
            <Route path="/seller/login" element={<Login role="seller" />} />
            <Route path="/admin/login" element={<Login role="admin" />} />


      </Routes>
    )
}


export default RootRoutes