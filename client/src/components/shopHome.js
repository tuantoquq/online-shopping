import Header from './header';
import Footer from './footer';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import styles from '../screens/CSS/home.module.css';
import styleShop from '../screens/CSS/shop.module.css';
import stylesProduct from '../screens/CSS/productInfor.module.css';
import imageTest from '../assets/testproduct.jpg'
import ProductCategory from '../components/productCategory';
import ProductPopular from '../components/productPopular';
import RecommendProduct from '../components/recommendProduct';

function ShopHome({navigation}) {
    return (
      <div className={styles.Home}>
        <Header navigation={navigation}/>
        <div className={styles.content} >
          <div className={styleShop.wraper}>
            <div className={styleShop.subwraper}>
                <div className={stylesProduct.footFake}>
                <p>  </p>
                </div>
                <div className={styleShop.avatarshop}>
                    <div className="image">
                        <Card sx={{ maxWidth: 100, minWidth: 100 }}>
                        <CardActionArea>
                            <CardMedia
                            component="img"
                            image={imageTest}
                            alt="green iguana"
                            />
                        </CardActionArea>
                        </Card>
                    </div>
                    <div className={styleShop.nameshop}>
                        <h3>Shop Mo Hinh</h3>
                    </div>
                </div>
                <div className={stylesProduct.footFake}>
                <p>  </p>
                </div>
            </div>
            <div>
                <div className={styleShop.colInformation}>
                    <div className={styleShop.colInformation_1}>
                        <h3>Sản phẩm: 300</h3>
                    </div>
                    <div>
                        <h3>Đánh giá: 4.5 (189 danh gia)</h3>
                    </div>
                </div>
                <div className={styleShop.colInformation}>
                    <div className={styleShop.colInformation_1}>
                        <h3>Địa chỉ: Ha Noi</h3>
                    </div>
                    <div>
                        <h3>Đã tham gia: 4 nam truoc</h3>
                    </div>
                </div>
            </div>
          </div>
          <div className={styles.wraper}>
            <p className={styles.tdisplay}> Thông tin shop </p>
            <div className={styleShop.inforshop}>
              <div>
                <div>Yuki có rất nhiều các mặt hàng Anime/Manga: mô hình chính hãng, móc khóa, nhồi bông, postcard, standee, sổ tay,...</div>
                <div>- Facebook: Otaku Yuki Shop</div>
                <div>- Địa chỉ: 146/22 Vũ Tùng, P2, Bình Thạnh, HCM</div>
                <div>- SĐT: 0388852343 (Mở cửa từ 10-20h hằng ngày)</div>
              </div>
            </div>
            <div className={stylesProduct.footFake}>
                <p>  </p>
            </div>
          </div>

          <div className={styles.wraper}>
            <p className={styles.tdisplay}>Sản phẩm bán chạy</p>
            <ProductPopular/>
          </div>     

          <div className={styles.wraper}>
            <p className={styles.tdisplay}>Tất cả sản phẩm</p>
            <ProductCategory/>
          </div>


        </div>
        <Footer navigation={navigation}/>
      </div>
    );
  }
  
  export default ShopHome;