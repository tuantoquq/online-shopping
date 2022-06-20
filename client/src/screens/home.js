import Header from '../components/header';
import Footer from '../components/footer';
import styles from './CSS/home.module.css';
import ProductCategory from '../components/productCategory';
import ProductPopular from '../components/productPopular';
import RecommendProduct from '../components/recommendProduct';




function Home({navigation}) {

    return (
      <div className={styles.Home}>
        <Header navigation={navigation}/>
        <div className={styles.content} >
          <div className={styles.wraper}>
            <p className={styles.tdisplay}>Danh mục</p>
            <ProductCategory/>
          </div>

          <div className={styles.wraper}>
            <p className={styles.tdisplay}>Sản phẩm bán chạy</p>
            <ProductPopular/>
          </div>

          <div className={styles.wraper}>
            <p className={styles.tdisplay}>Gợi ý hôm nay</p>
            <RecommendProduct/>
          </div>
           
        </div>
        <Footer navigation={navigation}/>
        
      </div>
    );
  }
  
  export default Home;