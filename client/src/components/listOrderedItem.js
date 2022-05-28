import styles from './CSS/listOrderedItem.module.css'
import Stack from '@mui/material/Stack';
import clsx from 'clsx';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';

import { Grid } from '@mui/material';
function ListOrderedItem(){
    return (
    //     <div className="row">
    //         <div className={styles.columns}>
    //             <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 3, md: 12 }}  style={{padding:'5px'}}>
    //                 <Grid item xs={2} sm={1} md={1}>
    //                     <Card sx={{ maxWidth: 345 }}>
    //                         <CardActionArea>
    //                         <CardMedia
    //                             component="img"
    //                             height="60"
    //                             image="/static/images/cards/contemplative-reptile.jpg"
    //                             alt="green iguana"
    //                         />
    //                         <CardContent>
    //                             <Typography gutterBottom variant="h5" component="div">
    //                             Sản phẩm
    //                             </Typography>
    //                         </CardContent>
    //                         </CardActionArea>
    //                     </Card>
    //                 </Grid>
    //             </Grid>
    //         </div>
    //         <div className={styles.column}>
    //             <p>Tên sản phẩm</p>
    //             <p>Số lượng</p>
    //         </div>
    //         <div className={styles.lastColumn}>
    //             <p>Giá</p>
    //         </div>
    //     </div>
        <div className={styles.container}>
            <img
                src="/static/images/cards/contemplative-reptile.jpg"
                alt="green iguana"
                height={150}
            ></img>
            <p className={styles.middle}>
                Tên sản phẩm <br />
                <br></br>
                Số lượng <br />
            </p>
            <p className={styles.last}>Giá sản phẩm</p>
            <p className={styles.footer}>Tổng tiền</p>
            <Button className={styles.button}>Mua lại</Button>
        </div>
    )
}

export default ListOrderedItem