
import React from "react";
import searchImage from '../assets/magnifier.png'
import userImage from '../assets/user1.png'
import menuImage from '../assets/squares.png'
import cartImage from '../assets/shopping-cart.png'
import styles from './CSS/HeaderCSS.module.css'

import Cookies from "js-cookie";
import {useState,useEffect} from 'react'

import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Header({ navigation }) {
  const navigate = useNavigate();
  const dictDay = {
    0: "Chủ nhật",
    1: "Thứ Hai",
    2: "Thứ Ba",
    3: "Thứ Tư",
    4: "Thứ Năm",
    5: "Thứ Sáu",
    6: "Thứ Bảy",
  };
  let date = new Date();
  const dateCurr = date.toLocaleDateString();
  const dayCurr = dictDay[date.getDay()];

  const listTopic = [
    ["Váy", "vay"],
    ["Túi", "túi"],
    ["Tai nghe", "tai nghe"],
    ["Điện thoại", "điện thoại"],
    ["Sạc iphone", "sạc iphone"],
  ];


  const [username, setUsername] = useState("");
  const [query, setQuery] = useState("");
  const navigatePath = function (path) {
    if (window.location.pathname !== path) {
      navigate(path);
    }
  };

  return (
    <div className={styles.Header}>
      <div className={styles.toolBar}>
        <label className={styles.namePaper} onClick={() => navigatePath("/")}>
          Tipi Shop
        </label>
        <label
          className={`${styles.textColor} ${styles.textDate}`}
        >{`${dayCurr}, ${dateCurr}`}</label>

        <div className={styles.divSearch}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Nhập nội dung..."
            className={styles.search}
          />
          <img
            src={searchImage}
            className={styles.image}
            alt="search"
            onClick={() =>
              navigate("/search", {
                state: { search: query },
              })
            }
          />
        </div>

        <a className={styles.divUser}>
          <img
            src={userImage}
            className={styles.userIcon}
            onClick={() =>
              Cookies.get("access_token") == null
                ? navigatePath("/customer/login")
                : navigatePath("/user/information")
            }
          />
          <p
            className={styles.textColor}
            onClick={() =>
              Cookies.get("access_token") == null
                ? navigatePath("/customer/login")
                : navigatePath("/user/information")
            }
          >
            {Cookies.get("access_token") == null ? "Đăng nhập" : username}
          </p>
        </a>
      </div>

      <div className={styles.cmp_2}>
        <div className={styles.narBar}>
          <ul className={`${styles.textColor} ${styles.narMenu}`}>
            {listTopic.map((topic) => (
              <li>
                <p
                  onClick={() =>
                    navigate("/search", {
                      state: { search: topic[0] },
                    })
                  }
                >
                  {topic[0]}
                </p>
              </li>
            ))}
            <li>
              <div className={styles.divUser}>
                <a>Tất cả</a>
                <img src={menuImage} className={styles.image} alt="menuImage" />
              </div>
            </li>
          </ul>
        </div>

        <div className={styles.cart}>
          <img src={cartImage} 
             onClick={() =>
              Cookies.get("access_token") == null
                ? navigatePath("/cart")
                : navigatePath("/cart ")
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
