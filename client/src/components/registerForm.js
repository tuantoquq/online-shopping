import React, { useEffect, useState, useRef, memo } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './CSS/RegisterFormCSS.module.scss';
import Axios from 'axios';
import axios from '../config/axios';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ImageUploader from '../components/imageUploader';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const defautlAvatar =
  'https://res.cloudinary.com/trinhvanthoai/image/upload/v1655489389/thoaiUploads/defaultAvatar_jxx3b9.png';

function RegisterForm(props) {
  const role = props.role;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [cmnd, setCmnd] = useState('');
  const [noiCap, setNoiCap] = useState('');
  const [ngayCap, setNgayCap] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatarImg, setAvatarImg] = useState(defautlAvatar);
  const [errMsg, setErrMsg] = useState('');

  const [open, setOpen] = useState(false);

  const [success, setSuccess] = useState(false);

  //console.log(avatarImg);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setErrMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const REGISTER_URL = `/api/v1/${role}/register`;
    if (password !== confirmPassword) {
      setErrMsg('Mật khẩu không khớp!');
    }
    if (password.length < 6) {
      setErrMsg('Mật khẩu phải chứa ít nhất 6 kí tự!');
    }

    if (errMsg === '') {
      //console.log(avatarImg);
      let data = {};
      console.log('submit');
      const bday = new Date(birthday);
      if (role === 'customer') {
        data = {
          email: email,
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phone,
          gender: gender,
          birthDay: bday,
          address: address,
          password: password,
          avatar: avatarImg,
        };
      } else {
        const iday = new Date(ngayCap);
        data = {
          email: email,
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phone,
          gender: gender,
          birthDay: bday,
          address: address,
          password: password,
          avatar: avatarImg,
          cccd: cmnd,
          issueDate: iday,
          issuePlace: noiCap,
        };
      }
      console.log(data);
      try {
        const response = await axios.post(REGISTER_URL, JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/json',
          },
          // withCredentials: true,
        });
        console.log(JSON.stringify(response?.data));
        console.log(JSON.stringify(response));
        setSuccess(true);
      } catch (err) {
        if (!err?.response) {
          setErrMsg('No Server Response');
          setOpen(true);
        } else {
          setErrMsg('Đăng kí thất bại.');
          console.log(err);
          setOpen(true);
        }
      }
    }
  };

  useEffect(() => {
    if (errMsg !== '') {
      setOpen(true);
    }
  }, [errMsg]);

  if (success) {
    return (
      <div className={clsx(styles.registerContainer, styles.success)}>
        {role === 'customer' && (
          <div>
            Bạn đã đăng kí thành công, vui lòng chuyển đến trang{' '}
            <Link to={'/customer/login'}> đăng nhập </Link>
          </div>
        )}
        {role === 'shopper' && (
          <div>
            Bạn đã đăng kí thành công, yêu cầu đăng kí của bạn đang chờ được phê
            duyệt.
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className={clsx(styles.registerContainer, styles.row)}>
        <div
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
        <div className={clsx(styles.registerForm)}>
          <form onSubmit={handleSubmit} className={clsx(styles.row)}>
            {role === 'customer' && (
              <div className={clsx(styles.formTitle, styles.row)}>
                <h2 className={clsx(styles.title)}> Đăng ký tài khoản </h2>
              </div>
            )}
            {role === 'shopper' && (
              <div className={clsx(styles.formTitle, styles.row)}>
                <h2 className={clsx(styles.title)}>
                  {' '}
                  Trở thành người bán hàng của BestShop
                </h2>
              </div>
            )}
            <div className={clsx(styles.row, styles.formRow)}>
              <div className={clsx(styles.formLeft)}>
                <div className={clsx(styles.formRow, styles.row)}>
                  <div className={clsx(styles.formField, styles.col3)}>
                    <label
                      htmlFor="firstName"
                      className={clsx(styles.formLabel, styles.row)}
                    >
                      Họ và tên đệm:
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      type="text"
                      className={clsx(styles.formInput, styles.row)}
                      placeholder="Họ và tên đệm..."
                      required
                    />
                  </div>

                  <div className={clsx(styles.formField, styles.col3)}>
                    <label
                      htmlFor="lastName"
                      className={clsx(styles.formLabel, styles.row)}
                    >
                      Tên:
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      type="text"
                      className={clsx(styles.formInput, styles.row)}
                      placeholder="Tên..."
                      required
                    />
                  </div>

                  <div className={clsx(styles.formField, styles.col3)}>
                    <label
                      htmlFor="email"
                      className={clsx(styles.formLabel, styles.row)}
                    >
                      Email:
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={clsx(styles.formInput, styles.row)}
                      placeholder="Email..."
                      required
                    />
                  </div>
                </div>

                <div className={clsx(styles.formRow, styles.row)}>
                  <div className={clsx(styles.formField, styles.col3)}>
                    <label
                      htmlFor="phone"
                      className={clsx(styles.formLabel, styles.row)}
                    >
                      Số điện thoại:
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={clsx(styles.formInput, styles.row)}
                      placeholder="Số điện thoại..."
                      required
                    />
                  </div>

                  <div className={clsx(styles.formField, styles.col3)}>
                    <label
                      htmlFor="gender"
                      className={clsx(styles.formLabel, styles.row)}
                    >
                      Giới tính:
                    </label>
                    <div
                      className={clsx(
                        styles.formRow,
                        styles.row,
                        styles.formGender
                      )}
                    >
                      <div>
                        <input
                          type="radio"
                          id="male"
                          onChange={() => setGender('male')}
                          checked={gender === 'male'}
                        />

                        <label
                          className={clsx(
                            styles.genderSelection,
                            styles.formLabel
                          )}
                          htmlFor="male"
                        >
                          Nam
                        </label>
                      </div>

                      <div>
                        <input
                          type="radio"
                          id="female"
                          onChange={() => setGender('female')}
                          checked={gender === 'female'}
                        />
                        <label
                          className={clsx(
                            styles.genderSelection,
                            styles.formLabel
                          )}
                          htmlFor="female"
                        >
                          Nữ
                        </label>
                      </div>

                      <div>
                        <input
                          type="radio"
                          id="others"
                          onChange={() => setGender('others')}
                          checked={gender === 'others'}
                        />
                        <label
                          className={clsx(
                            styles.genderSelection,
                            styles.formLabel
                          )}
                          htmlFor="others"
                        >
                          Khác
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className={clsx(styles.formField, styles.col3)}>
                    <label
                      htmlFor="birthday"
                      className={clsx(styles.formLabel, styles.row)}
                    >
                      Ngày sinh:
                    </label>
                    <input
                      id="birthday"
                      name="birthday"
                      min="1900-01-01"
                      max="2022-01-01"
                      type="date"
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                      className={clsx(styles.formInput, styles.row)}
                      required
                    />
                  </div>
                </div>

                {role === 'shopper' && (
                  <div className={clsx(styles.formRow, styles.row)}>
                    <div className={clsx(styles.formField, styles.col3)}>
                      <label
                        htmlFor="cmnd/cccd"
                        className={clsx(styles.formLabel, styles.row)}
                      >
                        Số CMND/CCCD:
                      </label>
                      <input
                        id="cmnd/cccd"
                        name="cccd"
                        type="text"
                        value={cmnd}
                        onChange={(e) => setCmnd(e.target.value)}
                        className={clsx(styles.formInput, styles.row)}
                        placeholder="Số CMND/CCCD..."
                        required
                      />
                    </div>

                    <div className={clsx(styles.formField, styles.col3)}>
                      <label
                        htmlFor="noiCap"
                        className={clsx(styles.formLabel, styles.row)}
                      >
                        Nơi cấp:
                      </label>
                      <input
                        id="noiCap"
                        name="noiCap"
                        type="text"
                        value={noiCap}
                        onChange={(e) => setNoiCap(e.target.value)}
                        className={clsx(styles.formInput, styles.row)}
                        placeholder="Nơi cấp..."
                        required
                      />
                    </div>

                    <div className={clsx(styles.formField, styles.col3)}>
                      <label
                        htmlFor="ngayCap"
                        className={clsx(styles.formLabel, styles.row)}
                      >
                        Ngày cấp:
                      </label>
                      <input
                        id="ngayCap"
                        name="ngayCap"
                        type="date"
                        value={ngayCap}
                        onChange={(e) => setNgayCap(e.target.value)}
                        className={clsx(styles.formInput, styles.row)}
                        required
                      />
                    </div>
                  </div>
                )}

                <div className={clsx(styles.formRow, styles.row)}>
                  <div className={clsx(styles.formField, styles.col3)}>
                    <label
                      htmlFor="address"
                      className={clsx(styles.formLabel, styles.row)}
                    >
                      Địa chỉ:
                    </label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className={clsx(styles.formInput, styles.row)}
                      placeholder="Địa chỉ..."
                      required
                    />
                  </div>

                  <div className={clsx(styles.formField, styles.col3)}>
                    <label
                      htmlFor="password"
                      className={clsx(styles.formLabel, styles.row)}
                    >
                      Mật khẩu:
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      className={clsx(styles.formInput, styles.row)}
                      placeholder="Mật khẩu..."
                      required
                    />
                  </div>

                  <div className={clsx(styles.formField, styles.col3)}>
                    <label
                      htmlFor="confirmPassword"
                      className={clsx(styles.formLabel, styles.row)}
                    >
                      Nhập lại mật khẩu:
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={clsx(styles.formInput, styles.row)}
                      placeholder="Nhập lại mật khẩu..."
                      required
                    />
                  </div>
                </div>
              </div>

              <div className={clsx(styles.avatarInput, styles.col)}>
                <ImageUploader
                  avatarImg={avatarImg}
                  onAvatarChange={setAvatarImg}
                />
              </div>
            </div>
            <div className={clsx(styles.formRow, styles.formFooter)}>
              {role === 'customer' && (
                <Link to="/shopper/register">
                  Bạn muốn trở thành người bán hàng?
                </Link>
              )}

              {role === 'shopper' && (
                <Link to="/customer/register">
                  Đăng ký tài khoản khách hàng?
                </Link>
              )}

              <button
                value="Submit"
                type="submit"
                className={clsx(styles.btn, styles.primary)}
              >
                ĐĂNG KÝ
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default memo(RegisterForm);
