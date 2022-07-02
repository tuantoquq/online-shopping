
import Header from "../components/header";
import Footer from "../components/footer";
import styles from '../components/CSS/UserInformation.module.css'
import UserDisplay from "../components/userDisplay.js";
import AccountInformation from "../components/AccountInformation";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {getCustomerProfile} from '../service/CustomerService.js';
import avtImage from '../assets/avt_default.png';


function UserInformation(navigation,role){
    const [user, setUser] = useState();
    const navigator = useNavigate();

    useEffect(() => {
        getCustomerProfile().then(
            res => {
                console.log(res?.data?.data);
                setUser(res?.data?.data);
            }
        ).catch(err => {
            console.log(err);
        });

    }, []);
    const handleLogout = () => {
        // Cookies.remove('access_token');
        // alert('Bạn đã đăng xuất thành công');
        // navigator('/');
    }
    return (
        <div className={styles.container}>
            <Header navigation={navigation}/>
            <div className={styles.content}>
                <UserDisplay user_url={user?.avatarUrl != 'avt_default.png' ? user?.avatarUrl : avtImage}  
                    user_name={user?.lastName}
                    user_age ={user?.dateOfBirth == undefined ? "Chưa cập nhật" : user?.dateOfBirth}
                    user_phone ={user?.phoneNumber}
                />
                {/* <AccountInformation user={user}/> */}
                <AccountInformation role={navigation.role}/>
                <div className = {styles.wrapLogout}>

                    {/* <button className = {styles.logout} onClick={handleLogout}>Đăng xuất</button> */}
                </div>
            </div>
            <Footer navigation={navigation}/>
        </div>
    )

}
export default UserInformation