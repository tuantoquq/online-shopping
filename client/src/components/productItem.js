
import styles from './CSS/productItem.module.css'
import clsx from 'clsx'


function ProductItem(){

    return (
        <div className={clsx(styles.all,styles.elm1)}>
            <img src='assets/laptop.jpg' className={styles.image}/>
            <div className={styles.left_comp}>
                <div className={styles.comp1}>
                    <p>Laptop Dell</p>
                    <p>Phân loại hàng: laptop Gaming</p>
                    <p>x1</p>
                </div>

                <div className={styles.comp2}>
                        <p className={styles.product_price}>đ 150.000</p>
                </div>
            </div>
        </div>
    )

}

export default ProductItem