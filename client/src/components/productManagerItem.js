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

function ProductManagerItem({productItem}){
    return(
        <div className={styleOrderUser.Home}>
            <div className={styleOrderUser.content} >
                <div className={styleOrderUser.wraper}>
                    <div className={styleOrderUser.tdisplay}>  
                        <h3 className={styleOrderUser.statusTitle}> {productItem.id} </h3>
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
                                {productItem.name}
                            </h5>
                            <h5 className={styleOrderUser.item}> Loai hang: {productItem.type} </h5>
                            <h5 className={styleOrderUser.item}> So luong: {productItem.count} </h5>
                        </div>
                        <div className={styleOrderUser.moneyItem}>
                            {productItem.cost}
                        </div>
                        <div className={styleOrderUser.footFake}>
                            <p>  </p>
                        </div>
                    </div>
                    <div className={stylesProduct.footFake}>
                            <p>  </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductManagerItem;