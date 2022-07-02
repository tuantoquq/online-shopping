import Header from '../components/header';
import AdminHeader from '../components/adminHeader';
import Footer from '../components/footer';
import styles from '../components/CSS/UserInformation.module.css';
import UserDisplay from '../components/userDisplay.js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCustomerProfile } from '../service/CustomerService.js';
import avtImage from '../assets/avt_default.png';
import Address from '../components/Address';
function AddressInformation(navigation, role) {
  const [user, setUser] = useState();
  const navigator = useNavigate();

  useEffect(() => {
    getCustomerProfile()
      .then((res) => {
        // console.log(res?.data?.data);
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
  return (
    <div className={styles.container}>
      {navigation.role !== 'admin' && <Header navigation={navigation} />}
      {navigation.role === 'admin' && <AdminHeader />}

      <div className={styles.content}>
        {/* <UserDisplay
          user_url={
            user?.avatarUrl == 'avt_default.png' ? avtImage : user?.avatarUrl
          }
          user_name={user?.lastName}
          user_age={
            user?.dateOfBirth === undefined ? 'Chưa cập nhật' : user?.dateOfBirth
          }
          user_phone={user?.phoneNumber}
        /> */}
        {/* <AccountInformation user={user}/> */}
        <Address role={navigation.role} />
        <div className={styles.wrapLogout}>
        </div>
      </div>
      <Footer navigation={navigation} />
    </div>
  );
}
export default AddressInformation;