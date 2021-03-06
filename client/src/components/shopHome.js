import Header from './header';
import Footer from './footer';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, darken } from '@mui/material';
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
  let pathShop = `/shops/profile?shopId=${s[s.length-1]}`
  let pathProduct = `/shops/list-products?shopId=${s[s.length-1]}&limit=1000`
  useEffect(()=>{
    axiosConfig.get(pathShop).then(async res=>{
      let data = res.data.data
      let date = new Date(data?.createAt);
      setShopData({...data,'createAt':date.toLocaleString()})

      console.log(data?.createAt)
      console.log(date.toLocaleTimeString())
      await axiosConfig.get(pathProduct).then(res=>{
        setProductData(res?.data?.data?.products)
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
                        <h3>S???n ph???m: {productData?.length}</h3>
                    </div>
                </div>
                <div className={styleShop.colInformation}>
                    <div className={styleShop.colInformation_1}>
                        <h3>?????a ch???: {shopData?.address}</h3>
                    </div>
                    <div>
                        <h3>???? tham gia: {shopData?.createAt}</h3>
                    </div>
                </div>
            </div>
          </div>
          {/* <div className={styles.wraper}>
            <p className={styles.tdisplay}> Th??ng tin shop </p>
            <div className={styleShop.inforshop}>
              <div>
                <div>Yuki c?? r???t nhi???u c??c m???t h??ng Anime/Manga: m?? h??nh ch??nh h??ng, m??c kh??a, nh???i b??ng, postcard, standee, s??? tay,...</div>
                <div>- Facebook: Otaku Yuki Shop</div>
                <div>- ?????a ch???: 146/22 V?? T??ng, P2, B??nh Th???nh, HCM</div>
                <div>- S??T: 0388852343 (M??? c???a t??? 10-20h h???ng ng??y)</div>
              </div>
            </div>
            <div className={stylesProduct.footFake}>
                <p>  </p>
            </div>
          </div> */}

          <div className={styles.wraper}>
            <p className={styles.tdisplay}>T???t c??? s???n ph???m</p>
            <ShopListProduct listProduct={productData}/>
          </div>


        </div>
        <Footer navigation={navigation}/>
      </div>
    );
  }
  
  export default ShopHome;