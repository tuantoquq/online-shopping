import Header from '../components/header';
import Footer from '../components/footer';
import styles from './CSS/seller_acceptOrder.module.css';
import InformationTab from '../components/informationTab';
import Search from '../components/search';
import OrderProduct from '../components/orderProduct';

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
              <OrderProduct type = {0}/>
              <OrderProduct type = {1}/>
              <OrderProduct type = {2}/>
              <OrderProduct type = {2}/>
              
            </div>
        </div>
        <Footer navigation={navigation}/>
        
      </div>
    );
  }
  
  export default AcceptOrder;