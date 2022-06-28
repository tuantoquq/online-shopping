import Header from './header';
import Footer from './footer';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea } from '@mui/material';
import styles from '../screens/CSS/home.module.css';
import stylesProduct from '../screens/CSS/productInfor.module.css';
import imageTest from '../assets/testproduct.jpg'
import { Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import ButtonChangeValue from './buttonChangeValue';
import UserRating from './userRating';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosConfig from '../config/axios';
import {addCartItem } from '../service/CustomerService';
function ProductInformation({navigation}) {
    const navigate = useNavigate();
    const [productData,setProductData] = useState()
    const [productCategory,setProductCategory] = useState()
    const [comments,setComment] = useState()


    let s = window.location.href.split('/')
    let path = `/product/get?productId=${s[s.length-1]}`
    // '/product/get?productId=629e172caf24631642b441ee'
    useEffect(()=>{
      axiosConfig.get(path).then(async res=>{
        setProductData(res.data.data)
        console.log(res.data.data?.categoryId)
        let pathCategory = `/category/get?categoryId=${res.data.data?.categoryId}`
        await axiosConfig.get(pathCategory).then(res=>{
          setProductCategory(res.data.data)
        })
        .catch(err=>{
          console.log(err)
        })

        let pathComment = '/comments?productId=629e16a6af24631642b44151'
        await axiosConfig.get(pathComment).then(res=>{
          setComment(res.data.data)
          console.log(res.data.data)
          // comments?.map((comment) => {console.log(comment)})
        })
        .catch(err=>{
          console.log(err)
        })

      })
      .catch(err=>{
        console.log(err)
      })

    },[])

    let star = parseFloat(productData?.ratingStar)


    const navigatePath = function (path) {
      if (window.location.pathname !== path) {
        navigate(path);
      }
    };
  
    return (
      <div className={styles.Home}>
        <Header navigation={navigation}/>
        <div className={styles.content} >
          <div className={styles.wraper}>
            <p className={styles.tdisplay}> Thông tin chi tiết sản phẩm </p>
            <div className={stylesProduct.productImage}>
              <div className="image">
                <Card sx={{ maxWidth: 345, minWidth: 300 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={productData?.imageUrls[0].base_url}
                      alt="green iguana"
                    />
                  </CardActionArea>
                </Card>
              </div>
              <div className={stylesProduct.productTitle}>
                  <h2> {productData?.productName} </h2>
                  <div  className={stylesProduct.soldInfo}>               
                    <h3> {productData?.ratingStar} </h3>
                    <div className={stylesProduct.ratingInfo}>                  
                      <Rating name="half-rating-read" value={star} precision={0.1}  readOnly />
                    </div>       
                    <div className={stylesProduct.tap}>
                      <h3> {`| ${productData?.ratingCount} Đánh giá | ${productData?.soldHistory} Đã bán `} </h3>
                    </div>              
                  </div>
                  <div className={stylesProduct.selldisplay}>
                    <p>{` ${productData?.price} VND `}</p>
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
                      <h3> Số lượng </h3>  
                    </div>
                    <ButtonChangeValue 
                      titleLeft="-"
                      titleRight="+"
                      startValue={0}
                      numberProduct={productData?.count}
                    />       
                  </div>
                  <div className={stylesProduct.soldInfo}>
                    <div className={stylesProduct.button2}>
                      <Button variant="contained" onClick={() => 
                        addCartItem({productId: s[s.length-1], quantity:1}).then(res => {
                          console.log(res.data);
                      })
                        }> Thêm vào giỏ hàng </Button>
                    </div>
                    <div className={stylesProduct.button2}>
                      <Button variant="contained" onClick={() => {
                        addCartItem({productId: s[s.length-1], quantity:1}).then(res => {
                          console.log(res.data);
                        });
                        navigatePath("/cart")
                        }}> Mua ngay </Button>                         
                    </div>
                 
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
            <p className={styles.tdisplay}> Chi tiết sản phẩm </p>
            <div className={stylesProduct.colInformation}>
              <div className={stylesProduct.colInformation_1}>
                Loại sản phẩm
              </div>
              <div>
                {productCategory?.categoryName}
              </div>
            </div>

            <div className={stylesProduct.colInformation}>
              <div className={stylesProduct.colInformation_1}>
                Kho hàng
              </div>
              <div>
                {productData?.count}
              </div>
            </div>

            <div className={stylesProduct.colInformation}>
              <div className={stylesProduct.colInformation_1}>
                Gửi từ
              </div>
              <div>
                Ha Noi
              </div>
            </div>

            <div className={stylesProduct.colInformation}>
              <div className={stylesProduct.colInformation_1}>
                Mô tả sản phẩm
              </div>
              <div className={stylesProduct.colInformation_3}>
                <div>{productData?.shortDescription}</div>
              </div>
            </div>

          </div>
          <div className={styles.wraper}>
            <p className={styles.tdisplay}> Đánh giá sản phẩm </p>
            <div className={stylesProduct.colInformation}> 
              <div>    
                <h3 className={stylesProduct.ratingScore}> {`${star} / 5`} </h3>
                <div className={stylesProduct.ratingInfo}>                  
                  <Rating name="half-rating-read" value={star} readOnly />
                </div>
              </div>  
              <div>
                <h3  className={stylesProduct.ratingScore}> {`${productData?.ratingCount} Đánh giá`}  </h3>  
              </div>      
            </div>
            
            {comments?.map((comment) => {
              return(
                <UserRating
                  imageTest={imageTest}
                  userName="Kito"
                  ratingScore={comment?.ratingStar}
                  timeRate={comment?.createdAt}
                  comment={comment?.content}
                  imageProduct={comment?.images}
                />
              )
            })
            }
            
            {/* <UserRating
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
            /> */}

          </div>
        </div>
        <Footer navigation={navigation}/>
      </div>
    );
  }
  
  export default ProductInformation;