import Header from '../components/header';
import Footer from '../components/footer';
import styles from './CSS/home.module.css';
import ProductCategory from '../components/productCategory';
import ProductPopular from '../components/productPopular';
import RecommendProduct from '../components/recommendProduct';
import { useEffect, useState } from "react";
import axiosConfig from "../config/axios";

function Home({ navigation }) {

  const [category, setCategory] = useState();
  const [productPopular, setProductPopular] = useState();
  const [recommendProduct, setRecommendProduct] = useState();
  useEffect(() => {
    axiosConfig
      .get("/category/get?all=true")
      .then((res) => {
        setCategory(res.data.data.slice(0, 12));
      })
      .catch((err) => {
        console.log(err);
      });

    axiosConfig
      .get("/product/top-6-selling")
      .then((res) => {
        setProductPopular(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axiosConfig
      .get("/product/top-30-recommend")
      .then((res) => {
        setRecommendProduct(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.Home}>
      <Header navigation={navigation} />
      <div className={styles.content}>
        <div className={styles.wraper}>
          <p className={styles.tdisplay}>Danh mục</p>
          <ProductCategory category={category} />
        </div>

        <div className={styles.wraper}>
          <p className={styles.tdisplay}>Sản phẩm bán chạy</p>
          <ProductPopular productPopular={productPopular} />
        </div>

        <div className={styles.wraper}>
          <p className={styles.tdisplay}>Gợi ý hôm nay</p>
          <RecommendProduct recommendProduct={recommendProduct} />
        </div>
      </div>
      <Footer navigation={navigation} />
    </div>
  );
}
  
  export default Home;