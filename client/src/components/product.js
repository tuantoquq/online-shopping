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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const defautlAvatar =
  'https://res.cloudinary.com/trinhvanthoai/image/upload/v1655489389/thoaiUploads/defaultAvatar_jxx3b9.png';

function ProductInformation({navigation}) {
    const navigate = useNavigate();
    const [productData,setProductData] = useState()
    const [productCategory,setProductCategory] = useState()
    const [comments,setComment] = useState()
    const [shopData, setShopData] = useState()
    const [quantity, setQuantity] = useState(1)

    function handle_plus() {
        setQuantity(quantity + 1)
    }
    function handle_minus() {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }
    function handle_write(count) {
        setQuantity(count);
    }
    let s = window.location.href.split('/')
    let path = `/product/get?productId=${s[s.length-1]}`
    // '/product/get?productId=629e172caf24631642b441ee'
    useEffect(()=>{
      axiosConfig.get(path).then(async res=>{
        setProductData(res.data.data)
        let pathCategory = `/category/get?categoryId=${res.data.data?.categoryId}`
        await axiosConfig.get(pathCategory).then(res=>{
          setProductCategory(res.data.data)
        })
        .catch(err=>{
          console.log(err)
        })

        let pathComment = `/comments?productId=${s[s.length-1]}`
        await axiosConfig.get(pathComment).then(res=>{
          setComment(res.data.data)
          // comments?.map((comment) => {console.log(comment)})
        })
        .catch(err=>{
          console.log(err)
        })

        let pathShop = `/shops/profile?shopId=${res.data.data?.shopId}`
        await axiosConfig.get(pathShop).then(res=>{
          setShopData(res.data.data)
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
                      <h3> Gửi từ </h3>  
                    </div>
                    <div>
                      <h3> {shopData?.address} </h3>  
                    </div>      
                  </div>
                  <div className={stylesProduct.colInformation}>
                    <div className={stylesProduct.colInformation_2}>
                      <h3> Số lượng </h3>  
                    </div>
                    <ButtonChangeValue 
                      titleLeft="-"
                      titleRight="+"
                      startValue={1}
                      numberProduct={productData?.count}
                      plus={handle_plus} minus={handle_minus} write={handle_write}
                    />       
                  </div>
                  <div className={stylesProduct.soldInfo}>
                    <div className={stylesProduct.button2}>
                      <Button variant="contained" onClick={() => 
                        addCartItem({productId: s[s.length-1], quantity: quantity}).then(res => {
                          console.log(res.data);
                          toast.success('Đã thêm vào giỏ hàng!!!')
                      })
                        }> Thêm vào giỏ hàng </Button>
                    </div>
                    <div className={stylesProduct.button2}>
                      <Button variant="contained" onClick={() => {
                        addCartItem({productId: s[s.length-1], quantity: quantity}).then(res => {
                          console.log(res.data);
                          navigatePath("/cart")
                        });
                        
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
                      image={defautlAvatar}
                      alt="green iguana"
                    />
                  </CardActionArea>
                </Card>
              </div>
              <div className={stylesProduct.productTitle}>
                <Link to={"/shop/" + shopData?._id} >
                  <h2>
                    {shopData?.shopName}
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
                {shopData?.address}
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
                  imageAvatar={comment?.customer?.avatarUrl}
                  userName={`${comment?.customer?.firstName} ${comment?.customer?.lastName}`}
                  ratingScore={comment?.ratingStar}
                  timeRate={(new Date(comment?.createdAt)).toLocaleString()}
                  comment={comment?.content}
                  imageProduct={comment?.images}
                />
              )
            })
            }
          </div>
          <ToastContainer />
        </div>
        <Footer navigation={navigation}/>
      </div>
    );
  }
  
  export default ProductInformation;