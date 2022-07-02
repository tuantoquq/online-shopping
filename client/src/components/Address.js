import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import styles from './CSS/AccountInformation.module.css'
import clsx from "clsx";
import {updateAddress, getListAddress} from '../service/CustomerService.js';

function Address(props){
    const role = props.role;
    const [listAddress, setListAddress] = useState([]);
    const [newName, setNewName] = useState();
    const [newPhone, setNewPhone] = useState();
    const [newCity, setNewCity] = useState();
    const [newDistrict, setNewDistrict] = useState();
    const [newWard, setNewWard] = useState();
    const [newDetail, setNewDetail] = useState();
    useEffect(() => {
        getListAddress().then(res=>{setListAddress(res?.data?.data)})
        console.log(listAddress)
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
                <h2>Thông tin địa chỉ khách hàng</h2>
            )}
            {role === "admin"&&(
                <h2>Thông tin địa chỉ admin </h2>
            )}
            <div className={styles.content}>
            {role === "user"&&(      
                <div>            
                    <div className={styles.group}>
                        <div className={styles.infor}>
                            <label className={styles.column}>Tên người nhận</label>
                            <label className={styles.midColumn}>{listAddress[0]?.receiverName}</label>
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
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                            />
                            <lable className={clsx(styles.lastColumn,styles.replaceInfor)}
                                onClick={() => {
                                    if(newName == null){
                                        alert("Vui lòng nhập thông tin trước khi lưu thay đổi")
                                    }else{
                                        updateAddress(listAddress[0]?._id, {receiverName: newName}).then(res => {
                                            console.log("Update info: ", res.data);
                                            window.location.reload()
                                        })
                                    }
                                }}
                            >Lưu thay đổi</lable>
                        </div>
                    </div>
                    <div className={styles.group}>
                        <div className={styles.infor}>
                            <label className={styles.column}>Điện thoại</label>
                            <label className={styles.midColumn}>{listAddress[0]?.phone}</label>
                            <label className={clsx(styles.lastColumn,styles.replaceInfor)}
                                onClick={()=>displayUpdate(4)}
                            >Thay đổi</label>
                        </div>
                        <div className={styles.update} id={4}>
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
                                        alert("Vui lòng nhập thông tin trước khi lưu thay đổi")
                                    }
                                    if(newPhone.length != 10 ){
                                        alert("Số điện thoại không hợp lệ")
                                    } 
                                    else{
                                        updateAddress(listAddress[0]?._id,{phone: newPhone}).then(res => {
                                            console.log("Update info: ", res.data);
                                            window.location.reload()
                                        })
                                    }
                                }}
                            >Lưu thay đổi</lable>
                        </div>
                    </div>
                    <div className={styles.group}>
                        <div className={styles.infor}>
                            <label className={styles.column}>Tỉnh Thành</label>
                            <label className={styles.midColumn}>{listAddress[0]?.city}</label>
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
                                value={newCity}
                                onChange={(e) => setNewCity(e.target.value)}
                                
                            />
                            <lable className={clsx(styles.lastColumn,styles.replaceInfor)}
                                onClick={() => {
                                    if(newCity == null){
                                        alert("Vui lòng nhập thông tin trước khi lưu thay đổi")
                                    }
                                    else{
                                        updateAddress(listAddress[0]?._id,{city: newCity}).then(res => {
                                            console.log("Update info: ", res.data);
                                            window.location.reload()
                                        })
                                    }
                                }}
                            >Lưu thay đổi</lable>
                        </div>
                    </div>
                    
                    <div className={styles.group}>
                        <div className={styles.infor}>
                            <label className={styles.column}>Quận Huyện</label>
                            <label className={styles.midColumn}>{listAddress[0]?.district}</label>
                            <label className={clsx(styles.lastColumn,styles.replaceInfor)}
                                onClick={()=>displayUpdate(6)}
                            >Thay đổi</label>
                        </div>
                        <div className={styles.update} id={6}>
                            <lable className={styles.column}>
                                Cập nhật thông tin
                            </lable>
                            <input placeholder='Nhập thông tin...'
                                className={clsx(styles.midColumn,styles.inputUpdate)}
                                value={newDistrict}
                                onChange={(e) => setNewDistrict(e.target.value)}
                                
                            />
                            <lable className={clsx(styles.lastColumn,styles.replaceInfor)}
                                onClick={() => {
                                    if(newDistrict == null){
                                        alert("Vui lòng nhập thông tin trước khi lưu thay đổi")
                                    }
                                    else{
                                        updateAddress(listAddress[0]?._id,{district: newDistrict}).then(res => {
                                            console.log("Update info: ", res.data);
                                            window.location.reload()
                                        })
                                    }
                                }}
                            >Lưu thay đổi</lable>
                        </div>
                    </div>
                    
                    <div className={styles.group}>
                        <div className={styles.infor}>
                            <label className={styles.column}>Phường Xã</label>
                            <label className={styles.midColumn}>{listAddress[0]?.ward}</label>
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
                                value={newWard}
                                onChange={(e) => setNewWard(e.target.value)}
                                
                            />
                            <lable className={clsx(styles.lastColumn,styles.replaceInfor)}
                                onClick={() => {
                                    if(newWard == null){
                                        alert("Vui lòng nhập thông tin trước khi lưu thay đổi")
                                    }
                                    else{
                                        updateAddress(listAddress[0]?._id,{ward: newWard}).then(res => {
                                            console.log("Update info: ", res.data);
                                            window.location.reload()
                                        })
                                    }
                                }}
                            >Lưu thay đổi</lable>
                        </div>
                    </div>
                    
                    <div className={styles.group}>
                        <div className={styles.infor}>
                            <label className={styles.column}>Địa chỉ</label>
                            <label className={styles.midColumn}>{listAddress[0]?.details}</label>
                            <label className={clsx(styles.lastColumn,styles.replaceInfor)}
                                onClick={()=>displayUpdate(6)}
                            >Thay đổi</label>
                        </div>
                        <div className={styles.update} id={6}>
                            <lable className={styles.column}>
                                Cập nhật thông tin
                            </lable>
                            <input placeholder='Nhập thông tin...'
                                className={clsx(styles.midColumn,styles.inputUpdate)}
                                value={newDetail}
                                onChange={(e) => setNewDetail(e.target.value)}
                                
                            />
                            <lable className={clsx(styles.lastColumn,styles.replaceInfor)}
                                onClick={() => {
                                    if(newWard == null){
                                        alert("Vui lòng nhập thông tin trước khi lưu thay đổi")
                                    }
                                    else{
                                        updateAddress(listAddress[0]?._id,{details: newDetail}).then(res => {
                                            console.log("Update info: ", res.data);
                                            window.location.reload()
                                        })
                                    }
                                }}
                            >Lưu thay đổi</lable>
                        </div>
                    </div>
    
                </div>
                )}
            </div>
            

            
        </div>
    )

}
export default Address