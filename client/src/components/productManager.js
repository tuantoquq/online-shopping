import Header from './header';
import Footer from './footer';
import styles from '../screens/CSS/home.module.css';
import React, { useEffect, useState, useRef, memo } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import stylesProductManger from '../screens/CSS/productManager.module.css'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import clsx from 'clsx';
import axios from '../config/axios';
import MuiAlert from '@mui/material/Alert';
import ImageUploader from '../components/imageUploader';
import imageTest from '../assets/testproduct.jpg'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const defautlAvatar =
  'https://res.cloudinary.com/trinhvanthoai/image/upload/v1655489389/thoaiUploads/defaultAvatar_jxx3b9.png';

function ProductManager(products) {
    const posts = [
      {id: "1", name: "Mo hinh 1", cost: 30000, solded: 3, count: 100, rating: 4.3, detail: "Mo hinh de thuong", type: "Do choi"},
      {id: "2", name: "Mo hinh 2", cost: 40000, solded: 1, count: 130, rating: 4.7, detail: "Mo hinh best", type: "Do choi"},
      {id: "3", name: "Mo hinh 3", cost: 50000, solded: 2, count: 160, rating: 4.5, detail: "Mo hinh nho nhan", type: "Do choi"},
      {id: "4", name: "Mo hinh 4", cost: 60000, solded: 3, count: 120, rating: 4.1, detail: "Mo hinh de thuong", type: "Do choi"}
    ];

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
      setOpenInforProduct(false);
      setOpen(true);
      setName('');
      setDetail('');
      setCount(1);
      setCost(0);
      setType('');
      setAvatarImg(defautlAvatar);
      setErrMsg('');
      setSuccess(false);
      setTextTitle("Nhập thông tin sản phẩm");
      setTextButtonRight("Huỷ")
    };
    const handleClose = () => {
      setOpen(false);
      setOpenInforProduct(false);
    };

    const [openInforProduct, setOpenInforProduct] = useState(false);
    const handleOpenInforProduct = (product) => {
      console.log(product)
      setOpenInforProduct(true);
      setOpen(true);
      setId(product.id)
      setName(product.name);
      setDetail(product.detail);
      setCount(product.count);
      setCost(product.cost);
      setType(product.type);
      setSolded(product.solded);
      setRating(product.rating);
      setAvatarImg(imageTest);
      setErrMsg('');
      setSuccess(false);
      setTextTitle("Thông tin sản phẩm");
      setTextButtonRight("Đóng")
    };

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [detail, setDetail] = useState('');
    const [count, setCount] = useState(0);
    const [cost, setCost] = useState(0);
    const [type, setType] = useState('');
    const [rating, setRating] = useState(0);
    const [solded, setSolded] = useState(0);
    const [avatarImg, setAvatarImg] = useState(defautlAvatar);
    const [textTitle, setTextTitle] = useState('');
    const [textButtonRight, setTextButtonRight] = useState('');

    // info
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
      //console.log(avatarImg);

    const handleCloseAvatar = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
      setErrMsg('');
    };

    const [openDelete, setDelete] = useState(false);
    const handleOpenDelete = () =>  setDelete(true);
    const handleCloseDelete = () =>  setDelete(false);

    //submit product
    const handleSubmit = async (e) => {
      e.preventDefault();
      const REGISTER_URL = `/api/v1/registerProduct`;
  
      if (errMsg === '') {
        //console.log(avatarImg);
        let data = {};
        data = {
          name: name,
          detail: detail,
          count: count,
          cost: cost,
          type: type,
          avatar: avatarImg,
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
            setErrMsg('Thêm sản phẩm.');
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
      <div className={styles.Home}>
        <Header />

        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box  className={stylesProductManger.box}>
              <Modal
              open={openDelete}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              >
                  <Box  className={stylesProductManger.deletebox}>
                    <div className={styles.wraper}>  
                        <p className={stylesProductManger.formdelete}> Xác nhận xoá ? </p>
                    </div>
                    <div className={stylesProductManger.button}>
                      <Button onClick={handleCloseDelete}> Huỷ </Button>
                      <Button onClick={handleSubmit}>Xác nhận</Button>
                    </div>
                  </Box>
            </Modal>
            <div className={stylesProductManger.wraper}>  
                <p> {textTitle} </p>
            </div>

            <div className={stylesProductManger.row}>
              { openInforProduct && (
                <div className={clsx(stylesProductManger.formRow)}>
                  <label
                    htmlFor="id"
                    className={clsx(stylesProductManger.formLabel, stylesProductManger.row)}
                  >
                    ID:
                  </label>
                  <input
                    id="id"
                    name="id"
                    value={id}
                    type="text"
                    className={clsx(stylesProductManger.formInput, stylesProductManger.row)}
                    required
                    readOnly
                  />
                </div>
              )}
              
              <div className={clsx(stylesProductManger.formRow)}>
                <label
                  htmlFor="name"
                  className={clsx(stylesProductManger.formLabel, stylesProductManger.row)}
                >
                  Tên sản phẩm:
                </label>
                <input
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className={clsx(stylesProductManger.formInput, stylesProductManger.row)}
                  placeholder="Tên sản phẩm..."
                  required
                />
              </div>

              <div className={clsx(stylesProductManger.formRow)}>
                <label
                  htmlFor="detail"
                  className={clsx(stylesProductManger.formLabel, stylesProductManger.row)}
                >
                  Mô tả:
                </label>
                <input
                  id="detail"
                  name="detail"
                  type="detail"
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                  className={clsx(stylesProductManger.formInput, stylesProductManger.row)}
                  placeholder="Mô tả..."
                  required
                />
              </div>

              <div className={clsx(stylesProductManger.formRow)}>
                <label
                  htmlFor="count"
                  className={clsx(stylesProductManger.formLabel, stylesProductManger.row)}
                >
                  Số lượng:
                </label>
                <input
                  id="count"
                  name="count"
                  type="number"
                  min="1"
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                  className={clsx(stylesProductManger.formInput, stylesProductManger.row)}
                  required
                />
              </div>

              <div className={clsx(stylesProductManger.formRow)}>
                <label
                  htmlFor="cost"
                  className={clsx(stylesProductManger.formLabel, stylesProductManger.row)}
                >
                  Giá tiền:
                </label>
                <input
                  id="cost"
                  name="cost"
                  type="number"
                  min="0"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  className={clsx(stylesProductManger.formInput, stylesProductManger.row)}
                  required
                />
              </div>

              <div className={clsx(stylesProductManger.formRow)}>
                <label
                  htmlFor="type"
                  className={clsx(stylesProductManger.formLabel, stylesProductManger.row)}
                >
                  Loại sản phẩm:
                </label>
                <input
                  id="type"
                  name="type"
                  type="text"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className={clsx(stylesProductManger.formInput, stylesProductManger.row)}
                  required
                />
              </div>

              { openInforProduct && (
                <div>
                  <div className={clsx(stylesProductManger.formRow)}>
                    <label
                      htmlFor="rating"
                      className={clsx(stylesProductManger.formLabel, stylesProductManger.row)}
                    >
                      Đánh giá:
                    </label>
                    <input
                      id="rating"
                      name="rating"
                      value={rating}
                      type="text"
                      className={clsx(stylesProductManger.formInput, stylesProductManger.row)}
                      required
                      readOnly
                    />
                  </div>

                  <div className={clsx(stylesProductManger.formRow)}>
                  <label
                    htmlFor="solded"
                    className={clsx(stylesProductManger.formLabel, stylesProductManger.row)}
                  >
                    Đã bán:
                  </label>
                  <input
                    id="solded"
                    name="solded"
                    value={solded}
                    type="text"
                    className={clsx(stylesProductManger.formInput, stylesProductManger.row)}
                    required
                    readOnly
                  />
                  </div>
                </div>
              )}

              <div className={clsx(stylesProductManger.avatarInput, stylesProductManger.col)}>
                <ImageUploader
                  avatarImg={avatarImg}
                  onAvatarChange={setAvatarImg}
                />
              </div>
            </div>

            <div className={stylesProductManger.button}>
              <Button onClick={handleClose}> {textButtonRight} </Button>
              {openInforProduct && <Button onClick={handleOpenDelete}>Xoá sản phẩm</Button>}
              <Button onClick={handleSubmit}>Xác nhận</Button>
            </div>
            
          </Box>
        </Modal>


        <div className={styles.content} >
          <div className={styles.wraper}>
            <div className={stylesProductManger.tdisplay}>  
                <p>Quản lý sản phẩm</p>
                <Button href="#text-buttons" onClick={handleOpen}>Thêm sản phẩm</Button>
            </div>
            
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell> ID </TableCell>
                    <TableCell align="right"> Sản phẩm </TableCell>
                    <TableCell align="right"> Giá tiền </TableCell>
                    <TableCell align="right"> Đã bán </TableCell>
                    <TableCell align="right"> Kho </TableCell>
                    <TableCell align="right"> Đánh giá </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {posts.map((product) => (
                    <TableRow
                      key={product.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {product.id}
                      </TableCell>
                      <TableCell align="right"><Button onClick={() => handleOpenInforProduct(product)}>{product.name}</Button></TableCell>
                      <TableCell align="right">{product.cost}</TableCell>
                      <TableCell align="right">{product.solded}</TableCell>
                      <TableCell align="right">{product.count}</TableCell>
                      <TableCell align="right">{product.rating}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  export default ProductManager;