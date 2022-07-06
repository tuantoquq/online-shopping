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
import imageTest from '../assets/testproduct.jpg';
import { Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import ButtonChangeValue from './buttonChangeValue';
import UserRating from './userRating';
import OrderUserItem from './OrderUserItem';
import styleOrderUser from '../screens/CSS/orderUserItem.module.css';
import noImage from '../assets/noItem.png';
import { CardContent } from '@mui/material';
import { useEffect, useState } from 'react';
import axiosConfig from '../config/axios';
import { getOrderHistory } from '../service/CustomerService';
import Grid from '@mui/material/Grid';
import { Navigate } from 'react-router-dom';
import TokenService from '../service/TokenService';
import RoleService from '../service/RoleService';

function TabPanel(props) {
  const { children, value, index, productOrders, ...other } = props;

  const orderId = [
    { id: 0, status: 'Chờ xác nhận' },
    { id: 1, status: 'Chờ lấy hàng' },
    { id: 2, status: 'Đã giao' },
    { id: -1, status: 'Bị từ chối' },
    { id: -2, status: 'Đã huỷ' },
  ];

  var listOrder = productOrders?.filter(
    (productOrder) => value === productOrder?.orderStatus || value === -3
  );
  return (
    <div>
      {value === index &&
        (listOrder?.length > 0 ? (
          listOrder.map((productOrder) => {
            return (
              <div>
                <OrderUserItem
                  productOrder={productOrder?.orderProduct}
                  status={orderId.find(
                    (st) => st.id === productOrder?.orderStatus
                  )}
                />
              </div>
            );
          })
        ) : (
          <div className={styleOrderUser.noProduct}>
            <Card sx={{ maxWidth: 300 }}>
              <CardActionArea>
                <CardMedia component="img" image={noImage} alt="green iguana" />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    Không có đơn hàng
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        ))}
    </div>
  );
}

function OrderUserManager({ navigation }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [orderData, setOrderData] = useState();

  useEffect(() => {
    getOrderHistory()
      .then((res) => {
        setOrderData(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const accessToken = TokenService.getLocalAccessToken(
    RoleService.getLocalRole()
  );
  if (!accessToken) {
    return <Navigate to="/customer/login"></Navigate>;
  }
  if (accessToken) {
    if (RoleService.getLocalRole() === 'shopper') {
      return <Navigate to="/shopper/accept-order"></Navigate>;
    }
    if (RoleService.getLocalRole() === 'admin') {
      return <Navigate to="/admin"></Navigate>;
    }
    if (RoleService.getLocalRole() === 'customer') {
      return (
        <div className={styles.Home}>
          <Header navigation={navigation} />
          <div className={styles.content}>
            <div className={styles.wraper}>
              <p className={styles.tdisplay}> Quản lý đơn hàng </p>
              <Box
                sx={{
                  flexGrow: 1,
                  bgcolor: 'background.paper',
                  display: 'flex',
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={2}>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      textColor="secondary"
                      indicatorColor="secondary"
                      aria-label="secondary tabs example"
                      orientation="vertical"
                    >
                      <Tab value={-3} label="Tất cả" />
                      <Tab value={0} label="Chờ xác nhận" />
                      <Tab value={1} label="Chờ lấy hàng" />
                      <Tab value={2} label="Đã giao" />
                      <Tab value={-1} label="Bị từ chối" />
                      <Tab value={-2} label="Đã hủy" />
                    </Tabs>
                  </Grid>
                  <Grid item xs={10}>
                    <TabPanel
                      value={value}
                      index={-2}
                      productOrders={orderData}
                    ></TabPanel>
                    <TabPanel
                      value={value}
                      index={0}
                      productOrders={orderData}
                    ></TabPanel>
                    <TabPanel
                      value={value}
                      index={1}
                      productOrders={orderData}
                    ></TabPanel>
                    <TabPanel
                      value={value}
                      index={2}
                      productOrders={orderData}
                    ></TabPanel>
                    <TabPanel
                      value={value}
                      index={-1}
                      productOrders={orderData}
                    ></TabPanel>
                  </Grid>
                </Grid>
              </Box>
            </div>
          </div>
          <Footer navigation={navigation} />
        </div>
      );
    }
  }
}

export default OrderUserManager;
