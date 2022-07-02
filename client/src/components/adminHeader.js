import React from 'react';
import styles from './CSS/AdminHeaderCSS.module.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TokenService from '../service/TokenService';
import RoleService from '../service/RoleService';
import avatarSample from '../assets/avatar/defaultAvatar.png';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import logo from '../assets/logo-design.png';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function AdminHeader() {
  const [role, setRole] = useState('admin');
  const [accessToken, setAccessToken] = useState(
    TokenService.getLocalAccessToken('admin')
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    TokenService.removeLocalAccessToken('admin');
    RoleService.removeLocalRole();
    setAccessToken(TokenService.getLocalAccessToken('admin'));
    setRole(RoleService.getLocalRole());
    setAnchorEl(null);
    navigate('/');
  };

  const handleClickInfo = () => {
    setAnchorEl(null);
    navigate(`/admin/infomation`);
  };
  const handleClickLogo = () => {
    setAnchorEl(null);
    navigate(`/admin`);
  };
  return (
    <div className={clsx(styles.headerContainer)}>
      <Box className={clsx(styles.headerTop)}>
        <div className={clsx(styles.headerTitle)} onClick={handleClickLogo}>
          <img className={clsx(styles.logoImg)} src={logo} alt="TIPISHOP" />
          <div>
            <h1 className={clsx(styles.mainTitle)}>TIPI SHOP</h1>
          </div>
        </div>
        <div>
          {!accessToken && (
            <Link className={clsx(styles.loginLink)} to="/admin/login">
              <Button className={clsx(styles.loginButton)} variant="outlined">
                LOGIN
              </Button>
            </Link>
          )}

          {accessToken && (
            <div>
              <Avatar
                alt="avatar"
                src={avatarSample}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              ></Avatar>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleClickInfo}>Thông tin cá nhân</MenuItem>
                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
              </Menu>
            </div>
          )}
        </div>
      </Box>
    </div>
  );
}

export default AdminHeader;
