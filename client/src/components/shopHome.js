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
import { useEffect, useState } from "react";
import axiosConfig from "../config/axios";
import ShopListProduct from './ShopListProduct';

const defautlAvatar =
  'https://res.cloudinary.com/trinhvanthoai/image/upload/v1655489389/thoaiUploads/defaultAvatar_jxx3b9.png';

function ShopHome({navigation}) {
  const [shopData, setShopData] = useState();
  const [productData, setProductData] = useState();

  let s = window.location.href.split('/')
  let tmp = '629ddb1583ec9b8c8547522d'
  let pathShop = `/shops/profile?shopId=${tmp}`
  let pathProduct = `/shops/list-products?shopId=${tmp}&limit=100`
  useEffect(()=>{
    axiosConfig.get(pathShop).then(async res=>{
      setShopData(res.data.data)
      let date = new Date(shopData?.createAt);
      console.log(date.toLocaleTimeString())
      await axiosConfig.get(pathProduct).then(res=>{
        setProductData(res?.data?.data?.products)
        console.log(productData)
      })
      .catch(err=>{
        console.log(err)
      })
    })
    .catch(err=>{
      console.log(err)
    })

  },[])

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
                            image={defautlAvatar}
                            alt="green iguana"
                            />
                        </CardActionArea>
                        </Card>
                    </div>
                    <div className={styleShop.nameshop}>
                        <h3>{shopData?.shopName}</h3>
                    </div>
                </div>
                <div className={stylesProduct.footFake}>
                <p>  </p>
                </div>
            </div>
            <div>
                <div className={styleShop.colInformation}>
                    <div className={styleShop.colInformation_1}>
                        <h3>Sản phẩm: {productData?.length}</h3>
                    </div>
                </div>
                <div className={styleShop.colInformation}>
                    <div className={styleShop.colInformation_1}>
                        <h3>Địa chỉ: {shopData?.address}</h3>
                    </div>
                    <div>
                        <h3>Đã tham gia: {shopData?.createAt}</h3>
                    </div>
                </div>
            </div>
          </div>
          {/* <div className={styles.wraper}>
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
          </div> */}

          <div className={styles.wraper}>
            <p className={styles.tdisplay}>Tất cả sản phẩm</p>
            <ShopListProduct listProduct={productData}/>
          </div>


        </div>
        <Footer navigation={navigation}/>
      </div>
    );
  }
  
  export default ShopHome;