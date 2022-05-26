import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './CSS/RegisterFormCSS.module.scss';
import defaultAvatar from '../assets/avatar/defaultAvatar.png';

function RegisterForm(props) {
  const role = props.role;

  console.log(role);
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
                  name="avatar"
                  id="avatar"
                  type="file"
                />
                <label htmlFor="avatar">
                  <img
                    className={styles.avatarImg}
                    src={defaultAvatar}
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
