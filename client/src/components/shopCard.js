/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './CSS/ShopCardCSS.module.scss';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import productSampleImage1 from '../assets/Product/productSampleImage1.jpeg';

function shopCard({ id }) {
  //console.log('render shop ' + id);

  const getShopInfo = (shopId) => {
    /* //request for data
    try {
      const response = await axios.post(
        GET_PRODUCT_URL,
        JSON.stringify({ id: id }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
          // withCredentials: true,
        }
      );
      return response?.data;
    } catch (err) {
      console.log(err);
      return null;
    }
    */
    const responsData = {
      id: shopId,
      image: productSampleImage1,
      name: 'The Keycap Zone',
      description: 'Bàn phím cơ uy tín nhất Hà Nội',
      numProducts: 225,
      rate: 3.4,
      location: 'Hà Nội',
    };
    return responsData;
  };

  const [shopInfo, setShopInfo] = useState((id) => getShopInfo(id));

  useEffect(() => {
    setShopInfo(getShopInfo(id));
  }, [id]);

  return (
    <Link to="/" styles="text-decoration: none">
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
