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
import { Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import ButtonChangeValue from './buttonChangeValue';
import UserRating from './userRating';
import LinkToProduct from './inforProduct';

function ButtonOrder({post, st}){
    return (
        <div >
            {post.map((p) => {
                return(
                    <div >
                        {p.status === st && (
                            <div className={stylesProduct.soldInfo}>           
                                <button className={stylesProduct.button2}> {p.button1} </button>
                                {p.button2 === "Danh gia shop" && (
                                    <Link to="/TestShop">
                                        <button className={stylesProduct.button2}> {p.button2} </button>
                                    </Link>
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
        {status: "Cho lay hang", button1: "Huy don hang", button2: ""},
        {status: "Da xac nhan", button1: "Huy don hang", button2: ""},
        {status: "Dang giao", button1: "Huy don hang", button2: ""},
        {status: "Da giao", button1: "Mua Lai", button2: "Danh gia shop"},
        {status: "Da huy", button1: "Mua Lai", button2: ""}
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
                            <h5 className={styleOrderUser.item}> Loai hang: {productOrder.type} </h5>
                            <h5 className={styleOrderUser.item}> So luong: {productOrder.count} </h5>
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
                            Tong tien: {productOrder.cost * productOrder.count}
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