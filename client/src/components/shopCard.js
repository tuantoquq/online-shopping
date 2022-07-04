/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import clsx from 'clsx';
import styles from './CSS/ShopCardCSS.module.scss';
import axios from '../config/axios';
import DefaultAvatar from '../assets/avatar/defaultAvatar.png';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import StarBorderIcon from '@mui/icons-material/StarBorder';

function shopCard({ id }) {
  //console.log('render shop ' + id);
  const [shopInfo, setShopInfo] = useState({});

  useEffect(() => {
    async function getShop() {
      //console.log('Filter changed');
      //request for new data +numPages
      let numProducts = 0;
      try {
        const response = await axios.get(`/shops/list-products?shopId=${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          // withCredentials: true,
        });
        // console.log(response);
        numProducts = response.data.data.totalProducts;
      } catch (err) {
        console.log(err);
      }
      try {
        const response = await axios.get(`/shops/profile?shopId=${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          // withCredentials: true,
        });
        console.log(response);
        const shopData = {
          name: response.data.data.shopName,
          location: response.data.data.address,
          numProducts: numProducts,
          description:
            'Ngày tham gia: ' +
            format(new Date(response.data.data.createAt), 'dd/MM/yyyy'),
          rate: 3 + Math.floor(Math.random() * 20) / 10,
          image: response.data.data.avartarUrl
            ? response.data.data.avartarUrl
            : DefaultAvatar,
        };
        setShopInfo(shopData);
      } catch (err) {
        console.log(err);
      }
    }
    if (id) {
      getShop();
    }
  }, [id]);

  return (
    <Link to={`/shop/${id}`} styles="text-decoration: none">
      <div className={clsx(styles.shopCard)}>
        <div className={clsx(styles.shopCardLeft)}>
          <div className={clsx(styles.shopImageContainer)}>
            <img
              src={shopInfo.image}
              alt={shopInfo.name}
              className={clsx(styles.shopImage)}
            />
          </div>
          <div>
            <h3 className={clsx(styles.shopCardTitle)}>{shopInfo.name}</h3>
            <span className={clsx(styles.shopCardDescription)}>
              {shopInfo.description}
            </span>
            <span className={clsx(styles.shopCardLoaction)}>
              <LocationOnIcon className={clsx(styles.shopCardLoactionIcon)} />{' '}
              {shopInfo.location}
            </span>
          </div>
        </div>

        <div className={clsx(styles.shopCardRight)}>
          <div className={clsx(styles.shopCardRightItem)}>
            <span className={clsx(styles.shopCardItemTitle)}>
              {' '}
              <Inventory2OutlinedIcon
                className={clsx(styles.shopCardItemIcon)}
              />{' '}
              {shopInfo.numProducts}
            </span>
            <span className={clsx(styles.shopCardItemDescription)}>
              {' '}
              Sản Phẩm
            </span>
          </div>

          <div className={clsx(styles.shopCardRightItem)}>
            <span className={clsx(styles.shopCardItemTitle)}>
              {' '}
              <StarBorderIcon className={clsx(styles.shopCardItemIcon)} />{' '}
              {shopInfo.rate}
            </span>
            <span className={clsx(styles.shopCardItemDescription)}>
              {' '}
              Đánh giá
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default memo(shopCard);
