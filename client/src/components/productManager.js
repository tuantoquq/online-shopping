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
import stylesProductManger from '../screens/CSS/productManager.module.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import clsx from 'clsx';
import axios from '../config/axios';
import MuiAlert from '@mui/material/Alert';
import ImageUploader from '../components/imageUploader';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import InformationTab from '../components/informationTab';
import stylesTab from '../screens/CSS/seller_acceptOrder.module.css';
import axiosConfig from '../config/axios';
import SearchBar from 'material-ui-search-bar';
import { makeStyles } from '@material-ui/core/styles';
import { deleteProduct } from '../service/ShopperService';

import { UpdateProduct } from '../service/ShopperService';
import { AddProduct } from '../service/ShopperService';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { Navigate } from 'react-router-dom';
import TokenService from '../service/TokenService';
import RoleService from '../service/RoleService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getShopInformation } from '../service/ShopperService';
import Snackbar from '@mui/material/Snackbar';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const defautlAvatar =
  'https://res.cloudinary.com/trinhvanthoai/image/upload/v1655489389/thoaiUploads/defaultAvatar_jxx3b9.png';

//sorty
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

let Order = 'asc' | 'desc';

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: 'productName',
    numeric: false,
    disablePadding: false,
    label: 'Tên sản phẩm',
  },
  { id: 'price', numeric: true, disablePadding: false, label: 'Giá tiền' },
  { id: 'soldHistory', numeric: true, disablePadding: false, label: 'Đã bán' },
  { id: 'count', numeric: true, disablePadding: false, label: 'Kho' },
  { id: 'ratingStar', numeric: true, disablePadding: false, label: 'Đánh giá' },
  {
    id: 'updateAt',
    numeric: false,
    disablePadding: false,
    label: 'Cập nhật lần cuối',
  },
];

function stableSort(array, compare) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = compare(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function ProductManager() {
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
    setTextTitle('Nhập thông tin sản phẩm');
    setTextButtonRight('Huỷ');
    setErrMsg('');
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
    setId(product?._id)
    setName(product?.productName);
    setDetail(product?.shortDescription);
    setCount(product?.count);
    setCost(product?.price);
    setErrMsg('');
    // let pathCategory = `/category/get?categoryId=${product?.categoryId}`
    // axiosConfig.get(pathCategory).then(async res=>{
    //   setType(res.data.data?.categoryName);
    // })
    // .catch(err=>{
    //   console.log(err)
    // })

    setType(product?.categoryId);
    setSolded(product?.soldHistory);
    setRating(product?.ratingStar);
    setAvatarImg(product?.imageUrls[0]?.base_url);
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
  const [listCategory, setListCategory] = useState();
  const [categoryId, setCategoryId] = useState('');

  const [data, setData] = useState();
  const [searched, setSearched] = useState('');
  const classes = useStyles();

  const [currProductId, setCurrProductId] = useState('');

  const requestSearch = (searchedVal) => {
    const filteredRows = productData?.filter((row) => {
      return row.productName.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setData(filteredRows);
  };

  const cancelSearch = () => {
    setSearched('');
    requestSearch(searched);
  };
  // info
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [openerrMsg, setOpenerrMsg] = useState(false);
  const handleCloseErrMsg = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenerrMsg(false);
    setErrMsg('');
  };
  useEffect(() => {
    if (errMsg !== '') {
      setOpenerrMsg(true);
    }
  }, [errMsg]);
  //console.log(avatarImg);

  const handleCloseAvatar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setErrMsg('');
  };

  const [openDelete, setDelete] = useState(false);
  const handleOpenDelete = () => setDelete(true);
  const handleCloseDelete = () => setDelete(false);

  // category
  const handleChange = (e) => {
    setType(e.target.value);
    console.log(e.target.value)
  };
  //submit product
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (openInforProduct) {
      if(cost <  0){
        setErrMsg("Giá phải là một số dương")
        toast.error("Loại sản phẩm không được để trống!", {theme: "colored" })
      } else if (count < 0) {
        setErrMsg("Số lượng phải là một số dương")
        toast.error("Loại sản phẩm không được để trống!", {theme: "colored" })
      } else if (name === '') {
        setErrMsg("Tên sản phẩm không được để trống")
        toast.error("Loại sản phẩm không được để trống!", {theme: "colored" })
      } else if (type === '') {
        setErrMsg("Loại sản phẩm không được để trống")
        toast.error("Loại sản phẩm không được để trống!", {theme: "colored" })
      } else if (errMsg === ''){
          let data = {};
          data = {
            productName: name,
            count: count,
            price: cost,
            shortDescription: detail,
            categoryId: type,
            imageUrls: []
          };
          console.log(data);
          try {
            UpdateProduct(id, data).then( res => {
                toast.success("Cập nhật sản phẩm thành công!",{theme: "colored" })
                handleClose();  
              }
            )
            .catch(err => {
              console.log(err)
            })
          } catch (err) {
            if (!err?.response) {
              setErrMsg('No Server Response');
              toast.error("No Server Response!", {theme: "colored" })
            } else {
              setErrMsg('Cập nhật sản phẩm thành công');
              toast.success("Cập nhật sản phẩm thành công!",{theme: "colored" })
              console.log(err);
              handleClose();
            }
          }
        }

      } else {
        if(cost <  0){
          setErrMsg("Giá phải là một số dương")
          toast.error("Loại sản phẩm không được để trống!", {theme: "colored" })
        } else if (count < 0) {
          setErrMsg("Số lượng phải là một số dương")
          toast.error("Loại sản phẩm không được để trống!", {theme: "colored" })
        } else if (name === '') {
          setErrMsg("Tên sản phẩm không được để trống")
          toast.error("Loại sản phẩm không được để trống!", {theme: "colored" })
        } else if (type === '') {
          setErrMsg("Loại sản phẩm không được để trống")
          toast.error("Loại sản phẩm không được để trống!", {theme: "colored" })
        } 
        else if (errMsg === '') { 
          let data = {}
          data = {
            productName: name,
            shortDescription: detail,
            longDescription: detail,
            price: cost,
            soldHistory: 0,
            sizes: { "type": "color", "values": ["black", "white"] },
            count: count,
            categoryId: type,
            files: avatarImg
          };
          var form_data = new FormData();
          for (var key in data) {
            form_data.append(key, data[key]);
          }

          try {
            AddProduct(form_data).then(res =>{
              toast.success("Thêm sản phẩm thành công!",{theme: "colored" })
              handleClose();
            }
              
            ).catch(err => {
              toast.error("Thêm sản phẩm thật bại!",{theme: "colored" })

              console.log(err);
            });
          } catch (err) {
            if (!err?.response) {
              setErrMsg('No Server Response');
            } else {
              setErrMsg('Thêm sản phẩm thành công');
              toast.success("Thêm sản phẩm thành công!",{theme: "colored" })
              console.log(err);
              handleClose();
            }
          }
      }
    }
  };

  //delete product
  const handleDelete = async (e) => {
    console.log(id);
    deleteProduct(id)
      .then
      // res => {
      //     console(res);
      // }
      ()
      .catch((err) => {
        console.log(err);
      });
    handleCloseDelete();
    handleClose();
    axiosConfig
      .get(pathShop)
      .then(async (res) => {
        setShopData(res.data.data);
        await axiosConfig
          .get(pathProduct)
          .then((res) => {
            setProductData(res?.data?.data?.products);
            setData(res?.data?.data?.products);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // api
  const [shopData, setShopData] = useState();
  const [productData, setProductData] = useState();

  let s = window.location.href.split('/')
  let tmp = '629ddb1783ec9b8c85475236'
  let pathShop = `/shops/profile?shopId=${tmp}`
  let pathProduct = `/shops/list-products?shopId=${tmp}&limit=1000`
  let pathListCategory = '/category/get?all=true'

  useEffect(() => {
    getShopInformation()
    .then(async (res) => {
      // console.log(res?.data?.data);
      let tmp = res?.data?.data?._id
      console.log(tmp)
      let pathShop = `/shops/profile?shopId=${tmp}`
      let pathProduct = `/shops/list-products?shopId=${tmp}&limit=1000`
      await axiosConfig.get(pathShop).then(async res => {
        setShopData(res.data.data)
        await axiosConfig.get(pathProduct).then(res => {
          setProductData(res?.data?.data?.products)
          setData(res?.data?.data?.products)
        })
          .catch(err => {
            console.log(err)
          })
        await axiosConfig.get(pathListCategory).then(res => {
          setListCategory(res?.data?.data)
        })
          .catch(err => {
            console.log(err)
          })
      })
      .catch(err => {
        console.log(err)
      })
    })
    .catch((err) => {
      console.log(err);
    });
  }, [open])

  // sort && page
  const [searchTerm, setSearchTerm] = useState('');

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = React.useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = React.useState('id');
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - productData?.length) : 0;
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
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
        <div className={styles.Home}>
          <Header />
          <div
            className={
              errMsg
                ? clsx(styles.snackbar, styles.show)
                : clsx(styles.snackbar, styles.offscreen)
            }
            aria-live="assertive"
          >
            <Snackbar open={openerrMsg} autoHideDuration={2000} onClose={handleCloseErrMsg}>
              <Alert
                onClose={handleCloseErrMsg}
                severity="error"
                sx={{ width: '100%' }}
              >
                {errMsg}
              </Alert>
            </Snackbar>
          </div>
          <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className={stylesProductManger.box}>
              <Modal
                open={openDelete}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box className={stylesProductManger.deletebox}>
                  <div className={styles.wraper}>
                    <p className={stylesProductManger.formdelete}>
                      {' '}
                      Xác nhận xoá ?{' '}
                    </p>
                  </div>
                  <div className={stylesProductManger.button}>
                    <Button onClick={handleCloseDelete}> Huỷ </Button>
                    <Button onClick={handleDelete}>Xác nhận</Button>
                  </div>
                </Box>
              </Modal>
              <div className={stylesProductManger.wraper}>
                <p> {textTitle} </p>
              </div>
              <form>

              <div className={stylesProductManger.row}>
                <div className={stylesProductManger.flex}>
                  <div className={stylesProductManger.row2}>
                    {openInforProduct && (
                      <div className={clsx(stylesProductManger.formRow)}>
                        <label
                          htmlFor="id"
                          className={clsx(
                            stylesProductManger.formLabel,
                            stylesProductManger.row11
                          )}
                        >
                          ID:
                        </label>
                        <input
                          id="id"
                          name="id"
                          value={id}
                          type="text"
                          className={clsx(
                            stylesProductManger.formInput,
                            stylesProductManger.row
                          )}
                          required
                          readOnly
                        />
                      </div>
                    )}

                    <div className={clsx(stylesProductManger.formRow)}>
                      <label
                        htmlFor="name"
                        className={clsx(
                          stylesProductManger.formLabel,
                          stylesProductManger.row11
                        )}
                      >
                        Tên sản phẩm:
                      </label>
                      <input
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        className={clsx(
                          stylesProductManger.formInput2,
                          stylesProductManger.row
                        )}
                        placeholder="Tên sản phẩm..."
                        required
                      />
                    </div>

                    <div className={clsx(stylesProductManger.formRow)}>
                      <label
                        htmlFor="count"
                        className={clsx(
                          stylesProductManger.formLabel,
                          stylesProductManger.row11
                        )}
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
                        className={clsx(
                          stylesProductManger.formInput,
                          stylesProductManger.row
                        )}
                        required
                      />
                    </div>

                    <div className={clsx(stylesProductManger.formRow)}>
                      <label
                        htmlFor="cost"
                        className={clsx(
                          stylesProductManger.formLabel,
                          stylesProductManger.row11
                        )}
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
                        className={clsx(
                          stylesProductManger.formInput,
                          stylesProductManger.row
                        )}
                        required
                      />
                    </div>
                  </div>

                  <div
                    className={clsx(
                      stylesProductManger.avatarInput,
                      stylesProductManger.col
                    )}
                  >
                    <ImageUploader
                      avatarImg={avatarImg}
                      onAvatarChange={setAvatarImg}
                    />
                  </div>
                </div>

                <div className={clsx(stylesProductManger.formRow)}>
                  <label
                    htmlFor="type"
                    className={clsx(stylesProductManger.formLabel, stylesProductManger.row1)}
                  >
                    Loại sản phẩm:
                  </label>
                  <FormControl className={clsx(stylesProductManger.formInput, stylesProductManger.row)}>
                    <InputLabel id="demo-simple-select-label"> Loại sản phẩm </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={type}
                      label="Thể loại"
                      onChange={handleChange}
                    >
                      {listCategory?.map((category, index) => {
                        return (
                          <MenuItem value={category?._id} key={category?._id}>{category?.categoryName}</MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                </div>

                {openInforProduct && (
                  <div>
                    <div className={clsx(stylesProductManger.formRow)}>
                      <label
                        htmlFor="rating"
                        className={clsx(
                          stylesProductManger.formLabel,
                          stylesProductManger.row1
                        )}
                      >
                        Đánh giá:
                      </label>
                      <input
                        id="rating"
                        name="rating"
                        value={rating}
                        type="text"
                        className={clsx(
                          stylesProductManger.formInput,
                          stylesProductManger.row
                        )}
                        required
                        readOnly
                      />
                    </div>

                    <div className={clsx(stylesProductManger.formRow)}>
                      <label
                        htmlFor="solded"
                        className={clsx(
                          stylesProductManger.formLabel,
                          stylesProductManger.row1
                        )}
                      >
                        Đã bán:
                      </label>
                      <input
                        id="solded"
                        name="solded"
                        value={solded}
                        type="text"
                        className={clsx(
                          stylesProductManger.formInput,
                          stylesProductManger.row
                        )}
                        required
                        readOnly
                      />
                    </div>
                  </div>
                )}

                <div className={clsx(stylesProductManger.formRow)}>
                  <label
                    htmlFor="detail"
                    className={clsx(
                      stylesProductManger.formLabel,
                      stylesProductManger.row1
                    )}
                  >
                    Mô tả:
                  </label>
                  <input
                    id="detail"
                    name="detail"
                    type="detail"
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}
                    className={clsx(
                      stylesProductManger.formInput2,
                      stylesProductManger.row
                    )}
                    placeholder="Mô tả..."
                    required
                  />
                </div>
              </div>
                
              </form>
              <div className={stylesProductManger.button}>
                <Button onClick={handleClose}> {textButtonRight} </Button>
                {openInforProduct && (
                  <Button onClick={handleOpenDelete}>Xoá sản phẩm</Button>
                )}
                <Button onClick={handleSubmit}>Xác nhận</Button>
              </div>
            </Box>
          </Modal>

          <div className={stylesTab.content}>
            <div className={stylesTab.tab1}>
              <InformationTab />
            </div>

            <div className={stylesTab.tab2}>
              <div className={styles.wraper}>
                <div className={stylesProductManger.tdisplay}>
                  <p>Quản lý sản phẩm</p>
                  <Button href="#text-buttons" onClick={handleOpen}>
                    Thêm sản phẩm
                  </Button>
                </div>

                <SearchBar
                  value={searched}
                  onChange={(searchVal) => requestSearch(searchVal)}
                  onCancelSearch={() => cancelSearch()}
                  placeholder="Tìm sản phẩm . . ."
                />

                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <EnhancedTableHead
                      order={order}
                      orderBy={orderBy}
                      onRequestSort={handleRequestSort}
                      rowCount={data?.length}
                    />
                    <TableBody>
                      {data
                        ?.slice()
                        .sort(getComparator(order, orderBy))
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((product, index) => {
                          const isItemSelected = isSelected(product.id);
                          const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                            <TableRow
                              hover
                              onClick={(event) =>
                                handleClick(event, product.id)
                              }
                              role="checkbox"
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={product.id}
                              selected={isItemSelected}
                            >
                              <TableCell component="th" scope="row">
                                <Button
                                  onClick={() =>
                                    handleOpenInforProduct(product)
                                  }
                                >
                                  {product?.productName}
                                </Button>
                              </TableCell>
                              <TableCell align="left">
                                {product?.price}
                              </TableCell>
                              <TableCell align="left">
                                {product?.soldHistory}
                              </TableCell>
                              <TableCell align="left">
                                {product?.count}
                              </TableCell>
                              <TableCell align="left">
                                {product?.ratingStar}
                              </TableCell>
                              <TableCell align="left">
                                {new Date(product?.updateAt).toLocaleString()}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      {emptyRows > 0 && <TableRow></TableRow>}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 15]}
                  component="div"
                  count={data?.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </div>
            </div>
          </div>
          <ToastContainer />

          <Footer />
        </div>
      );
    }
  }
}

export default ProductManager;
