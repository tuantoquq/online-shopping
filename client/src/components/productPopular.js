import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import { Grid } from '@mui/material';
import axiosConfig from '../config/axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ProductPopular({ productPopular }) {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      style={{ padding: "10px" }}
    >
      {productPopular?.map((product, index) => {
        let product_name = product?.productName
          .split(" ")
          .slice(0, 5)
          .join(" ");
        return (
          <Grid item xs={2} sm={1} md={2} key={index}>
            <Link
              to={"/ProductTest/" + product?._id}
              style={{ "text-decoration": "none" }}
            >
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="100"
                    image={product?.imageUrls[0]?.base_url}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="p" component="div">
                      {product_name}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="p"
                      component="div"
                      color="red"
                    >
                      đ {product?.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>
        );
      })}
    </Grid>
  );
}
export default ProductPopular
