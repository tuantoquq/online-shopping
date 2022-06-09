import React, { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import axios from '../config/axios';
import clsx from 'clsx';
import styles from './CSS/ProductCardCSS.module.scss';
import Card from '@mui/material/Card';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';

//for sample data
import productSampleImage1 from '../assets/Product/productSampleImage1.jpeg';
import productSampleImage2 from '../assets/Product/productSampleImage2.jpeg';

function ProductCard(id) {
  //  console.log('re-render product card', id);
  const GET_PRODUCT_URL = ''; //url to request product info
  const getProductInfo = (productId) => {
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
    function randomImage() {
      const index = Math.floor(Math.random() * 2) + 1;
      if (index === 1) {
        return productSampleImage1;
      } else {
        return productSampleImage2;
      }
    }
    const responsData = {
      id: productId,
      image: randomImage(),
      name: 'Lorem Ipsum is simply dummy text of the printing',
      price: 600000,
      selled: 32032,
      rate: 3,
      location: 'Hà Nội',
    };
    return responsData;
  };

  const [productInfo, setProductInfo] = useState((id) => getProductInfo(id));

  useEffect(() => {
    //Request for new numPage
    setProductInfo(getProductInfo(id));
  }, [id]);

  return (
    <Link
      className={clsx(styles.cardContainer)}
      to={
        '/' //link to view product
      }
    >
      <Card className={clsx(styles.cardBody)}>
        <CardMedia
          className={clsx(styles.productImage)}
          component="img"
          image={productInfo.image}
          alt={productInfo.name}
        />
        <div className={clsx(styles.cardContent)}>
          <div className={clsx(styles.cardHeader)}>
            <p className={clsx(styles.cardTitle)}>{productInfo.name}</p>
            <strong
              className={clsx(styles.cardPrice)}
            >{`${productInfo.price} đ`}</strong>
          </div>

          <div className={clsx(styles.productContent)}>
            <div className={clsx(styles.productRating)}>
              <Rating
                className={clsx(styles.rating)}
                value={productInfo.rate}
                disabled
              />
              <span className={clsx(styles.selledNumber)}>
                Đã bán: {productInfo.selled}
              </span>
            </div>
            <span className={clsx(styles.location)}>
              <LocationOnIcon className={clsx(styles.locationIcon)} />
              {productInfo.location}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
export default memo(ProductCard);
