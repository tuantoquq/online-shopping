import Header from './header';
import Footer from './footer';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import styles from '../screens/CSS/home.module.css';
import stylesProduct from '../screens/CSS/productInfor.module.css';
import imageTest from '../assets/testproduct.jpg'
import { Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import ButtonChangeValue from './buttonChangeValue';
import UserRating from './userRating';

function ProductInformation({navigation}) {
    return (
      <div className={styles.Home}>
        <Header navigation={navigation}/>
        <div className={styles.content} >
          <div className={styles.wraper}>
            <p className={styles.tdisplay}> Thong tin san pham </p>
            <div className={stylesProduct.productImage}>
              <div className="image">
                <Card sx={{ maxWidth: 345, minWidth: 300 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={imageTest}
                      alt="green iguana"
                    />
                  </CardActionArea>
                </Card>
              </div>
              <div className={stylesProduct.productTitle}>
                  <h2> Rubik GAN Monster GO 2x2 / 3x3 / Pyraminx / Skewb Stickerless - Monster GO 3x3 M Có Nam Châm </h2>
                  <div  className={stylesProduct.soldInfo}>               
                    <h3>3</h3>
                    <div className={stylesProduct.ratingInfo}>                  
                      <Rating name="half-rating-read" defaultValue={3} readOnly />
                    </div>       
                    <div className={stylesProduct.tap}>
                      <h3> | 123 Đánh giá | 1 Đã bán </h3>  
                    </div>              
                  </div>
                  <div className={stylesProduct.selldisplay}>
                    <p>1000000 VND</p>
                  </div>
                  <div className={stylesProduct.colInformation}>
                    <div className={stylesProduct.colInformation_2}>
                      <h3> Gui tu </h3>  
                    </div>
                    <div>
                      <h3> Ha Noi </h3>  
                    </div>      
                  </div>
                  <div className={stylesProduct.colInformation}>
                    <div className={stylesProduct.colInformation_2}>
                      <h3> So luong </h3>  
                    </div>
                    <ButtonChangeValue 
                      titleLeft="-"
                      titleRight="+"
                      startValue={0}
                      numberProduct={189}
                    />       
                  </div>
                  <div className={stylesProduct.soldInfo}>
                    <button className={stylesProduct.button2} variant="light" onClick={() => console.log("them")}> Thêm vào giỏ hàng </button>
                    <button className={stylesProduct.button2}> Mua ngay </button>                    
                  </div>
                  <p className={styles.tdisplay}> </p>

              </div>
            </div>
            <div className={stylesProduct.footFake}>
              <p>  </p>
            </div>
          </div>
          <div className={styles.wraper}>
            <div className={stylesProduct.productImage}>
              <div className="image">
                <Card sx={{ maxWidth: 45, maxHeight: 45, marginTop : 0.5, marginBottom : 0.5}}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={imageTest}
                      alt="green iguana"
                    />
                  </CardActionArea>
                </Card>
              </div>
              <div className={stylesProduct.productTitle}>
                <Link to='/testShop' >
                  <h2>
                    Shop Mo Hinh
                  </h2>
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.wraper}>
            <p className={styles.tdisplay}> Chi Tiet san pham </p>
            <div className={stylesProduct.colInformation}>
              <div className={stylesProduct.colInformation_1}>
                Loai san pham
              </div>
              <div>
                Mo Hinh
              </div>
            </div>

            <div className={stylesProduct.colInformation}>
              <div className={stylesProduct.colInformation_1}>
                Kho hang
              </div>
              <div>
                10
              </div>
            </div>

            <div className={stylesProduct.colInformation}>
              <div className={stylesProduct.colInformation_1}>
                Gui tu
              </div>
              <div>
                Ha Noi
              </div>
            </div>

            <div className={stylesProduct.colInformation}>
              <div className={stylesProduct.colInformation_1}>
                Mo ta san pham
              </div>
              <div>
                <div>Mô Hình Nendoroid Nino Nakano - Nendoroid 1612 Gotoubun No Hanayome</div>
                <div>Có thể thay đổi tay chân, khuôn mặt như trong ảnh</div>
                <div>- Kích thước: 10cm</div>
                <div>- Công ty sản xuất: GSC</div>
              </div>
            </div>

          </div>
          <div className={styles.wraper}>
            <p className={styles.tdisplay}> Danh gia san pham </p>
            <div className={stylesProduct.colInformation}> 
              <div>    
                <h3 className={stylesProduct.ratingScore}> 3 / 5 </h3>
                <div className={stylesProduct.ratingInfo}>                  
                  <Rating name="half-rating-read" defaultValue={3} readOnly />
                </div>
              </div>  
              <div>
                <h3  className={stylesProduct.ratingScore}> 123 Đánh giá  </h3>  
              </div>      
            </div>
            
            <UserRating
              imageTest={imageTest}
              userName="Kito"
              ratingScore={5}
              timeRate="14:30:00 29/05/2022"
              comment="San pham dep"
            />

            <UserRating
              imageTest={imageTest}
              userName="Ayano"
              ratingScore={4}
              timeRate="14:30:00 29/04/2022"
              comment="San pham tot"
            />

            <UserRating
              imageTest={imageTest}
              userName="Mitsuha"
              ratingScore={4}
              timeRate="14:30:00 05/05/2022"
              comment="Nino is the best"
            />

          </div>
        </div>
        <Footer navigation={navigation}/>
      </div>
    );
  }
  
  export default ProductInformation;