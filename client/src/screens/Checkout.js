import Header from '../components/header';
import Footer from '../components/footer';
import styles from './CSS/orderProductShip.module.css';
import OrderProductShip from '../components/orderProductShip.js';
import { useNavigate } from 'react-router-dom';
import {
  deleteCartItem,
  getListAddress,
  addOrder,
  getListCartItems,
} from '../service/CustomerService.js';
import { useState, useEffect } from 'react';
import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import { Navigate } from 'react-router-dom';
import TokenService from '../service/TokenService';
import RoleService from '../service/RoleService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Checkout({ navigation }) {
  const navigate = useNavigate();
  const navigatePath = function (path) {
    if (window.location.pathname !== path) {
      navigate(path);
    }
  };
  const [changed, setChanged] = useState(false);
  const [listCartItems, setListCartItems] = useState([]);
  // const [arrayListItems, setArrayListItems] = useState([]);
  const [address, setAddress] = useState([
    {
      _id: '62baf86842bcf94a55267fab',
      receiverName: 'Nguyễn Hoàng Anh Tuấn',
      phone: '0376180160',
      city: 'Hà Nội',
      district: 'Hoàng Mai',
      ward: 'Định Công',
      details: '245 Định Công',
      createAt: '2022-06-28T12:47:36.241Z',
      updateAt: '2022-06-28T12:47:36.241Z',
      customerId: '62b934fb764ce6b37213b1f0',
    },
  ]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  useEffect(() => {
    getListCartItems()
      .then((res) => {
        // console.log(res?.data?.data);
        // res?.data?.data.map(item=>setListCartItems([...listCartItems, item._id]));
        setListCartItems(res.data.data.map((item) => item._id));
      })

      .catch((err) => {
        console.log(err);
      });
    getListAddress()
      .then((res) => {
        // console.log(res?.data?.data);
        setAddress(res?.data?.data);
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
        <div>
          <Header navigation={navigation}/>
          <div>
            <div className="container" style={{marginLeft:'10%',marginRight:'10%'}}>
              <h1>Thanh toán</h1>
            </div>
            <div className={styles.content}>
              <h3>Địa chỉ nhận hàng</h3>
              <div className={styles.displayaddress}>
                {!changed && (
                  <div className={styles.disphone}>
                    <p>
                      {address[0]?.receiverName === null
                        ? 'Nguyễn Văn A (0987654321)'
                        : address[0]?.receiverName +
                          ' ( ' +
                          address[0]?.phone +
                          ') :    ' +
                          address[0]?.details +
                          ', ' +
                          address[0]?.ward +
                          ', ' +
                          address[0]?.district +
                          ', ' +
                          address[0]?.city}
                    </p>
                  </div>
                )}
                <div className={styles.change_button}>
                  <Button onClick={() => navigatePath('/user/address')}>
                    Thay đổi
                  </Button>

                  {/* {changed&&
                                address.map(item=>{ 
                                return <div className={styles.disphone}>   
                                        <p>{address[0]?.receiverName === null ? 'Nguyễn Văn A (0987654321)': address[0]?.receiverName + " ( " + address[0]?.phone + ") :    " + address[0]?.details + ", " + address[0]?.ward+", " + address[0]?.district + ", " + address[0]?.city }</p>
                                    </div>
                                })
                            } */}
                </div>
              </div>
            </div >
            <OrderProductShip></OrderProductShip>
            <div></div>
            <div style={{marginLeft:'10%',marginRight:'10%', marginBottom:'10px'}}>
              <Button variant="contained" style={{marginLeft:'950px', marginTop:'10px'}}
              onClick={() => navigatePath('/cart')}>
                Trở lại
              </Button>
              <Button variant="contained" style={{marginLeft:'10px',marginTop:'10px'}}
                onClick={() => {
                  setTimeout(() => navigate('/user/orderManager'), 3000);
                  if (listCartItems != 0) {
                    // console.log(listCartItems);
                    addOrder({
                      addressId: address[0]._id,
                      listCartItems: listCartItems,
                    }).then((res) => {
                      // console.log(res?.data);
                      toast.success("Đặt hàng thành công!");
                    });
                  }
                }}
              >
                Đặt Hàng
              </Button>
            </div>
          </div>
          <div>
            <Footer navigation={navigation}/>
          </div>
          <ToastContainer />
        </div>
      );
    }
  }
}

export default Checkout;
