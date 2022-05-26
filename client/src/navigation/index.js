import { Routes, Route, Link } from "react-router-dom";
import Home from "../screens/home";
import UserInformation from "../screens/UserInformation";
function RootRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user-infomation" element={<UserInformation />} />
      </Routes>
    )
}


export default RootRoutes