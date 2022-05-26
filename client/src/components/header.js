import React from "react";
import searchImage from '../assets/magnifier.png'
import userImage from '../assets/user1.png'
import menuImage from '../assets/squares.png'
import styles from './CSS/HeaderCSS.module.css'

import Cookies from "js-cookie";
import {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


function Header() {
  const navigate = useNavigate();
  const dictDay = {
    0:'Chủ nhật',
    1:'Thứ Hai',
    2:'Thứ Ba',
    3:'Thứ Tư',
    4:'Thứ Năm',
    5:'Thứ Sáu',
    6:'Thứ Bảy'
  }
  let date = new Date()
  const dateCurr = date.toLocaleDateString()
  const dayCurr = dictDay[date.getDay()]


  const listTopic = [['Váy','váy'],['Túi','túi'],['Tai nghe','tai nghe'],
  ['Điện thoại','điện thoại'],['Sạc iphone','sạc iphone']]

  const topicThoiSu = [['Chính trị','thoi-su/chinh-tri'],['Dân sinh','thoi-su/dan-sinh'],['Giao thông','thoisu-dan-sinh']]
  const toppicGocNhin = [['Bình luận nhiều','goc-nhin/nhieu-binh-luan'],['Covid-19','goc-nhin/covid-19'],['Kinh doanh','goc-nhin/kinh-doanh']]

  const [username, setUsername] = useState('');


  


  const navigatePath = function(path){
    if (window.location.pathname !== path){
        navigate(path)
    }

  }


  return (
    <div className={styles.Header} >
      <div className={styles.toolBar}>
        <label className={styles.namePaper} onClick={()=>navigatePath('/')}>Time News</label>
        <label className={`${styles.textColor} ${styles.textDate}`}>{`${dayCurr}, ${dateCurr}`}</label>

        
        <div className={styles.divSearch}>
            <input type='text' placeholder='Nhập nội dung...' className={styles.search}/>
            <img src={searchImage} className={styles.image} alt='search' 
              onClick={()=>navigatePath('/tim-kiem')}
            />
        </div>
            
        <a className={styles.divUser}>
            <img src ={userImage} className={styles.userIcon} onClick={()=> Cookies.get('access_token')==null ? navigatePath('/login'):navigatePath('/user-information')} />
            <p className={styles.textColor} onClick={()=>Cookies.get('access_token')==null ? navigatePath('/login'):navigatePath('/user-information')}>{Cookies.get('access_token')==null ? "Đăng nhập": username}</p>

        </a>

      </div>

      <div  className={styles.cmp_2} >

        <div className={styles.narBar} >
          <ul className={`${styles.textColor} ${styles.narMenu}`}>

            {
              listTopic.map(topic => <li ><Link to={`/${topic[1]}`} >{topic[0]}</Link></li>)
            }
            <li >
              <div className={styles.divUser} >
                <a>
                  Tất cả
                </a>
                <img src={menuImage} className={styles.image}  alt='menuImage'/>
              </div>


            </li>
          </ul>
        </div>


        <div className={styles.cart}>
          <img src={'assets/shopping-cart.png'}/>
        </div>
      </div>


        




      



    </div>
  );
}

export default Header;