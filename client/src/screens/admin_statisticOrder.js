import Header from '../components/header';
import Footer from '../components/footer';
import styles from './CSS/admin_statistic.module.css';
import Search from '../components/search';
import OrderProduct from '../components/orderProduct';
import AdminSidebar from '../components/adminSidebar';
import ApexChart from '../components/lineChart';

function StatisticOrder({ navigation }) {
  return (
    <div className={styles.Home}>
      <Header navigation={navigation} />
      <div className={styles.content}>
        <div className={styles.tab1}>
          <AdminSidebar select="statistic-order" />
        </div>

        <div className={styles.tab2}>
          <ApexChart />
        </div>
      </div>
      <Footer navigation={navigation} />
    </div>
  );
}
export default StatisticOrder;