import Header from '../components/header';
import Footer from '../components/footer';
import styles from './CSS/seller_acceptOrder.module.css';
import InformationTab from '../components/informationTab';
import Search from '../components/search';
import OrderProduct from '../components/orderProduct';
import { Navigate } from 'react-router-dom';
import TokenService from '../service/TokenService';
import RoleService from '../service/RoleService';
import { useEffect, useState } from 'react';
import { getOrder } from '../service/ShopperService';

function AcceptOrder({ navigation }) {
  const [data,setData] = useState([])
  useEffect(()=>{
    getOrder(0)
    .then(res =>{
      setData(res.data.data)
      console.log(res.data.data)
    })
    .catch(err => console.log(err))

  },[])
  console.log(data)

  const accessToken = TokenService.getLocalAccessToken(
    RoleService.getLocalRole()
  );
  if (!accessToken) {
    return <Navigate to="/shopper/login"></Navigate>;
  }
  if (accessToken) {
    if (RoleService.getLocalRole() === 'customer') {
      return <Navigate to="/"></Navigate>;
    }
    if (RoleService.getLocalRole() === 'admin') {
      return <Navigate to="/admin"></Navigate>;
    }
    if (RoleService.getLocalRole() === 'shopper') {
      return (
        <div className={styles.Home}>
          <Header navigation={navigation} />
          <div className={styles.content}>
            <div className={styles.tab1}>
              <InformationTab />
            </div>

            <div className={styles.tab2}>
              <Search />
              <OrderProduct type={0} data={data}/>

            </div>
          </div>
          <Footer navigation={navigation} />
        </div>
      );
    }
  }
}

export default AcceptOrder;
