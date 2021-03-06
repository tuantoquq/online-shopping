import React, { useEffect, useState, useLayoutEffect, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import styles from './CSS/RegisterFormCSS.module.scss';
import Axios from 'axios';
import axios from '../config/axios';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ImageUploader from '../components/imageUploader';
import TokenService from '../service/TokenService';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const defautlAvatar =
  'https://res.cloudinary.com/trinhvanthoai/image/upload/v1655489389/thoaiUploads/defaultAvatar_jxx3b9.png';

function RegisterForm(props) {
  const role = props.role;
  const navigate = useNavigate();

  useEffect(() => {
    if (TokenService.getLocalAccessToken(role)) {
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
  }, []);

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
    const REGISTER_URL = `/${role}/register`;
    if (gender) {
      if (password !== confirmPassword) {
        setErrMsg('M???t kh???u kh??ng kh???p!');
      } else {
        if (password.length < 6) {
          setErrMsg('M???t kh???u ph???i ch???a ??t nh???t 6 k?? t???!');
        } else {
          if (errMsg === '') {
            //console.log(avatarImg);
            let data = {};
            // console.log('submit');
            const bday = new Date(birthday);
            if (role === 'customer') {
              data = {
                email: email,
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phone,
                gender: gender,
                dateOfBirth: bday,
                address: address,
                password: password,
                avatarUrl: avatarImg,
              };
            } else {
              const iday = new Date(ngayCap);
              data = {
                email: email,
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phone,
                gender: gender,
                dateOfBirth: bday,
                address: address,
                password: password,
                avatarUrl: avatarImg,
                cccd: cmnd,
                issueDate: iday,
                issuePlace: noiCap,
              };
            }
            //console.log(data);
            try {
              await axios.post(REGISTER_URL, JSON.stringify(data), {
                headers: {
                  'Content-Type': 'application/json',
                },
                // withCredentials: true,
              });
              // console.log(JSON.stringify(response?.data));
              // console.log(JSON.stringify(response));
              setSuccess(true);
            } catch (err) {
              if (!err?.response) {
                setErrMsg('No Server Response');
                setOpen(true);
              } else if (err.response?.data?.message) {
                setErrMsg('S??? ??i???n tho???i ho???c email kh??ng ????ng ?????nh d???ng!');
                //console.log(err);
                setOpen(true);
              } else {
                setErrMsg('????ng k?? th???t b???i.');
                //console.log(err);
                setOpen(true);
              }
            }
          }
        }
      }
    } else {
      setErrMsg('Vui l??ng ch???n gi???i t??nh');
      //console.log(err);
      setOpen(true);
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
            B???n ???? ????ng k?? th??nh c??ng, vui l??ng chuy???n ?????n trang{' '}
            <Link to={'/customer/login'}> ????ng nh???p </Link>
          </div>
        )}
        {role === 'shopper' && (
          <div>
            B???n ???? ????ng k?? th??nh c??ng, y??u c???u ????ng k?? c???a b???n ??ang ch??? ???????c ph??
            duy???t.
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
                <h2 className={clsx(styles.title)}> ????ng k?? t??i kho???n </h2>
              </div>
            )}
            {role === 'shopper' && (
              <div className={clsx(styles.formTitle, styles.row)}>
                <h2 className={clsx(styles.title)}>
                  {' '}
                  Tr??? th??nh ng?????i b??n h??ng c???a BestShop
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
                      H??? v?? t??n ?????m:
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      type="text"
                      className={clsx(styles.formInput, styles.row)}
                      placeholder="H??? v?? t??n ?????m..."
                      required
                    />
                  </div>

                  <div className={clsx(styles.formField, styles.col3)}>
                    <label
                      htmlFor="lastName"
                      className={clsx(styles.formLabel, styles.row)}
                    >
                      T??n:
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      type="text"
                      className={clsx(styles.formInput, styles.row)}
                      placeholder="T??n..."
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
                      S??? ??i???n tho???i:
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="text"
                      value={phone}
                      pattern="[0-9]*"
                      onChange={(e) => {
                        setPhone((v) =>
                          e.target.validity.valid || e.target.value === ''
                            ? e.target.value
                            : v
                        );
                      }}
                      className={clsx(styles.formInput, styles.row)}
                      placeholder="S??? ??i???n tho???i..."
                      required
                    />
                  </div>

                  <div className={clsx(styles.formField, styles.col3)}>
                    <label
                      htmlFor="gender"
                      className={clsx(styles.formLabel, styles.row)}
                    >
                      Gi???i t??nh:
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
                          N???
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
                          Kh??c
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className={clsx(styles.formField, styles.col3)}>
                    <label
                      htmlFor="birthday"
                      className={clsx(styles.formLabel, styles.row)}
                    >
                      Ng??y sinh:
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
                        S??? CMND/CCCD:
                      </label>
                      <input
                        id="cmnd/cccd"
                        name="cccd"
                        type="text"
                        value={cmnd}
                        onChange={(e) => setCmnd(e.target.value)}
                        className={clsx(styles.formInput, styles.row)}
                        placeholder="S??? CMND/CCCD..."
                        required
                      />
                    </div>

                    <div className={clsx(styles.formField, styles.col3)}>
                      <label
                        htmlFor="noiCap"
                        className={clsx(styles.formLabel, styles.row)}
                      >
                        N??i c???p:
                      </label>
                      <input
                        id="noiCap"
                        name="noiCap"
                        type="text"
                        value={noiCap}
                        onChange={(e) => setNoiCap(e.target.value)}
                        className={clsx(styles.formInput, styles.row)}
                        placeholder="N??i c???p..."
                        required
                      />
                    </div>

                    <div className={clsx(styles.formField, styles.col3)}>
                      <label
                        htmlFor="ngayCap"
                        className={clsx(styles.formLabel, styles.row)}
                      >
                        Ng??y c???p:
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
                      ?????a ch???:
                    </label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className={clsx(styles.formInput, styles.row)}
                      placeholder="?????a ch???..."
                      required
                    />
                  </div>

                  <div className={clsx(styles.formField, styles.col3)}>
                    <label
                      htmlFor="password"
                      className={clsx(styles.formLabel, styles.row)}
                    >
                      M???t kh???u:
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      className={clsx(styles.formInput, styles.row)}
                      placeholder="M???t kh???u..."
                      required
                    />
                  </div>

                  <div className={clsx(styles.formField, styles.col3)}>
                    <label
                      htmlFor="confirmPassword"
                      className={clsx(styles.formLabel, styles.row)}
                    >
                      Nh???p l???i m???t kh???u:
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={clsx(styles.formInput, styles.row)}
                      placeholder="Nh???p l???i m???t kh???u..."
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
                  B???n mu???n tr??? th??nh ng?????i b??n h??ng?
                </Link>
              )}

              {role === 'shopper' && (
                <Link to="/customer/register">
                  ????ng k?? t??i kho???n kh??ch h??ng?
                </Link>
              )}

              <div className={clsx(styles.btnContainer)}>
                <button
                  value="Submit"
                  type="submit"
                  className={clsx(styles.btn, styles.primary)}
                >
                  ????NG K??
                </button>
                <button
                  onClick={() => {
                    navigate('/');
                  }}
                  className={clsx(styles.btn, styles.cancel)}
                >
                  H???Y
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default memo(RegisterForm);
