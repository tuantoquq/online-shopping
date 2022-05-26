import Header from '../components/header';
import Footer from '../components/footer';
import styles from './CSS/home.module.css';
import ProductCategory from '../components/productCategory';
import BestSell from '../components/bestSell';





function Home({navigation}) {
    return (
      <div className={styles.Home}>
        <Header navigation={navigation}/>
        <div className={styles.content} >
          <div>
            <strong className={styles.tdisplay}>Danh mục</strong>
            <ProductCategory/>
          </div>

          <div>
            <strong className={styles.tdisplay}>Sản phẩm bán chạy</strong>
            <BestSell/>
          </div>
           
        </div>
        <Footer navigation={navigation}/>
        
      </div>
    );
  }
  
  export default Home;