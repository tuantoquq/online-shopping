import React from "react";
import { Link } from "react-router-dom";

function LinkToProduct({urlProduct, productName}){
    return(
        <div>
            <Link to={`/${urlProduct}`} >{productName}</Link>
        </div>
    )
}

export default LinkToProduct;