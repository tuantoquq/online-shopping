import React from 'react';
import searchImage from '../assets/magnifier.png';
import userImage from '../assets/user1.png';
import menuImage from '../assets/squares.png';
import cartImage from '../assets/shopping-cart.png';
import styles from './CSS/HeaderCSS.module.css';

import Cookies from 'js-cookie';
import TokenService from '../service/TokenService';
import RoleService from '../service/RoleService';
import { getCustomerProfile } from '../service/CustomerService';
import { getShopperProfile } from '../service/ShopperService';
import { useState, useEffect, memo, useLayoutEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { Avatar, Menu, MenuItem } from '@mui/material';
function Header() {
  const navigate = useNavigate();
  const dictDay = {
    0: 'Chủ nhật',
    1: 'Thứ Hai',
    2: 'Thứ Ba',
    3: 'Thứ Tư',
    4: 'Thứ Năm',
    5: 'Thứ Sáu',
    6: 'Thứ Bảy',
  };
  let date = new Date();
  const dateCurr = date.toLocaleDateString();
  const dayCurr = dictDay[date.getDay()];

  const listTopic = [
    ['Váy', 'vay'],
    ['Túi', 'túi'],
    ['Tai nghe', 'tai nghe'],
    ['Điện thoại', 'điện thoại'],
    ['Sạc iphone', 'sạc iphone'],
  ];

  const [accessToken, setAccessToken] = useState(
    TokenService.getLocalAccessToken(RoleService.getLocalRole())
  );
  const [role, setRole] = useState(RoleService.getLocalRole());
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    TokenService.removeLocalAccessToken(RoleService.getLocalRole());
    RoleService.removeLocalRole();
    setAccessToken(null);
    setRole(RoleService.getLocalRole());
    setAnchorEl(null);
    navigate('/');
  };
  const handleClickAddress = () => {
    setAnchorEl(null);
    if (role === 'customer') {
      navigate(`/user/address`);
    }
  };
  const handleClickInfo = () => {
    setAnchorEl(null);
    if (role === 'customer') {
      navigate(`/user/infomation`);
    } else {
      navigate(`/${role}/infomation`);
    }
  };

  const handleClickOrderHistory = () => {
    setAnchorEl(null);
    if (role === 'customer') {
      navigate(`/user/orderManager`);
    }
  };

  const [user, setUser] = useState({});
  const [query, setQuery] = useState('');
  const navigatePath = function (path) {
    if (window.location.pathname !== path) {
      navigate(path);
    }
  };

  useLayoutEffect(() => {
    if (accessToken) {
      if (role === 'customer') {
        getCustomerProfile()
          .then((res) => {
            // console.log(res?.data?.data);
            setUser(res?.data?.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (role === 'shopper') {
        getShopperProfile()
          .then((res) => {
            // console.log(res?.data?.data);
            setUser(res?.data?.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, []);

  return (
    <div className={styles.Header}>
      <div className={styles.toolBar}>
        <label className={styles.namePaper} onClick={() => navigatePath('/')}>
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
            onClick={() => {
              if (query !== '') {
                navigate('/search', {
                  state: { search: query },
                });
              }
            }}
          />
        </div>
        {!accessToken && (
          <div className={styles.divUser}>
            <img
              src={userImage}
              className={styles.userIcon}
              onClick={() => navigatePath('/customer/login')}
              alt="default-btn"
            />
            <p
              className={styles.textColor}
              onClick={() => navigatePath('/customer/login')}
            >
              {'Đăng nhập'}
            </p>
          </div>
        )}

        {accessToken && (
          <div className={styles.divUser1}>
            <Avatar
              alt="avatar"
              src={user.avatar}
              className={styles.userIcon}
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            ></Avatar>
            <p
              className={styles.textColor}
              onClick={handleClick}
            >{`${user.firstName} ${user.lastName}`}</p>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClickInfo}>Thông tin cá nhân</MenuItem>
              {(role === 'customer') && (
                  <MenuItem onClick={handleClickOrderHistory}> Lịch sử mua hàng </MenuItem>
              )}
              <MenuItem onClick={handleClickAddress}>Địa chỉ</MenuItem>
              <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
            </Menu>
          </div>
        )}
      </div>

      <div className={styles.cmp_2}>
        <div className={styles.narBar}>
          <ul className={`${styles.textColor} ${styles.narMenu}`}>
            {listTopic.map((topic) => (
              <li>
                <p
                  onClick={() =>
                    navigate('/search', {
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
                <span>Tất cả</span>
                <img src={menuImage} className={styles.image} alt="menuImage" />
              </div>
            </li>
          </ul>
        </div>

        <div className={styles.cart}>
          <img
            src={cartImage}
            onClick={() =>
              accessToken
                ? navigatePath('/cart')
                : navigatePath('/customer/login')
            }
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default memo(Header);
