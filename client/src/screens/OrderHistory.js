import Header from '../components/header';
import Footer from '../components/footer';
import ListOrderedItem from '../components/listOrderedItem';
import styles from './CSS/orderhistory.module.css';
import { Navigate } from 'react-router-dom';
import TokenService from '../service/TokenService';
import RoleService from '../service/RoleService';

function OrderHistory() {
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
          <Header />
          <div>
            <div className="container">
              <h1>Lịch sử mua hàng</h1>
            </div>
            <div>
              <ListOrderedItem />
              <ListOrderedItem />
            </div>
            <div>
              <button>Trở lại</button>
              <button>Hoàn thành</button>
            </div>
          </div>
          <Footer />
        </div>
      );
    }
  }
}

export default OrderHistory;
