import Header from '../components/header';
import Footer from '../components/footer';
import styles from './CSS/seller_acceptOrder.module.css';
import InformationTab from '../components/informationTab';
import Search from '../components/search';


function AcceptOrder({navigation}) {
    return (
      <div className={styles.Home}>
        <Header navigation={navigation}/>
        <div className={styles.content} >
            <div className={styles.tab1} >
              <InformationTab/>

            </div>

            <div className={styles.tab2} >
              <Search/>
            </div>
        </div>
        <Footer navigation={navigation}/>
        
      </div>
    );
  }
  
  export default AcceptOrder;