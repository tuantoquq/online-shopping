import { Routes, Route, Link } from "react-router-dom";
import Home from "../screens/home";

function RootRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Home />} />
      </Routes>
    )
}


export default RootRoutes