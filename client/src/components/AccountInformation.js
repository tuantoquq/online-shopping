// // import React, { useEffect, useState } from "react";
// // import DatePicker from "react-datepicker";
// // import "react-datepicker/dist/react-datepicker.css";
// // import styles from './CSS/AccountInformation.module.css'
// // import clsx from "clsx";
// // // import { updateAddress, updateEmail, updateNickName } from "../api/userApi";
// // import Cookies from "js-cookie";

// function AccountInformation(props){
//     const [newNickName, setNewNickName] = useState();
//     const [newPhone, setNewPhone] = useState();
//     const [newBirthday, setNewBirthday] = useState(new Date());
//     const [newEmail, setNewEmail] = useState();
//     const [newAddres, setNewAddress] = useState();
//     const [currentUser, setCurrentUser] = useState();
//     useEffect(() => {
//         setCurrentUser(props.user)
//     },[props])
//     const displayUpdate = (id)=>{
//         const res = document.getElementById(id)
//         if (res.style.display === 'flex'){
//             res.style.display = 'none'
//         }
//         else{
//             res.style.display = 'flex'
//         }
//     }
//     const updateEmailHandle = () => {
//         if(newEmail == null){
//             alert("Vui lòng nhập thông tin trước khi lưu thay đổi")
//         }else if(newEmail == currentUser?.email){
//             window.location.reload();
//         }else{
//             // updateEmail(newEmail, Cookies.get('access_token')).then(res => {
//             //     console.log("Update info: ", res.data);
//             //     window.location.reload();
//             // }).catch(() => {
//             //     alert('Email này đã được sử dụng!');
//             // })
//             // // window.location.reload();
//         }
//     }
//     return (
//         <div className={styles.container}>
//             <h2>Thông tin tài khoản</h2>
//             <div className={styles.content}>
//                 <div className={styles.group}>
//                     <div className={styles.infor}>
//                         <label className={styles.column}>Tài khoản</label>
//                         <label className={styles.midColumn}>{currentUser?.username}</label>
//                         <label className={clsx(styles.lastColumn,styles.replaceInfor)}
                            
//                         ></label>
//                     </div>
//                     {/* <div className={styles.update} id={0}>
//                         <lable className={styles.column}>
//                             Cập nhật thông tin
//                         </lable>
//                         <input placeholder='Nhập thông tin...'
//                             className={clsx(styles.midColumn,styles.inputUpdate)}
//                         />
//                         <lable className={clsx(styles.lastColumn,styles.replaceInfor)} onClick={()=> {}}>Lưu thay đổi</lable>
//                     </div> */}
//                 </div>

//                 <div className={styles.group}>
//                     <div className={styles.infor}>
//                         <label className={styles.column}>Mật khẩu</label>
//                         <input type="password" disabled="disabled" value={"aaaaaa"}  className={styles.midColumn}/>
//                         <label className={clsx(styles.lastColumn,styles.replaceInfor)}
//                             onClick={()=>displayUpdate(1)}
//                         >Thay đổi</label>
//                     </div>
//                     <div className={styles.update} id={1}>
//                         <lable className={styles.column}>
//                             Cập nhật thông tin
//                         </lable>
//                         <input placeholder='Nhập thông tin...' type='password'
//                             className={clsx(styles.midColumn,styles.inputUpdate)}
//                         />
//                         <lable className={clsx(styles.lastColumn,styles.replaceInfor)}>Lưu thay đổi</lable>


//                     </div>
//                 </div>

//                 <div className={styles.group}>
//                     <div className={styles.infor}>
//                         <label className={styles.column}>Họ và tên</label>
//                         <label className={styles.midColumn}>{currentUser?.nick_name}</label>
//                         <label className={clsx(styles.lastColumn,styles.replaceInfor)}
//                             onClick={()=>displayUpdate(2)}
//                         >Thay đổi</label>
//                     </div>
//                     <div className={styles.update} id={2}>
//                         <lable className={styles.column}>
//                             Cập nhật thông tin
//                         </lable>
//                         <input placeholder='Nhập thông tin...'
//                             className={clsx(styles.midColumn,styles.inputUpdate)
//                             }
//                             value={newNickName}
//                             onChange={(e) => setNewNickName(e.target.value)}
//                         />
//                         <lable className={clsx(styles.lastColumn,styles.replaceInfor)}
//                             onClick={() => {
//                                 if(newNickName == null){
//                                     alert("Vui lòng nhập thông tin trước khi lưu thay đổi")
//                                 }else{
//                                     // updateNickName(newNickName, Cookies.get('access_token')).then(res => {
//                                     //     console.log("Update info: ", res.data);
//                                     // })
//                                     // window.location.reload();
//                                 }
//                             }}
//                         >Lưu thay đổi</lable>


//                     </div>
//                 </div>
//                 <div className={styles.group}>
//                     <div className={styles.infor}>
//                         <label className={styles.column}>Email</label>
//                         <label className={styles.midColumn}>{currentUser?.email}</label>
//                         <label className={clsx(styles.lastColumn,styles.replaceInfor)}
//                             onClick={()=>displayUpdate(3)}
//                         >Thay đổi</label>
//                     </div>
//                     <div className={styles.update} id={3}>
//                         <lable className={styles.column}>
//                             Cập nhật thông tin
//                         </lable>
//                         <input placeholder='Nhập thông tin...'
//                             className={clsx(styles.midColumn,styles.inputUpdate)}
//                             value={newEmail}
//                             onChange={(e) => setNewEmail(e.target.value)}
//                         />
//                         <lable className={clsx(styles.lastColumn,styles.replaceInfor)}
//                             onClick={updateEmailHandle}
//                         >Lưu thay đổi</lable>


//                     </div>
//                 </div>
                
//                 <div className={styles.group}>
//                     <div className={styles.infor}>
//                         <label className={styles.column}>Địa chỉ</label>
//                         <label className={styles.midColumn}>{currentUser?.address}</label>
//                         <label className={clsx(styles.lastColumn,styles.replaceInfor)}
//                             onClick={()=>displayUpdate(4)}
//                         >Thay đổi</label>
//                     </div>
//                     <div className={styles.update} id={4}>
//                         <lable className={styles.column}>
//                             Cập nhật thông tin
//                         </lable>
//                         <input placeholder='Nhập thông tin...'
//                             className={clsx(styles.midColumn,styles.inputUpdate)}
//                             value={newAddres}
//                             onChange={(e) => setNewAddress(e.target.value)}
//                         />
//                         <lable className={clsx(styles.lastColumn,styles.replaceInfor)}
//                             onClick={() => {
//                                 if(newAddres == null){
//                                     alert("Vui lòng nhập thông tin trước khi lưu thay đổi")
//                                 }else{
//                                     // updateAddress(newAddres, Cookies.get('access_token')).then(res => {
//                                     //     console.log("Update info: ", res.data);
//                                     // })
//                                     // window.location.reload();
//                                 }
//                             }}
//                         >Lưu thay đổi</lable>
//                     </div>
//                 </div>

//                 <div className={styles.group}>
//                     <div className={styles.infor}>
//                         <label className={styles.column}>Điện thoại</label>
//                         <label className={styles.midColumn}>{currentUser?.phone}</label>
//                         <label className={clsx(styles.lastColumn,styles.replaceInfor)}
//                             onClick={()=>displayUpdate(5)}
//                         >Thay đổi</label>
//                     </div>
//                     <div className={styles.update} id={5}>
//                         <lable className={styles.column}>
//                             Cập nhật thông tin
//                         </lable>
//                         <input placeholder='Nhập thông tin...'
//                             type="number"
//                             className={clsx(styles.midColumn,styles.inputUpdate)}
//                             value={newPhone}
//                             onChange={(e) => setNewPhone(e.target.value)}
                            
//                         />
//                         <lable className={clsx(styles.lastColumn,styles.replaceInfor)}
//                             onClick={() => {
//                                 if(newPhone == null){
//                                     alert("Vui lòng nhập thông tin trước khi lưu thay đổi")
//                                 }
//                                 if(newPhone.length != 10 ){
//                                     alert("Số điện thoại không hợp lệ")
//                                 } 
//                                 else{
//                                     // updateAddress(newAddres, Cookies.get('access_token')).then(res => {
//                                     //     console.log("Update info: ", res.data);
//                                     // })
//                                     // window.location.reload();
//                                 }
//                             }}
//                         >Lưu thay đổi</lable>
//                     </div>
//                 </div>

//                 <div className={styles.group}>
//                     <div className={styles.infor}>
//                         <label className={styles.column}>Ngày sinh</label>
//                         <label className={styles.midColumn}>{currentUser?.birthday}</label>
//                         <label className={clsx(styles.lastColumn,styles.replaceInfor)}
//                             onClick={()=>displayUpdate(6)}
//                         >Thay đổi</label>
//                     </div>
//                     <div className={styles.update} id={6}>
//                         <lable className={styles.column}>
//                             Cập nhật thông tin
//                         </lable>
//                         <DatePicker  

//                             className={styles.midColumn} 
//                             selected={newBirthday}
//                             onChange={(date) => setNewBirthday(date)} 
//                         />
                        
//                         <lable className={clsx(styles.lastColumn,styles.replaceInfor)}
//                             onClick={() => {
//                                 if(newBirthday == null){
//                                     alert("Vui lòng nhập thông tin trước khi lưu thay đổi")
//                                 }
//                                 else{
//                                     // updateAddress(newAddres, Cookies.get('access_token')).then(res => {
//                                     //     console.log("Update info: ", res.data);
//                                     // })
//                                     // window.location.reload();
//                                 }
//                             }}
//                         >Lưu thay đổi</lable>
//                     </div>
//                 </div>

//             </div>

            
//         </div>
//     )

// }
// export default AccountInformation