import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import styles from './CSS/AccountInformation.module.css'
import clsx from "clsx";
import {updateCustomerProfile, getCustomerProfile} from '../service/CustomerService.js';
import { updateAdminPassword } from "../service/AdminService.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AccountInformation(props){
    const role = props.role;
    const [newFirstName, setNewFirstName] = useState();
    const [newLastName, setNewLastName] = useState();
    const [newPhone, setNewPhone] = useState();
    const [newBirthday, setNewBirthday] = useState(new Date());
    const [newEmail, setNewEmail] = useState();
    const [newPassword, setNewPassword] = useState();
    const [oldPassword, setOldPassword] = useState();
    const [currentUser, setCurrentUser] = useState({firstName:'Nguyễn', lastName:'Tuấn'});
    const [newAddress, setNewAddress] = useState();
    useEffect(() => {
        if(role!=='admin'){
            getCustomerProfile().then(res=>{setCurrentUser(res?.data?.data)})
        }
    },[props])
    const displayUpdate = (id)=>{
        const res = document.getElementById(id)
        if (res.style.display === 'flex'){
            res.style.display = 'none'
        }
        else{
            res.style.display = 'flex'
        }
    }
    
    return (
        <div className={styles.container}>
            {role === "user"&&(
                <h2>Thông tin tài khoản khách hàng</h2>
            )}
            {role === "admin"&&(
                <h2>Thông tin tài khoản admin </h2>
            )}
            <div className={styles.content}>
                <div className={styles.group}>
                    <div className={styles.infor}>
                        <label className={styles.column}>Tài khoản</label>
                        <label className={styles.midColumn}>{currentUser?.firstName + ' ' + currentUser?.lastName}</label>
                        <label className={clsx(styles.lastColumn,styles.replaceInfor)}
                            
                        ></label>
                    </div>
                </div>
                {role === "admin"&&(
                    <div>
                    <div className={styles.group}>
                        <div className={styles.infor}>
                            <label className={styles.column}>Mật khẩu</label>
                            <input type="password" disabled="disabled" value={"aaaaaa"}  className={styles.midColumn}/>
                            <label className={clsx(styles.lastColumn,styles.replaceInfor)}
                            ></label>
                        </div>
                        <div className={styles.infor}>
                            <label className={styles.column}>Mật khẩu cũ </label>
                            <input type="password" 
                            placeholder="Nhập mật khẩu cũ..."
                            onChange={(e) => setOldPassword(e.target.value)}
                             className={styles.midColumn}/>
                            <label className={clsx(styles.lastColumn,styles.replaceInfor)}
                            ></label>
                        </div>
                        <div className={styles.infor}>
                            <label className={styles.column}>Mật khẩu mới</label>
                            <input type="password" 
                            placeholder="Nhập mật khẩu mới..."
                            onChange={(e) => setNewPassword(e.target.value)}
                             className={styles.midColumn}/>
                            <label className={clsx(styles.lastColumn,styles.replaceInfor)}
                                onClick={() => {
                                    if(newPassword == null || newPassword == null){
                                        toast.error("Vui lòng nhập thông tin trước khi lưu thay đổi")
                                    }
                                    else if(newPassword.length<6){
                                        toast.error("Mật khẩu phải có ít nhất 6 ký tự")
                                    }
                                    else{
                                        updateCustomerProfile({oldPass: oldPassword,newPass: newPassword}).then(res => {
                                            console.log("Update info: ", res.data);
                                            toast.success("Thay đổi thành công");
                                            setTimeout(() =>window.location.reload(), 3000)
                                        }).catch(err => {
                                            toast.error("Thay đổi thất bại, vui lòng xem lại thông tin vừa nhập");
                                        })
                                    }
                                }}
                            >Thay đổi</label>
                        </div>
                    </div>
                    </div>
                )}
                {role === "user"&&(
                <div>
                <div className={styles.group}>
                    <div className={styles.infor}>
                        <label className={styles.column}>Mật khẩu</label>
                        <input type="password" disabled="disabled" value={"aaaaaa"}  className={styles.midColumn}/>
                        <label className={clsx(styles.lastColumn,styles.replaceInfor)}
                            onClick={()=>displayUpdate(2)}
                        >Thay đổi</label>
                    </div>
                    <div className={styles.update} id={2}>
                        <lable className={styles.column}>
                            Cập nhật thông tin
                        </lable>
                        <input placeholder='Nhập thông tin...' type='password'
                            className={clsx(styles.midColumn,styles.inputUpdate)}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <lable className={clsx(styles.lastColumn,styles.replaceInfor)}
                            onClick={() => {
                                if(newPassword == null){
                                    toast.error("Vui lòng nhập thông tin trước khi lưu thay đổi")
                                }else{
                                    updateCustomerProfile({password: newPassword}).then(res => {
                                        console.log("Update info: ", res.data);
                                        toast.success("Thay đổi thành công");
                                        setTimeout(() =>window.location.reload(), 3000)
                                    })
                                }
                            }}
                        >Lưu thay đổi</lable>
                    </div>
                </div>
                  
                            
                    <div className={styles.group}>
                        <div className={styles.infor}>
                            <label className={styles.column}>Họ và tên đệm</label>
                            <label className={styles.midColumn}>{currentUser?.firstName}</label>
                            <label className={clsx(styles.lastColumn,styles.replaceInfor)}
                                onClick={()=>displayUpdate(3)}
                            >Thay đổi</label>
                        </div>
                        <div className={styles.update} id={3}>
                            <lable className={styles.column}>
                                Cập nhật thông tin
                            </lable>
                            <input placeholder='Nhập thông tin...'
                                className={clsx(styles.midColumn,styles.inputUpdate)
                                }
                                value={newFirstName}
                                onChange={(e) => setNewFirstName(e.target.value)}
                            />
                            <lable className={clsx(styles.lastColumn,styles.replaceInfor)}
                                onClick={() => {
                                    if(newFirstName == null){
                                        toast.error("Vui lòng nhập thông tin trước khi lưu thay đổi")
                                    }else{
                                        updateCustomerProfile({firstName: newFirstName}).then(res => {
                                            console.log("Update info: ", res.data);
                                            toast.success("Thay đổi thành công");
                                            setTimeout(() =>window.location.reload(), 3000)
                                        })
                                    }
                                }}
                            >Lưu thay đổi</lable>


                        </div>
                    </div>
                    <div className={styles.group}>
                        <div className={styles.infor}>
                            <label className={styles.column}>Tên</label>
                            <label className={styles.midColumn}>{currentUser?.lastName}</label>
                            <label className={clsx(styles.lastColumn,styles.replaceInfor)}
                                onClick={()=>displayUpdate(4)}
                            >Thay đổi</label>
                        </div>
                        <div className={styles.update} id={4}>
                            <lable className={styles.column}>
                                Cập nhật thông tin
                            </lable>
                            <input placeholder='Nhập thông tin...'
                                className={clsx(styles.midColumn,styles.inputUpdate)
                                }
                                value={newLastName}
                                onChange={(e) => setNewLastName(e.target.value)}
                            />
                            <lable className={clsx(styles.lastColumn,styles.replaceInfor)}
                                onClick={() => {
                                    if(newLastName == null){
                                        toast.error("Vui lòng nhập thông tin trước khi lưu thay đổi")
                                    }else{
                                        updateCustomerProfile({lastName: newLastName}).then(res => {
                                            console.log("Update info: ", res.data);
                                            toast.success("Thay đổi thành công");
                                            setTimeout(() =>window.location.reload(), 3000)
                                        })
                                    }
                                }}
                            >Lưu thay đổi</lable>


                        </div>
                    </div>
                    <div className={styles.group}>
                        <div className={styles.infor}>
                            <label className={styles.column}>Email</label>
                            <label className={styles.midColumn}>{currentUser?.email}</label>
                            <label className={clsx(styles.lastColumn,styles.replaceInfor)}
                                onClick={()=>displayUpdate(5)}
                            >Thay đổi</label>
                        </div>
                        <div className={styles.update} id={5}>
                            <lable className={styles.column}>
                                Cập nhật thông tin
                            </lable>
                            <input placeholder='Nhập thông tin...'
                                className={clsx(styles.midColumn,styles.inputUpdate)}
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                            />
                            <lable className={clsx(styles.lastColumn,styles.replaceInfor)}
                                onClick={() =>{
                                    if(newEmail == null){
                                        toast.error("Vui lòng nhập thông tin trước khi lưu thay đổi")
                                    }else if(newEmail == currentUser?.email){
                                        window.location.reload();
                                    }else{
                                        updateCustomerProfile({email: newEmail}).then(res => {
                                            console.log("Update info: ", res.data);
                                            toast.success("Thay đổi thành công");
                                            setTimeout(() =>window.location.reload(), 3000)
                                        })
                                    }
                                }}
                            >Lưu thay đổi</lable>


                        </div>
                    </div>
                    

                    <div className={styles.group}>
                        <div className={styles.infor}>
                            <label className={styles.column}>Điện thoại</label>
                            <label className={styles.midColumn}>{currentUser?.phoneNumber}</label>
                            <label className={clsx(styles.lastColumn,styles.replaceInfor)}
                                onClick={()=>displayUpdate(6)}
                            >Thay đổi</label>
                        </div>
                        <div className={styles.update} id={6}>
                            <lable className={styles.column}>
                                Cập nhật thông tin
                            </lable>
                            <input placeholder='Nhập thông tin...'
                                type = 'tel'
                                className={clsx(styles.midColumn,styles.inputUpdate)}
                                value={newPhone}
                                onChange={(e) => setNewPhone(e.target.value)}
                                
                            />
                            <lable className={clsx(styles.lastColumn,styles.replaceInfor)}
                                onClick={() => {
                                    if(newPhone == null){
                                        toast.error("Vui lòng nhập thông tin trước khi lưu thay đổi")
                                    }
                                    else if(newPhone.length != 10 ){
                                        toast.error("Số điện thoại không hợp lệ")
                                    } 
                                    else{
                                        updateCustomerProfile({phoneNumber: newPhone}).then(res => {
                                            console.log("Update info: ", res.data);
                                            toast.success("Thay đổi thành công");
                                            setTimeout(() =>window.location.reload(), 3000)
                                        })
                                    }
                                }}
                            >Lưu thay đổi</lable>
                        </div>
                    </div>

                    <div className={styles.group}>
                        <div className={styles.infor}>
                            <label className={styles.column}>Ngày sinh</label>
                            <label className={styles.midColumn}>{currentUser?.dateOfBirth}</label>
                            <label className={clsx(styles.lastColumn,styles.replaceInfor)}
                                onClick={()=>displayUpdate(7)}
                            >Thay đổi</label>
                        </div>
                        <div className={styles.update} id={7}>
                            <lable className={styles.column}>
                                Cập nhật thông tin
                            </lable>
                            {/* <DatePicker  
                                className={styles.Column} 
                                selected={newBirthday}
                                onChange={(date) => setNewBirthday(date)} 
                            /> */}
                            <input
                                id="birthday"
                                name="birthday"
                                type="date"
                                value={newBirthday}
                                onChange={(e) => setNewBirthday(e.target.value)}
                                className={clsx(styles.midColumn,styles.inputUpdate)}
                                required
                            />
                            <lable className={clsx(styles.lastColumn,styles.replaceInfor)}
                                onClick={() => {
                                    if(newBirthday == null){
                                        toast.error("Vui lòng nhập thông tin trước khi lưu thay đổi")
                                    }
                                    else{
                                        updateCustomerProfile({dateOfBirth: newBirthday}).then(res => {
                                            console.log("Update info: ", res.data);
                                            setTimeout(() =>window.location.reload(), 3000);
                                            toast.success("Thay đổi thành công");
                                        })
                                    }
                                }}
                            >Lưu thay đổi</lable>
                        </div>
                    </div>
                </div>
                )}
            </div>
            <ToastContainer />

            
        </div>
    )

}
export default AccountInformation