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


  const listTopic = [['Thời sự','thoi-su'],['Góc nhìn','goc-nhin'],['Thế giới','the-gioi'],
  ['Kinh doanh','kinh-doanh'],['Du lịch','du-lich'],['Xem sau','xem-sau']]

  const topicThoiSu = [['Chính trị','thoi-su/chinh-tri'],['Dân sinh','thoi-su/dan-sinh'],['Giao thông','thoisu-dan-sinh']]
  const toppicGocNhin = [['Bình luận nhiều','goc-nhin/nhieu-binh-luan'],['Covid-19','goc-nhin/covid-19'],['Kinh doanh','goc-nhin/kinh-doanh']]

  const [isScroll,setIsScroll] = useState('');
  const [username, setUsername] = useState('');
  const [VisibleMenuAll,setVisibleMenuAll] = useState(false)
  const [VisibleMenuTop,setVisibleMenuTop] = useState(71+47)


  useEffect(()=>{
    const handlleScroll = ()=>{
      // console.log(document.querySelector(`.${styles.narBar}`))
      let x1 = document.querySelector(`.${styles.narBar}`)?.clientHeight
      let x2 = document.querySelector(`.${styles.toolBar}`)?.clientHeight

      if(window.scrollY>71){
        setIsScroll('fixed')
        setVisibleMenuTop(x1)
      }else{
        setIsScroll('')
        setVisibleMenuTop(x1+x2-window.scrollY)
      }
    }
    // let token = Cookies.get("access_token");
    // if(token != null){
    //   getUserInformation(token).then(
    //     res => setUsername(res.data?.nick_name)
    //   ).catch((err) => {
    //     console.log(err)
    //   })
    // }
    window.addEventListener('scroll',handlleScroll)
  },[])

  
  const handlleVisibleMenu = ()=>{
    setVisibleMenuAll(!VisibleMenuAll)
  }

  const navigatePath = function(path){
    if (window.location.pathname !== path){
        navigate(path)
    }

  }


  return (
    <div className={styles.Header}>
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


      <div className={styles.narBar} style={{position:isScroll,top:0}}>
        <ul className={`${styles.textColor} ${styles.narMenu}`}>

          {
            listTopic.map(topic => <li ><Link to={`/${topic[1]}`} >{topic[0]}</Link></li>)
          }
          <li >
            <div className={styles.divUser} onClick={handlleVisibleMenu}>
              <a>
                Tất cả
              </a>
              <img src={menuImage} className={styles.image}  alt='menuImage'/>
            </div>


          </li>
        </ul>

        

      </div>




      

      {VisibleMenuAll &&<div className={styles.rowMenu} style={{top:VisibleMenuTop}}>
        <div className={`${styles.rowMenu_1} ${styles.textColor}`}>
          <ul>
            <h2>Thời sự</h2>
            {
              topicThoiSu.map(topic => <li><a href={`/${topic[1]}`}>{topic[0]}</a></li>)
            }
          </ul>
          <ul>
            <h2>Góc nhìn</h2>
            {
              toppicGocNhin.map(topic => <li><a href={`/${topic[1]}`}>{topic[0]}</a></li>)
            }
          </ul>
          <ul>
            <h2>Thế giới</h2>
            {
              topicThoiSu.map(topic => <li><a href={`/${topic[1]}`}>{topic[0]}</a></li>)
            }
          </ul>
          <ul>
            <h2>Kinh doanh</h2>
            {
              toppicGocNhin.map(topic => <li><a href={`/${topic[1]}`}>{topic[0]}</a></li>)
            }
          </ul>
          <ul>
            <h2>Du lịch</h2>
            {
              topicThoiSu.map(topic => <li><a href={`/${topic[1]}`}>{topic[0]}</a></li>)
            }
          </ul>        
        </div>
        <br/>
        
      </div>
      }


    </div>
  );
}

export default Header;