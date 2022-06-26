import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import stylesProduct from '../screens/CSS/productInfor.module.css';
import { Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import ImageList from './ImageList';

function UserRating({imageAvatar, userName, ratingScore, timeRate, comment, imageProduct}){
    return(
        <div className={stylesProduct.productImage}>
        <div className="image">
          <Card sx={{ maxWidth: 45, maxHeight: 45, marginTop : 0.5, marginBottom : 0.5}}>
            <CardActionArea>
              <CardMedia
                component="img"
                image={imageAvatar}
                alt="green iguana"
              />
            </CardActionArea>
          </Card>
        </div>
        <div className={stylesProduct.productTitle}>
          <Link to='/testShop' >
            <h4>
              {userName}
            </h4>
          </Link>
          <div className={stylesProduct.ratingUser}>                  
            <Rating name="half-rating-read" defaultValue={ratingScore} readOnly size="small" />
          </div>
          <div className={stylesProduct.ratingUser}>                  
            <h5>{timeRate}</h5>
          </div>
          <div className={stylesProduct.ratingUser}>                  
            <p>{comment}</p>
          </div>
          {imageProduct?.length > 0 && (
            <div style={{marginTop: "-50px"}}>
              <ImageList images={imageProduct}/>
            </div>
          )}

        </div>
      </div>
    )
}

export default UserRating;