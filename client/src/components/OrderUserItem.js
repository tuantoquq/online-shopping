import Header from './header';
import Footer from './footer';
import styles from '../screens/CSS/home.module.css';
import styleOrderUser from '../screens/CSS/orderUserItem.module.css'
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { Tabs, AppBar } from '@mui/material';
import { Typography } from '@mui/material';
import ProductInformation from './product';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import stylesProduct from '../screens/CSS/productInfor.module.css';
import imageTest from '../assets/testproduct.jpg'
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

function ButtonOrder({post, st}){
    const navigate = useNavigate();
    const navigatePath = function (path) {
        if (window.location.pathname !== path) {
          navigate(path);
        }
      };
    return (
        <div >
            {post.map((p) => {
                return(
                    <div >
                        {p.status === st && (
                            <div className={clsx(stylesProduct.soldInfo, stylesProduct.button2)}>
                                <div className={stylesProduct.tap}>
                                    <Button variant="outlined" onClick={() => navigatePath("/cart")}> {p.button1} </Button>                                
                                </div>          
                                 
                                {p.button2 === "Đánh giá shop" && (
                                    <div className={stylesProduct.tap}>
                                        <Button variant="outlined" onClick={() => navigatePath("/TestShop")}> {p.button2} </Button>                  
                                    </div>       
                                )}
                            </div>
                        )}
                    </div>
                )
            })
        }
        </div>
      );

}

function OrderUserItem({productOrder}){
    const posts = [
        {status: "Chờ xác nhận", button1: "Huỷ đơn hàng", button2: ""},
        {status: "Chờ lấy hàng", button1: "Huỷ đơn hàng", button2: ""},
        {status: "Đang giao", button1: "Huỷ đơn hàng", button2: ""},
        {status: "Đã giao", button1: "Mua lại", button2: "Đánh giá shop"},
        {status: "Đã hủy", button1: "Mua lại", button2: ""}
      ];
    return(
        <div className={styleOrderUser.Home}>
            <div className={styleOrderUser.content} >
                <div className={styleOrderUser.wraper}>
                    <div className={styleOrderUser.tdisplay}>  
                        <Link to='/testShop' >
                            <h2>
                                Shop Mo Hinh
                            </h2>
                        </Link> 
                        <h3 className={styleOrderUser.statusTitle}> {productOrder.status} </h3>
                    </div>
                    <div className={styleOrderUser.productImage}>
                        <Link to="/ProductTest">
                            <div className="image">
                                <Card sx={{ maxWidth: 80, minWidth: 80 }}>
                                    <CardActionArea>
                                        <CardMedia
                                        component="img"
                                        image={imageTest}
                                        alt="green iguana"
                                        />
                                    </CardActionArea>
                                </Card>
                            </div>                        
                        </Link>
                        
                        <div className={styleOrderUser.productTitle}>
                            <h5> 
                                {productOrder.name}
                            </h5>
                            <h5 className={styleOrderUser.item}> Loại hàng: {productOrder.type} </h5>
                            <h5 className={styleOrderUser.item}> Số lượng: {productOrder.count} </h5>
                        </div>
                        <div className={styleOrderUser.moneyItem}>
                            {productOrder.cost}
                        </div>
                        <div className={styleOrderUser.footFake}>
                            <p>  </p>
                        </div>
                    </div>
                    <div className={styleOrderUser.button}>
                        <h2>
                            Tổng tiền: {productOrder.cost * productOrder.count}
                        </h2>
                    </div>
                    <div className={styleOrderUser.button}>
                        <ButtonOrder post = {posts} st = {productOrder.status} />                
                    </div>
                    <div className={stylesProduct.footFake}>
                            <p>  </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderUserItem;