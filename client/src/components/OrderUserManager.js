import Header from './header';
import Footer from './footer';
import styles from '../screens/CSS/home.module.css';
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
import OrderUserItem from './OrderUserItem';
import styleOrderUser from '../screens/CSS/orderUserItem.module.css'
import noImage from '../assets/noItem.png'
import { CardContent } from '@mui/material';

function TabPanel(props) {
    const { children, value, index, productOrders, ...other } = props;

    const orderId = [
      {id: 1, status:"Cho xac nhan"},
      {id: 2, status:"Cho lay hang"},
      {id: 3, status:"Dang giao"},
      {id: 4, status:"Da giao"},
      {id: 5, status:"Da huy"}
    ]
    var listOrder = productOrders.filter((productOrder) => (value === productOrder.id || value === 0))
    return (
      <div>
        {value === index && (
            listOrder.length > 0 ? listOrder.map((productOrder) => {
              return(
                <div>
                    <OrderUserItem 
                      productOrder={productOrder}
                    />
                </div>
              )
            }) : <div className={styleOrderUser.noProduct}>
                  <Card sx={{ maxWidth: 200 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        image={noImage}
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                            Không có đơn hàng
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
        )}
      </div>
    );
  }

function OrderUserManager({navigation}){
  
  const orders = [
    {id: 2, status: "Chờ lấy hàng", name: "Bộ Sưu Tập Khối Rubik Carbon MoYu Meilong 2x2 3x3 4x4 5x5 Tam Giác 12 Mặt Skewb Square-1 SQ-1 Megaminx Pyranminx Cube", type: "Do choi", count: 3, cost: 30000},
    {id: 2, status: "Chờ lấy hàng", name: "Mô Hình Nendoroid Nino Nakano - Nendoroid 1612 Gotoubun No Hanayome", type: "Mo hinh", count: 1, cost: 300000},
    {id: 4, status: "Đã giao", name: "Mô Hình Nendoroid Nino Nakano - Nendoroid 1612 Gotoubun No Hanayome", type: "Mo hinh", count: 1, cost: 300000},
    {id: 5, status: "Đã hủy", name: "Mô Hình Nendoroid Nino Nakano - Nendoroid 1612 Gotoubun No Hanayome", type: "Mo hinh", count: 1, cost: 300000},
    {id: 1, status: "Chờ xác nhận", name: "Mô Hình Nendoroid Nino Nakano - Nendoroid 1612 Gotoubun No Hanayome", type: "Mo hinh", count: 1, cost: 300000},
  ];
  
  const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return(
        <div className={styles.Home}>
            <Header navigation={navigation}/>
            <div className={styles.content} >
                <div className={styles.wraper}>
                    <p className={styles.tdisplay}> Quản lý đơn hàng </p>
                    <Box
                    sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
                    >
                        <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="secondary tabs example"
                        orientation="vertical"
                        >
                            <Tab value={0} label="Tất cả"/>
                            <Tab value={1} label="Chờ xác nhận" />
                            <Tab value={2} label="Chờ lấy hàng"/>
                            <Tab value={3} label="Đang giao"/>
                            <Tab value={4} label="Đã giao"/>
                            <Tab value={5} label="Đã hủy"/>
                        </Tabs>
                        <TabPanel value={value} index={0} productOrders={orders}>        
                        </TabPanel>
                        <TabPanel value={value} index={1} productOrders={orders}>
                        </TabPanel>
                        <TabPanel value={value} index={2} productOrders={orders}>
                        </TabPanel>
                        <TabPanel value={value} index={3} productOrders={orders}>
                        </TabPanel>
                        <TabPanel value={value} index={4} productOrders={orders}>
                        </TabPanel>
                        <TabPanel value={value} index={5} productOrders={orders}>
                        </TabPanel>
                </Box> 
                </div>
            </div>
            <Footer navigation={navigation}/>
      </div>
    );
}

export default OrderUserManager;