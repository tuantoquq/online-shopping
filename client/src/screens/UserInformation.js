import Header from '../components/header';
import AdminHeader from '../components/adminHeader';
import Footer from '../components/footer';
import styles from '../components/CSS/UserInformation.module.css';
import UserDisplay from '../components/userDisplay.js';
import AccountInformation from '../components/AccountInformation.js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCustomerProfile } from '../service/CustomerService.js';
import avtImage from '../assets/avt_default.png';
import { Navigate } from 'react-router-dom';
import TokenService from '../service/TokenService';
import RoleService from '../service/RoleService';

function UserInformation(navigation, role) {
  const [user, setUser] = useState();
  const navigator = useNavigate();

  useEffect(() => {
    getCustomerProfile()
      .then((res) => {
        console.log(res?.data?.data);
        setUser(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleLogout = () => {
    // Cookies.remove('access_token');
    // alert('Bạn đã đăng xuất thành công');
    // navigator('/');
  };
  const accessToken = TokenService.getLocalAccessToken(
    RoleService.getLocalRole()
  );
  if (!accessToken) {
    if (navigation.role === 'user') {
      return <Navigate to={`/customer/login`}></Navigate>;
    } else {
      return <Navigate to={`/admin/login`}></Navigate>;
    }
  } else {
    if (RoleService.getLocalRole() === 'admin' && navigation.role === 'user') {
      return <Navigate to={'/admin'}></Navigate>;
    }
    if (
      RoleService.getLocalRole() === 'customer' &&
      navigation.role === 'admin'
    ) {
      return <Navigate to={'/'}></Navigate>;
    }
  }
  return (
    <div className={styles.container}>
      {navigation.role !== 'admin' && <Header navigation={navigation} />}
      {navigation.role === 'admin' && <AdminHeader />}

      <div className={styles.content}>
        <UserDisplay
          user_url={
            user?.avatarUrl === undefined ? avtImage : user?.avatarUrl
          }
          user_name={user?.lastName}
          user_age={
            user?.dateOfBirth === undefined
              ? 'Chưa cập nhật'
              : user?.dateOfBirth
          }
          user_phone={user?.phoneNumber}
        />
        {/* <AccountInformation user={user}/> */}
        <AccountInformation role={navigation.role} />
        <div className={styles.wrapLogout}>
          {/* <button className={styles.logout} onClick={handleLogout}>
            Đăng xuất
          </button> */}
        </div>
      </div>
      <Footer navigation={navigation} />
    </div>
  );
}
export default UserInformation;
