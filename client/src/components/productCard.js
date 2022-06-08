import React from 'react';
import Card from '@mui/material/Card';
import clsx from 'clsx';
import styles from './CSS/ProductCardCSS.module.scss';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CardMedia from '@mui/material/CardMedia';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import axios from '../config/axios';

//for sample data
import productSampleImage from '../assets/Product/productSampleImage.jpeg';

function ProductCard(id) {
  var productId = id;
  const GET_PRODUCT_URL = ''; //url to request product info
  const getProductInfo = async (id) => {
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
  };

  // const productInfo = getProductInfo(productId);
  // sample data
  productId = 1;
  const productInfo = {
    id: productId,
    image: productSampleImage,
    name: 'Lorem Ipsum is simply dummy text of the printing',
    price: 600000,
    selled: 32032,
    rate: 3,
    location: 'Hà Nội',
  };

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
        <Box className={clsx(styles.cardContent)}>
          <Box className={clsx(styles.cardHeader)}>
            <p className={clsx(styles.cardTitle)}>{productInfo.name}</p>
            <strong
              className={clsx(styles.cardPrice)}
            >{`${productInfo.price} đ`}</strong>
          </Box>

          <Box className={clsx(styles.productContent)}>
            <Rating
              className={clsx(styles.rating)}
              value={productInfo.rate}
              disabled
            />
            <span className={clsx(styles.selledNumber)}>
              Đã bán: {productInfo.selled}
            </span>
            <span className={clsx(styles.location)}>
              <LocationOnIcon />
              {productInfo.location}
            </span>
          </Box>
        </Box>
      </Card>
    </Link>
  );
}
export default ProductCard;
