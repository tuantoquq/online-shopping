
import styles from './CSS/productItem.module.css'
import clsx from 'clsx'
import axiosConfig from '../config/axios';
import {useState, useEffect} from 'react';

function ProductItem(props){
    let data = props?.data
    let order_id = props?.order_id
    console.log(data)
    // const [productData, setProductData] = useState();
    // const [itemCount, setItemCount] = useState(parseInt(quantity));
    // let path = `/product/get?productId=${productId}`
    // useEffect(()=>{
    //   axiosConfig.get(path).then(async res=>{
    //     setProductData(res?.data?.data)
    //   })
    //   .catch(err=>{
    //     console.log(err)
    //   })

    // },[])
    return (
      <>
      {
        data?.map((productData,index)=>
        <div className={clsx(styles.all,styles.elm1)} index={index}>
            <img src={productData?.productImageUrl} className={styles.image}/>
            <div className={styles.left_comp}>
                <div className={styles.comp1}>
                    <p>{productData?.productName}</p>
                    <p>Giá sản phẩm : {productData?.currentPrice}</p>
                    <p>Số lượng: {productData?.count}</p>
                </div>

                <div className={styles.comp2}>
                        <p className={styles.product_price}>{Number(productData?.currentPrice) * productData?.count}</p>
                </div>
            </div>
        </div>
        )

      }
        
      </>
      
    )

}

export default ProductItem