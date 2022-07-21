import CommentItem from '../components/commentItem';
import styles from './CSS/commentProduct.module.css';
import { Navigate } from 'react-router-dom';
import TokenService from '../service/TokenService';
import RoleService from '../service/RoleService';
import Button from '@mui/material/Button';
import Header from '../components/header';
import Footer from '../components/footer';


function CommentProduct() {
  const accessToken = TokenService.getLocalAccessToken(
    RoleService.getLocalRole()
  );
  const submit = ()=>{

  }
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
          <Header/>
          <CommentItem />
          <Footer/>

          
        </div>
      );
    }
  }
}

export default CommentProduct;
