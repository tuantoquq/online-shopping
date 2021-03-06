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
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { addCartItem } from '../service/CustomerService';
import { cancelOrder } from '../service/CustomerService';

function ButtonOrder({ post, st ,productOrder, orderId}) {
    const navigate = useNavigate();
    const navigatePath = function (path) {
        if (window.location.pathname !== path) {
            navigate(path);
        }
    };
    const handleCanleOrder = () => {
        try {
            cancelOrder(orderId).then(res =>{
            }
            ).catch(err => {
              console.log(err);
            });
          } catch (err) {
            if (!err?.response) {
            } else {
              console.log(err);
            }
          }
          window.location.reload()
    }

    return (
        <div >
            {post.map((p,index) => {
                return (
                    <div key={index}>
                        {p.status === st && (
                            <div className={clsx(stylesProduct.soldInfo, stylesProduct.button2)}>
                                <div className={stylesProduct.tap}>
                                    {/* <Button variant="outlined" onClick={() => {
                                        productOrder.map(item => {
                                            addCartItem({productId: item.productId, quantity: item.count});
                                        })
                                        navigatePath("/cart")
                                        }}> {p.button1} </Button> */}
                                    {p.button1 === "Mua l???i" && (<Button variant="outlined" onClick={() => {
                                        productOrder.map(item => {
                                            addCartItem({productId: item.productId, quantity: item.count});
                                        })
                                        navigatePath("/cart")
                                        }}> {p.button1} </Button>)}
                                    {p.button1 === "Hu??? ????n h??ng" && (<Button variant="outlined" onClick={handleCanleOrder}> {p.button1} </Button>)}
                                </div>

                                {p.button2 === "????nh gi?? shop" && (
                                    <div className={stylesProduct.tap}>
                                        <Button variant="outlined" onClick={()=> navigate('/comment',{state:{id:productOrder}})}> 
                                        {p.button2} </Button>
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

function OrderUserItem({ productOrder, status,  reasonReject}) {
    const posts = [
        { status: "Ch??? x??c nh???n", button1: "Hu??? ????n h??ng", button2: "" },
        { status: "Ch??? l???y h??ng", button1: "Hu??? ????n h??ng", button2: "" },
        { status: "???? giao", button1: "Mua l???i", button2: "????nh gi?? shop" },
        { status: "B??? t??? ch???i", button1: "Mua l???i", button2: "" },
        { status: "???? hu???", button1: "Mua l???i", button2: "" }
    ];
    return (
        <div className={styleOrderUser.Home}>
            <div className={styleOrderUser.content} >
                <div className={styleOrderUser.wraper}>
                    <div className={styleOrderUser.tdisplay}>
                        <div>
                            <h3 className={styleOrderUser.statusTitle}> {status.status} </h3>
                            {status.status === "B??? t??? ch???i" &&(<h3> L?? do: {reasonReject} </h3>)}                            
                        </div>

                    </div>
                    {productOrder.map((order) => {
                        return (
                            <div className={styleOrderUser.productImage}>
                                <Link to={"/product/" + order?.productId}>
                                    <div className="image">
                                        <Card sx={{ maxWidth: 80, minWidth: 80 }}>
                                            <CardActionArea>
                                                <CardMedia
                                                    component="img"
                                                    image={order?.productImageUrl}
                                                    alt="green iguana"
                                                />
                                            </CardActionArea>
                                        </Card>
                                    </div>
                                </Link>

                                <div className={styleOrderUser.productTitle}>
                                    <h5>
                                        {order?.productName}
                                    </h5>
                                    {/* <h5 className={styleOrderUser.item}> Lo???i h??ng: {productOrder.type} </h5> */}
                                    <h5 className={styleOrderUser.item}> S??? l?????ng: {order?.count} </h5>
                                </div>
                                <div className={styleOrderUser.moneyItem}>
                                    {order?.currentPrice}
                                </div>
                                <div className={styleOrderUser.footFake}>
                                    <p>  </p>
                                </div>
                            </div>
                        )
                    })}
                    <div className={styleOrderUser.button}>
                        <h2>
                            T???ng ti???n: {productOrder?.map(item => item.currentPrice).reduce((pre, curr) => pre + curr, 0)}
                        </h2>
                    </div>
                    <div className={styleOrderUser.button}>
                        <ButtonOrder post={posts} st={status.status} productOrder={productOrder} orderId={productOrder[0]?.orderId}/>
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