import React from 'react';
import clsx from 'clsx';
import styles from './CSS/FooterCSS.module.css';
import logoImage from '../assets/logo-design.png';
import appStore from '../assets/app-store.png';
import appStore1 from '../assets/app-store2.png';
import playStore from '../assets/play-store.png';
import playStore1 from '../assets/play-store2.png';

function Footer() {
  return (
    <div className={clsx(styles.footer, styles.textColor)}>
      <div className={styles.footerCol_1}>
        <h3>About Us</h3>
        <p>Giám đỐc: Nguyễn Hoàng Anh Tuấn</p>
        <p>+84376180160</p>
        <p>Địa chỉ: Số 1, Đại Cồ Việt, Hai Bà Trưng, Hà Nội</p>
      </div>
      <div className={styles.footerCol_2}>
        <h3>Help</h3>
        <a href="/">
          <p>FAQS</p>
        </a>
        <a href="/">
          <p>Điều khoản sử dụng</p>
        </a>
        <a href="/">
          <p>Quảng cáo</p>
        </a>
      </div>

      <div className={styles.footerCol_3}>
        <img src={logoImage} className={styles.col_3_logo} alt="" />
        <p>Trang thương mại điện tử số một Việt Nam</p>
      </div>

      <div className={styles.footerCol_4}>
        <h3>Contact Us</h3>
        <a href="/">
          <p>Facebook</p>
        </a>
        <a href="/">
          <p>Instagram</p>
        </a>
        <a href="/">
          <p>Youtube</p>
        </a>
      </div>

      <div className={styles.footerCol_5}>
        <h3>Our Apps</h3>
        <div>
          <p>Download our IOS app</p>
          <img src={appStore} className={styles.loGoCol5} alt="" />
        </div>
        <div>
          <p>Download our Android app</p>
          <img src={playStore} className={styles.loGoCol5} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Footer;
