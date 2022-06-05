import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './CSS/RegisterFormCSS.module.scss';
import defaultAvatar from '../assets/avatar/defaultAvatar.png';

function RegisterForm(props) {
  const role = props.role;
  const [username, setUsername] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [gender, setGender] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const [cmnd, setCmnd] = useState(null);
  const [noiCap, setNoiCap] = useState(null);
  const [ngayCap, setNgayCap] = useState(null);
  const [address, setAddress] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatarImg, setAvatarImg] = useState(null);

  useEffect(() => {
    // Cleanup
    return () => {
      avatarImg && URL.revokeObjectURL(avatarImg.preview);
    };
  }, [avatarImg]);

  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setAvatarImg(file);
  };
  //console.log(role);
  return (
    <div className={clsx(styles.registerContainer, styles.row)}>
      <div className={clsx(styles.registerForm)}>
        <form className={clsx(styles.row)}>
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
                    htmlFor="username"
                    className={clsx(styles.formLabel, styles.row)}
                  >
                    Tên đăng nhập:
                  </label>
                  <input
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    className={clsx(styles.formInput, styles.row)}
                    placeholder="Tên đăng nhập..."
                    required
                  />
                </div>

                <div className={clsx(styles.formField, styles.col3)}>
                  <label
                    htmlFor="name"
                    className={clsx(styles.formLabel, styles.row)}
                  >
                    Họ và tên:
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    type="text"
                    className={clsx(styles.formInput, styles.row)}
                    placeholder="Họ và tên..."
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
                    oncChange={(e) => setEmail(e.target.value)}
                    className={clsx(styles.formInput, styles.row)}
                    placeholder="Email..."
                    required
                  />
                </div>
              </div>

              <div className={clsx(styles.formRow, styles.row)}>
                <div className={clsx(styles.formField, styles.col3)}>
                  <label
                    htmltarFor="phone"
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
                        name="gender"
                        value="male"
                        checked={gender === 'male'}
                      />

                      <label
                        className={clsx(
                          styles.genderSelection,
                          styles.formLabel
                        )}
                        for="male"
                      >
                        Nam
                      </label>
                    </div>

                    <div>
                      <input
                        type="radio"
                        id="female"
                        name="gender"
                        value="female"
                        checked={gender === 'female'}
                      />
                      <label
                        className={clsx(
                          styles.genderSelection,
                          styles.formLabel
                        )}
                        for="female"
                      >
                        Nữ
                      </label>
                    </div>

                    <div>
                      <input
                        type="radio"
                        id="others"
                        name="gender"
                        value="others"
                        checked={gender === 'others'}
                      />
                      <label
                        className={clsx(
                          styles.genderSelection,
                          styles.formLabel
                        )}
                        for="others"
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
                      name="cmnd/cccd"
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
                    oncChange={(e) => setPassword(e.target.value)}
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
              <div className={clsx(styles.imgContainer)}>
                <input
                  className={clsx(styles.imgInput)}
                  onChange={handlePreviewAvatar}
                  name="avatar"
                  id="avatar"
                  type="file"
                  accept="image/*"
                />
                <label htmlFor="avatar">
                  <img
                    className={styles.avatarImg}
                    src={avatarImg ? avatarImg.preview : defaultAvatar}
                    alt="logo"
                  />
                </label>
              </div>
            </div>
          </div>
          <div className={clsx(styles.formRow, styles.formFooter)}>
            {role === 'customer' && (
              <Link to="/shopper/register">
                Bạn muốn trở thành người bán hàng?
              </Link>
            )}

            {role === 'shopper' && (
              <Link to="/customer/register">Đăng ký tài khoản khách hàng?</Link>
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

export default RegisterForm;
