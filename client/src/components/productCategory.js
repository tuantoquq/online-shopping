import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import LinkToProduct from '../components/inforProduct';
import { useEffect, useState } from "react";
import axiosConfig from "../config/axios";

function ProductCategory() {
  const [category, setCategory] = useState();
  useEffect(() => {
    axiosConfig
      .get("/category/get?all=true")
      .then((res) => {
        setCategory(res.data.data.slice(0, 12));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      style={{ padding: "5px" }}
    >
      {category?.map((item, index) => (
        <Grid item xs={2} sm={1} md={2} key={index}>
          <Card sx={{ maxWidth: 345, height: 200 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="60"
                image={item.imageUrl}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  <LinkToProduct
                    urlProduct="ProductTest"
                    productName={item.categoryName}
                  ></LinkToProduct>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductCategory;