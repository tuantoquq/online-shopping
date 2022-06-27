
import styles from './CSS/productItem.module.css'
import clsx from 'clsx'
import axiosConfig from '../config/axios';
import {useState, useEffect} from 'react';

function ProductItem({productId, quantity,}){
    const [productData, setProductData] = useState();
    const [itemCount, setItemCount] = useState(parseInt(quantity));
    let path = `/product/get?productId=${productId}`
    useEffect(()=>{
      axiosConfig.get(path).then(async res=>{
        setProductData(res?.data?.data)
      })
      .catch(err=>{
        console.log(err)
      })

    },[])
    return (
        <div className={clsx(styles.all,styles.elm1)}>
            <img src='assets/laptop.jpg' className={styles.image}/>
            <div className={styles.left_comp}>
                <div className={styles.comp1}>
                    <p>{productData?.productName}</p>
                    <p>Giá sản phẩm : {productData?.price}</p>
                    <p>Số lượng: {itemCount}</p>
                </div>

                <div className={styles.comp2}>
                        <p className={styles.product_price}>{Number(productData?.price) * itemCount}</p>
                </div>
            </div>
        </div>
    )

}

export default ProductItem