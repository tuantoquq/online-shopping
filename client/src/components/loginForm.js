import React from 'react';
import { Link } from 'react-router-dom';
import { useRef, useState, useEffect, useContext } from 'react';
import clsx from 'clsx';
import styles from './CSS/LoginFormCSS.module.scss';
import logoImage from '../assets/logo-design.png';
import AuthContext from './authProvider';

import axios from '../config/axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function LoginForm(props) {
  const role = props.role;
  //console.log(role);
  const [open, setOpen] = React.useState(false);

  const LOGIN_URL = `/api/v1/${role}/login`;
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email: user, password: pwd }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
          // withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      console.log(JSON.stringify(response));
      if (response.data.status === 2) {
        setErrMsg('Tên đăng nhập hoặc mật khẩu không đúng.');
        setOpen(true);
      } else {
        const accessToken = response?.data?.token;
        setAuth({ user, pwd, role, accessToken });
        setUser('');
        setPwd('');
        setSuccess(true);
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
        setOpen(true);
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Tên đăng nhập hoặc mật khẩu không đúng.');
        setOpen(true);
      } else {
        setErrMsg('Đăng nhập thất bại.');
        setOpen(true);
      }
      errRef.current.focus();
    }
  };

  return success ? (
    <h2>Return home </h2>
  ) : (
    <div className={clsx(styles.loginContainer, styles.row)}>
      <div className={clsx(styles.loginLogo, styles.col)}>
        <div className={clsx(styles.imgContainer)}>
          <img className={styles.logo} src={logoImage} alt="logo" />
        </div>
        <span className={clsx(styles.logoTitle)}>
          <h1 className={styles.title}>
            Nền tảng thương mại điện tử hàng đầu Việt Nam.
          </h1>
        </span>
      </div>

      <div className={clsx(styles.col, styles.loginForm)}>
        <div
          ref={errRef}
          className={
            errMsg
              ? clsx(styles.snackbar, styles.show)
              : clsx(styles.snackbar, styles.offscreen)
          }
          aria-live="assertive"
        >
          <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: '100%' }}
            >
              {errMsg}
            </Alert>
          </Snackbar>
        </div>

        <form className={clsx(styles.row)} onSubmit={handleSubmit}>
          <div className={clsx(styles.formTitle, styles.row)}>
            <h2 className={clsx(styles.title)}> Đăng nhập </h2>
            {role === 'admin' || <Link to="/">Bạn cần giúp đỡ?</Link>}
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
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              type="text"
              className={clsx(styles.formInput, styles.row)}
              required
            />
          </div>
          <div className={clsx(styles.formField, styles.row)}>
            <label
              htmlFor="password"
              className={clsx(styles.formLabel, styles.row)}
            >
              Mật khẩu:
            </label>
            <input
              id="password"
              autoComplete="off"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              type="password"
              className={clsx(styles.formInput, styles.row)}
              required
            />
          </div>
          <button
            value="Submit"
            type="submit"
            className={clsx(styles.row, styles.btn, styles.primary)}
          >
            ĐĂNG NHẬP
          </button>
        </form>

        {role === 'admin' || (
          <div className={clsx(styles.formFooter, styles.row)}>
            <Link to="/" className={clsx(styles.col)}>
              Quên mật khẩu?
            </Link>
            {props.role === 'customer' && (
              <span>
                Chưa có tài khoản?{' '}
                <Link to="/customer/register" className={clsx(styles.col)}>
                  Đăng ký
                </Link>{' '}
                ngay.
              </span>
            )}

            {role === 'shopper' && (
              <Link to="/shopper/register" className={clsx(styles.col)}>
                Trở thành người bán hàng?
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginForm;
