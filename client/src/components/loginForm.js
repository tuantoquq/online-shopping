import React from 'react';
import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import clsx from 'clsx';
import styles from './CSS/LoginFormCSS.module.scss';
import logoImage from '../assets/logo-design.png';

import axios from '../config/axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import TokenService from '../service/TokenService';
import RoleService from '../service/RoleService';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function LoginForm(props) {
  const navigate = useNavigate();
  const role = props.role;

  //const { auth, setAuth } = useContext(AuthContext);
  //console.log(role);
  // useEffect(() => {
  //   if (TokenService.getLocalAccessToken(role)) {
  //     if (role === 'customer') {
  //       navigate('/');
  //     }
  //     if (role === 'shopper') {
  //       navigate('/shopper/accept-order');
  //     }
  //     if (role === 'admin') {
  //       navigate('/admin');
  //     }
  //   }
  // }, []);

  const [open, setOpen] = useState(false);

  const LOGIN_URL = `/${role}/login`;
  const [accessToken, setAccessToken] = useState(null);
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
    setErrMsg('');
  }, [user, pwd]);

  useEffect(() => {
    //console.log('accessToken: ', TokenService.getLocalAccessToken(role));
    //setAuth({ user, pwd, role, accessToken });
    if (TokenService.getLocalAccessToken(role)) {
      //console.log(role);
      //console.log(TokenService.getLocalAccessToken(role));
      setSuccess(true);
    } else {
      //console.log(false);
      setSuccess(false);
      //TokenService.setLocalAccessToken(role, accessToken);
    }
  }, [accessToken]);

  useEffect(() => {
    //console.log(success);
    if (success === true) {
      //console.log('navigate');
      if (role === 'customer') {
        navigate('/');
      }
      if (role === 'shopper') {
        navigate('/shopper/accept-order');
      }
      if (role === 'admin') {
        navigate('/admin');
      }
    }
  }, [success]);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  useEffect(() => {
    if (TokenService.getLocalAccessToken(role)) {
      // console.log(role);
      setSuccess(true);
    } else {
      setSuccess(false);
    }
    let r = '';
    if (role === 'customer') {
      r = 'kh??ch h??ng';
    }
    if (role === 'shopper') {
      r = 'ng?????i b??n h??ng';
    }
    if (role === 'admin') {
      r = 'admin';
    }

    setErrMsg(`B???n ??ang ????ng nh???p v???i vai tr?? ${r}`);
  }, [role]);

  useEffect(() => {
    if (errMsg !== '') setOpen(true);
  }, [errMsg]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (role !== 'admin') {
        response = await axios.post(
          LOGIN_URL,
          JSON.stringify({ email: user, password: pwd }),
          {
            headers: {
              'Content-Type': 'application/json',
            },
            // withCredentials: true,
          }
        );
      } else {
        response = await axios.post(
          LOGIN_URL,
          JSON.stringify({ username: user, password: pwd }),
          {
            headers: {
              'Content-Type': 'application/json',
            },
            // withCredentials: true,
          }
        );
      }
      //console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      if (response.data.status === 2) {
        setErrMsg('Email ho???c m???t kh???u kh??ng ????ng.');
        setOpen(true);
      } else {
        const token = response?.data?.data?.token;
        const refreshToken = response?.data?.data?.refreshToken;

        TokenService.setLocalAccessToken(role, token);
        TokenService.setLocalRefreshToken(role, refreshToken);
        RoleService.setLocalRole(role);
        setAccessToken(token);
        setUser('');
        setPwd('');
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
        setOpen(true);
      } else if (err.response?.status === 400) {
        setErrMsg('Missing email or Password');
      } else if (err.response?.status === 401) {
        // console.log(err.response.data.message);
        if (err.response.data.message === 'Incorrect password!') {
          setErrMsg('Email ho???c m???t kh???u kh??ng ????ng.');
        } else {
          setErrMsg(err.response.data.message);
        }
        setOpen(true);
      } else {
        setErrMsg('Email ho???c m???t kh???u kh??ng ????ng.');
        setOpen(true);
      }
      errRef.current.focus();
    }
  };

  return TokenService.getLocalAccessToken(role) || success ? (
    <div className={clsx(styles.loginContainer, styles.row)}></div>
  ) : (
    <div className={clsx(styles.loginContainer, styles.row)}>
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
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {errMsg}
          </Alert>
        </Snackbar>
      </div>

      <div className={clsx(styles.loginLogo, styles.col)}>
        <div className={clsx(styles.imgContainer)}>
          <img className={styles.logo} src={logoImage} alt="logo" />
        </div>
        <span className={clsx(styles.logoTitle)}>
          <h1 className={styles.title}>
            N???n t???ng th????ng m???i ??i???n t??? h??ng ?????u Vi???t Nam.
          </h1>
        </span>
      </div>

      <div className={clsx(styles.col, styles.loginForm)}>
        <form className={clsx(styles.row)} onSubmit={handleSubmit}>
          <div className={clsx(styles.formTitle, styles.row)}>
            <h2 className={clsx(styles.title)}> ????ng nh???p </h2>
            {role === 'customer' && (
              <Link to="/shopper/login">B???n l?? ng?????i b??n h??ng?</Link>
            )}
            {role === 'shopper' && (
              <Link to="/customer/login">B???n l?? ng?????i mua h??ng?</Link>
            )}
          </div>
          <div className={clsx(styles.formField, styles.row)}>
            <label
              htmlFor="email"
              className={clsx(styles.formLabel, styles.row)}
            >
              {role === 'admin' ? 'Username:' : 'Email:'}
            </label>
            <input
              id="email"
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
              M???t kh???u:
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
            ????NG NH???P
          </button>
        </form>

        {role === 'admin' || (
          <div className={clsx(styles.formFooter, styles.row)}>
            <Link to="/" className={clsx(styles.col)}>
              Qu??n m???t kh???u?
            </Link>
            {props.role === 'customer' && (
              <span>
                Ch??a c?? t??i kho???n?{' '}
                <Link to="/customer/register" className={clsx(styles.col)}>
                  ????ng k??
                </Link>{' '}
                ngay.
              </span>
            )}

            {role === 'shopper' && (
              <Link to="/shopper/register" className={clsx(styles.col)}>
                Tr??? th??nh ng?????i b??n h??ng?
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginForm;
