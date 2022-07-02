import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './CSS/AccountShopper.module.css';
import axios from '../config/axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ImageUploader from './imageUploader';
import Header from './header';
import Footer from './footer';
import imageTest from '../assets/testproduct.jpg';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { Tabs } from '@mui/material';
import { Navigate } from 'react-router-dom';
import TokenService from '../service/TokenService';
import RoleService from '../service/RoleService';

function TabInfor(props) {
  const { value, account } = props;
  const [firstName, setFirstName] = useState('Bùi');
  const [lastName, setLastName] = useState('Minh Tuấn');
  const [email, setEmail] = useState('kiyu@gmail.com');
  const [phone, setPhone] = useState('0352544366');
  const [gender, setGender] = useState('male');
  const [birthday, setBirthday] = useState('2000-10-09');
  const [address, setAddress] = useState('Ba Vì, Hà Nội');
  const [cmnd, setCmnd] = useState('001200012956');
  const [noiCap, setNoiCap] = useState('Ba Vì, Hà Nội');
  const [ngayCap, setNgayCap] = useState('2000-05-06');
  const [password, setPassword] = useState('108920');

  const [avatarImg, setAvatarImg] = useState(imageTest);
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
    const REGISTER_URL = `/api/v1/register`;

    if (errMsg === '') {
      //console.log(avatarImg);
      let data = {};
      console.log('submit');
      const bday = new Date(birthday);
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
          setErrMsg('Thay đổi thất bại.');
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
  return (
    <div>
      {value === 0 && (
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
              {/* <div className={clsx(styles.formTitle, styles.row)}>
                <h2 className={clsx(styles.title)}> Thông tin tài khoản </h2>
              </div> */}

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
                <button
                  value="Submit"
                  type="submit"
                  className={clsx(styles.btn, styles.primary)}
                >
                  THAY ĐỔI
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function TabPassword(props) {
  const { value, account } = props;
  const [firstName] = useState('Bùi');
  const [lastName] = useState('Minh Tuấn');
  const [email] = useState('kiyu@gmail.com');
  const [phone] = useState('0352544366');
  const [gender] = useState('male');
  const [birthday] = useState('2000-10-09');
  const [address] = useState('Ba Vì, Hà Nội');
  const [cmnd] = useState('001200012956');
  const [noiCap] = useState('Ba Vì, Hà Nội');
  const [ngayCap] = useState('2000-05-06');
  const [password, setPassword] = useState('108920');
  const [oldPassword, setOldPassword] = useState('123456');
  const [newPassword, setNewPassword] = useState('123456');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatarImg] = useState(imageTest);
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
    const REGISTER_URL = `/api/v1/register`;
    if (password !== oldPassword) {
      setErrMsg('Sai mật khẩu!');
    }
    if (newPassword !== confirmPassword) {
      setErrMsg('Mật khẩu không khớp!');
    }
    if (newPassword.length < 6) {
      setErrMsg('Mật khẩu phải chứa ít nhất 6 kí tự!');
    }

    if (errMsg === '') {
      //console.log(avatarImg);
      let data = {};
      console.log('submit');
      const bday = new Date(birthday);
      const iday = new Date(ngayCap);
      setPassword(newPassword);
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
          setErrMsg('Thay đổi thất bại.');
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
  return (
    <div>
      {value === 1 && (
        <div className={clsx(styles.registerContainerPassWorld, styles.row)}>
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
              <div className={clsx(styles.formTitle, styles.row)}>
                <h2 className={clsx(styles.title)}> Thay đổi mật khẩu </h2>
              </div>

              <div className={clsx(styles.row, styles.formRow)}>
                <div className={clsx(styles.formLeft)}>
                  <div className={clsx(styles.formRow, styles.row)}>
                    <label
                      htmlFor="oldPassword"
                      className={clsx(styles.formLabel, styles.row)}
                    >
                      Mật khẩu cũ:
                    </label>
                    <div className={clsx(styles.formField, styles.col3)}>
                      <input
                        id="oldPassword"
                        name="oldPassword"
                        type="password"
                        onChange={(e) => setOldPassword(e.target.value)}
                        className={clsx(styles.formInput, styles.row)}
                        placeholder="Mật khẩu..."
                        required
                      />
                    </div>
                  </div>

                  <div className={clsx(styles.formRow, styles.row)}>
                    <label
                      htmlFor="newPassword"
                      className={clsx(styles.formLabel, styles.row)}
                    >
                      Mật khẩu mới:
                    </label>
                    <div className={clsx(styles.formField, styles.col3)}>
                      <input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        onChange={(e) => setNewPassword(e.target.value)}
                        className={clsx(styles.formInput, styles.row)}
                        placeholder="Mật khẩu..."
                        required
                      />
                    </div>
                  </div>

                  <div className={clsx(styles.formRow, styles.row)}>
                    <label
                      htmlFor="confirmPassword"
                      className={clsx(styles.formLabel, styles.row)}
                    >
                      Nhập lại mật khẩu:
                    </label>
                    <div className={clsx(styles.formField, styles.col3)}>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={clsx(styles.formInput, styles.row)}
                        placeholder="Mật khẩu..."
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={clsx(styles.formRow, styles.formFooter)}>
                <button
                  value="Submit"
                  type="submit"
                  className={clsx(styles.btn, styles.primary)}
                >
                  THAY ĐỔI
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// const defautlAvatar =
//   'https://res.cloudinary.com/trinhvanthoai/image/upload/v1655489389/thoaiUploads/defaultAvatar_jxx3b9.png';

function AccountShopper({ navigation, account }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const accessToken = TokenService.getLocalAccessToken(
    RoleService.getLocalRole()
  );
  if (!accessToken) {
    return <Navigate to="/shopper/login"></Navigate>;
  }
  if (accessToken) {
    if (RoleService.getLocalRole() === 'customer') {
      return <Navigate to="/"></Navigate>;
    }
    if (RoleService.getLocalRole() === 'admin') {
      return <Navigate to="/admin"></Navigate>;
    }
    if (RoleService.getLocalRole() === 'shopper') {
      return (
        <div className="account">
          <Header navigation={navigation} />

          <div className={styles.content}>
            <div className={styles.wraper}>
              <p className={styles.tdisplay}> Quản lý tài khoản </p>
              <Box
                sx={{
                  flexGrow: 1,
                  bgcolor: 'background.paper',
                  display: 'flex',
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                  aria-label="secondary tabs example"
                  orientation="vertical"
                >
                  <Tab value={0} label="Thông tin tài khoản" />
                  <Tab value={1} label="Thay đổi mật khẩu" />
                </Tabs>
                <TabInfor value={value} index={0} account={account}></TabInfor>
                <TabPassword
                  value={value}
                  index={1}
                  account={account}
                ></TabPassword>
              </Box>
            </div>
          </div>
          <Footer navigation={navigation} />
        </div>
      );
    }
  }
}
export default AccountShopper;
