import React from "react";
import { Link } from "react-router-dom";

import clsx from "clsx";
import styles from "./CSS/LoginFormCSS.module.scss";
import logoImage from "../assets/logo-design.png";

function LoginForm(props) {
  console.log(props.role);
  let dangky = "";
  if (props.role === "user") {
    dangky = "Đăng ký";
  }
  if (props.role === "seller") {
    dangky = "Trở thành người bán hàng?";
  }

  return (
    <div className={clsx(styles.loginContainer, styles.row)}>
      <div className={clsx(styles.loginLogo, styles.col)}>
        <div class={clsx(styles.imgContainer)}>
          <img className={styles.logo} src={logoImage} alt="logo" />
        </div>
        <span className={clsx(styles.logoTitle)}>
          <h1 className={styles.title}>
            Nền tảng thương mại điện tử hàng đầu Việt Nam.
          </h1>
        </span>
      </div>

      <div className={clsx(styles.col, styles.loginForm)}>
        <form className={clsx(styles.row)}>
          <div className={clsx(styles.formTitle, styles.row)}>
            <h2 className={clsx(styles.title)}> Đăng nhập </h2>
            {props.role === "admin" || <Link to="/">Bạn cần giúp đỡ?</Link>}
          </div>
          <div className={clsx(styles.formField, styles.row)}>
            <label
              htmlFor="username"
              className={clsx(styles.formLabel, styles.row)}
            >
              Tên đăng nhập:
            </label>
            <input
              id="username"
              type="text"
              className={clsx(styles.formInput, styles.row)}
              required
            />
          </div>
          <div className={clsx(styles.formField, styles.row)}>
            <label
              htmlFor="password"
              className={clsx(styles.formLabel, styles.row)}
              required
            >
              Mật khẩu:
            </label>
            <input
              id="password"
              type="password"
              className={clsx(styles.formInput, styles.row)}
            />
          </div>
          <button
            type="submit"
            className={clsx(styles.row, styles.btn, styles.primary)}
          >
            ĐĂNG NHẬP
          </button>
        </form>

        {props.role === "admin" || (
          <div className={clsx(styles.formFooter, styles.row)}>
            <Link to="/" className={clsx(styles.col)}>
              Quên mật khẩu?
            </Link>
            <Link to="/" className={clsx(styles.col)}>
              {dangky}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginForm;
