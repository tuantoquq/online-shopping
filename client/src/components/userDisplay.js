import React, { useEffect, useState } from "react";
import styles from './CSS/UserDisplay.module.css'
// import { submitFile } from "../api/newsApi";
// import { updateAvatarImage } from "../api/userApi";
import { uploadAvatar} from '../service/CustomerService.js';

function UserDisplay(props){
    const role = props.role;
    const user_url = props.user_url
    const user_name = props.user_name
    const user_age = props.user_age
    const user_phone = props.user_phone
    const [userUrl, setUserUrl] = useState()
    const [file, setFile] = useState();
    let formData = new FormData();
    useEffect(() => {
        setUserUrl(user_url)
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
    const updateAvatar = () => {
        formData.append("file", file);
        console.log(file);
        uploadAvatar(formData).then(res => {
            setUserUrl(res?.data?.data?.avatarUrl);
        }).catch((err) => {
            console.log(err);
        });
    }
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Tài khoản của tôi</h2>
            <div className={styles.content}>
                <div className={styles.left_cpn}>
                    <img src={userUrl} className={styles.user_avatar} />
                    {role === 'customer' &&
                    <div className={styles.changeAvatar}>

                        <label className={styles.replaceInfor}
                                onClick={()=>displayUpdate(1)}
                            >Thay đổi</label>

                        <div className={styles.update} id={1}>
                            <input class="form-control" type="file" id="formFile" name="formFile" onChange={(e) => setFile(e.target.files[0])}/>
                            <lable className={styles.replaceInfor} onClick={updateAvatar}>Lưu thay đổi</lable>
                        </div>
                    </div>
                    }
                </div>
                <div className={styles.right_cpn}>
                    <h3>{user_name}</h3>
                    <p>{user_age}</p>
                    <p>{user_phone}</p>
                </div>
            </div>



        </div>
    )

}
export default UserDisplay;