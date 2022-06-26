import React, { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import axios from '../config/axios';
import clsx from 'clsx';
import styles from './CSS/ProductCardCSS.module.scss';
import Card from '@mui/material/Card';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';

function ProductCard(props) {
  //  console.log('re-render product card', id);
  const id = props.productId;
  const GET_PRODUCT_URL = '/product/get?productId=' + id._id; //url to request product info

  const [productInfo, setProductInfo] = useState({});

  useEffect(() => {
    console.log(JSON.stringify({ productId: id._id }));
    async function getProduct() {
      try {
        const response = await axios.get(
          GET_PRODUCT_URL,
          JSON.stringify({ productId: id._id }),
          {
            headers: {
              'Content-Type': 'application/json',
            },
            // withCredentials: true,
          }
        );
        console.log(response);
        const data = response.data.data;
        console.log(Math.floor(data.ratingStar));
        let name = '';
        if (data.productName.length <= 53) {
          name = data.productName;
        } else {
          name = data.productName.substring(0, 50) + '...';
        }
        const product = {
          name: name,
          rate: Math.floor(data.ratingStar),
          selled: data.soldHistory,
          price: data.price,
          image: data.imageUrls[0].base_url,
        };
        setProductInfo(product);
      } catch (err) {
        console.log(err);
      }
    }
    getProduct();
  }, []);

  return (
    <Link
      className={clsx(styles.cardContainer)}
      to={
        '/product/' + id._id //link to view product
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
