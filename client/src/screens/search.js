import React from 'react';
import clsx from 'clsx';
import styles from './CSS/searchCSS.module.scss';
import { useEffect, useState, useRef } from 'react';
import axios from '../config/axios';
import Header from '../components/header';
import ProductCard from '../components/productCard';
import ShopCard from '../components/shopCard';
import Rating from '@mui/material/Rating';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useParams } from 'react-router-dom';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Search() {
  let { search } = useParams();
  const [cat, setCat] = useState('');
  // if (search.indexOf('category=') >= 0) {
  //   setCat(search.replace('category=', ''));
  // }
  //request data with search term;
  const PRODUCT_SEARCH_URL = `/product/filter`;

  const [error, setError] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setError(false);
  };

  //console.log(search);
  const allRating = useRef([5, 4, 3, 2, 1]);
  const allSort = useRef([
    {
      value: 'pho bien',
      showed: 'Bán chạy',
    },
    {
      value: 'rating',
      showed: 'Đánh giá',
    },
    {
      value: 'moi nhat',
      showed: 'Mới nhất',
    },

    {
      value: 'lowerPrice',
      showed: 'Giá từ thấp đến cao',
    },
    {
      value: 'higherPrice',
      showed: 'Giá từ cao đến thấp',
    },
  ]);

  //for all data -request once time when component
  const [allCategories, setAllCategories] = useState([]);

  const [showedCategories, setShowedCategories] = useState([]);

  useEffect(() => {
    axios
      .get('/category/get?all=true')
      .then((res) => {
        let allCates = res.data.data.map((item) => item.categoryName);
        allCates = new Set(allCates);
        allCates = [...allCates];
        setAllCategories(allCates);
        setShowedCategories(allCates.slice(0, 5));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // const [showedLocations, setShowedLocations] = useState(
  //   allLocations.slice(0, 5)
  // );
  // const [showedBrands, setShowedBrands] = useState(allBrands.slice(0, 5));

  const [numPages, setNumPages] = useState(0);
  //console.log(numPages);

  //for changing Filter
  const [categories, setCategories] = useState([]);
  // const [locations, setLocations] = useState([]);
  // const [brands, setBrands] = useState([]);
  const [fromPrice, setFromPrice] = useState('');
  const [toPrice, setToPrice] = useState('');
  const [fromPriceApplied, setFromPriceApplied] = useState(null);
  const [toPriceApplied, setToPriceApplied] = useState(null);
  const [apply, setApply] = useState(false);
  const [rating, setRating] = useState(0);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('pho bien');
  const [loading, setLoading] = useState(true);

  //Categories
  const handleCategories = (category) => {
    setCategories((prev) => {
      const isChecked = categories.includes(category);
      if (isChecked) {
        return categories.filter((item) => item !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  function handleSeeLessCategories() {
    const len = allCategories.length;
    setShowedCategories(allCategories.slice(0, 5));
    const checkedUnshowed = allCategories
      .slice(5, len)
      .filter((item) => categories.find((category) => category === item));
    //console.log(checkedUnshowed);
    if (checkedUnshowed.length !== 0) {
      for (const category of checkedUnshowed) {
        //console.log(category);
        setCategories(categories.filter((item) => item !== category));
      }
    }
  }

  function handleApply(apply) {
    //console.log('Set apply to', apply);
    if (apply === true) {
      const from = Number(fromPrice);
      const to = Number(toPrice);

      if (fromPrice === '' || toPrice === '') {
        setFromPriceApplied(fromPrice !== '' ? from : null);
        setToPriceApplied(toPrice !== '' ? to : null);
        setApply(apply);
      } else if (to <= from) {
        setError(true);
      } else {
        setFromPriceApplied(from);
        setToPriceApplied(to);
        setApply(apply);
      }
    }
    if (apply === false) {
      setFromPriceApplied(undefined);
      setToPriceApplied(undefined);
      setApply(apply);
    }
  }

  const handlePageChange = (event, value) => {
    //console.log('Page: ', value);
    setPage(value);
  };

  function handleClearAll() {
    setCategories([]);
    // setLocations([]);
    // setBrands([]);
    setRating();
    setFromPrice('');
    setToPrice('');
    setApply(false);
    setFromPriceApplied(undefined);
    setToPriceApplied(undefined);
    setSort('pho bien');
  }

  //data and request data
  const [productIdList, setProductIdList] = useState([]);
  const [shopId, setShopId] = useState('');

  // console.log(productIdList);

  useEffect(() => {
    async function searchShop() {
      //console.log('Filter changed');
      //request for new data +numPages
      try {
        const response = await axios.get(
          `/shops?limit=1&offset=1&name=${search}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            // withCredentials: true,
          }
        );
        // console.log(response);
        setShopId(response.data.data.listShop[0]._id);
      } catch (err) {
        console.log(err);
      }
    }
    if (search.indexOf('category=') >= 0) {
      setCat(search.replace('category=', ''));
      setCategories(search.replace('category=', ''));
    } else {
      setCategories([]);
      searchShop();
    }
  }, [search]);

  useEffect(() => {
    if (search.indexOf('category=') >= 0) {
      const getProductByCat = async () => {
        // console.log(filter);
        //console.log('Filter changed');
        //request for new data +numPages
        try {
          const response = await axios.post(
            '/product/get-product-by-category',
            { categoryName: search.replace('category=', ''), currentPage: 1 },
            {
              headers: {
                'Content-Type': 'application/json',
              },
              // withCredentials: true,
            }
          );
          console.log(response);
          setProductIdList([...response.data.data.products]);
          setNumPages(response.data.data.totalPages); //numPages was responsed
        } catch (err) {
          console.log(err);
        }
      };
      setCat(search.replace('category=', ''));
      setCategories(search.replace('category=', ''));
      setPage(1);
      getProductByCat();
    } else {
      //console.log('filter change');
      setLoading(true);
      const filter = {
        query: search,
        categoryName: categories.length > 0 ? categories : undefined,
        startPrice: fromPriceApplied ? fromPriceApplied : undefined,
        endPrice: toPriceApplied ? toPriceApplied : undefined,
        orderBy:
          sort === 'lowerPrice' || sort === 'higherPrice' ? 'price' : sort,
        sortBy: sort === 'lowerPrice' ? 'asc' : 'desc',
        currentPage: 1,
      };
      // console.log(filter);
      const searchProduct = async () => {
        // console.log(filter);
        //console.log('Filter changed');
        //request for new data +numPages
        try {
          const response = await axios.post(PRODUCT_SEARCH_URL, filter, {
            headers: {
              'Content-Type': 'application/json',
            },
            // withCredentials: true,
          });
          console.log(response);
          setProductIdList([...response.data.data]);
          setNumPages(response.data.maxPage); //numPages was responsed
        } catch (err) {
          console.log(err);
        }
      };
      searchProduct();
      setPage(1);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    search,
    categories,
    // locations,
    // brands,
    rating,
    fromPriceApplied,
    toPriceApplied,
    sort,
  ]);

  useEffect(() => {
    if (search.indexOf('category=') >= 0) {
      const getProductByCat = async () => {
        // console.log(filter);
        //console.log('Filter changed');
        //request for new data +numPages
        try {
          const response = await axios.post(
            '/product/get-product-by-category',
            {
              categoryName: search.replace('category=', ''),
              currentPage: page,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
              // withCredentials: true,
            }
          );
          console.log(response);
          setProductIdList([...response.data.data.products]);
          setNumPages(response.data.data.totalPages); //numPages was responsed
        } catch (err) {
          console.log(err);
        }
      };
      setCat(search.replace('category=', ''));
      setCategories(search.replace('category=', ''));
      getProductByCat();
    } else {
      setLoading(true);
      const filter = {
        query: search,
        categoryName: categories.length > 0 ? categories : undefined,
        startPrice: fromPriceApplied ? fromPriceApplied : undefined,
        endPrice: toPriceApplied ? toPriceApplied : undefined,
        orderBy:
          sort === 'lowerPrice' || sort === 'higherPrice' ? 'price' : sort,
        sortBy: sort === 'lowerPrice' ? 'asc' : 'desc',
        currentPage: page,
      };
      // console.log(filter);
      const searchProduct = async () => {
        // console.log(filter);
        //console.log('Filter changed');
        //request for new data +numPages
        try {
          const response = await axios.post(PRODUCT_SEARCH_URL, filter, {
            headers: {
              'Content-Type': 'application/json',
            },
            // withCredentials: true,
          });
          console.log(response);
          setProductIdList([...response.data.data]);
          setNumPages(response.data.maxPage); //numPages was responsed
        } catch (err) {
          console.log(err);
        }
      };
      searchProduct();
      setPage(page);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className={clsx(styles.search)}>
      <Header />
      <Snackbar
        className={clsx(styles.errorAlert)}
        open={error}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Vui lòng điền khoảng giá phù hợp!
        </Alert>
      </Snackbar>
      <div className={clsx(styles.searchContainer)}>
        {search.indexOf('category=') < 0 && (
          <div className={clsx(styles.searchSidebar)}>
            <h2 className={clsx(styles.sidebarTitle)}>
              {' '}
              <FilterAltIcon /> Bộ lọc tìm kiếm
            </h2>
            <div className={clsx(styles.searchFilter)}>
              <h3>Theo Danh Mục</h3>
              <div>
                {showedCategories.map((category, index) => (
                  <div key={index} className={clsx(styles.rowFilter)}>
                    <input
                      className={clsx(styles.checkBox)}
                      type="checkbox"
                      id={`checkbox${category}`}
                      value={category}
                      checked={categories.includes(category)}
                      onChange={() => {
                        handleCategories(category);
                      }}
                    />
                    <label
                      className={clsx(styles.checkBoxLabel)}
                      htmlFor={`checkbox${category}`}
                    >
                      {category}
                    </label>
                  </div>
                ))}

                {allCategories.length > 5 && (
                  <div className={clsx(styles.rowFilter)}>
                    {showedCategories.length === 5 && (
                      <span
                        className={clsx(styles.viewMore)}
                        onClick={() => setShowedCategories(allCategories)}
                      >
                        <ExpandMoreIcon /> Xem thêm{' '}
                      </span>
                    )}
                    {showedCategories.length > 5 && (
                      <span
                        className={clsx(styles.viewMore)}
                        onClick={handleSeeLessCategories}
                      >
                        <ExpandLessIcon /> Thu gọn{' '}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
            {/* <div className={clsx(styles.searchFilter)}>
            <h3>Nơi Bán</h3>
            <div>
              {showedLocations.map((location, index) => (
                <div key={index} className={clsx(styles.rowFilter)}>
                  <input
                    className={clsx(styles.checkBox)}
                    type="checkbox"
                    id={`checkbox${location}`}
                    value={location}
                    checked={locations.includes(location)}
                    onChange={() => {
                      handleLocations(location);
                    }}
                  />
                  <label
                    className={clsx(styles.checkBoxLabel)}
                    htmlFor={`checkbox${location}`}
                  >
                    {location}
                  </label>
                </div>
              ))}
              {allLocations.length > 5 && (
                <div className={clsx(styles.rowFilter)}>
                  {showedLocations.length === 5 && (
                    <span
                      className={clsx(styles.viewMore)}
                      onClick={() => setShowedLocations(allLocations)}
                    >
                      <ExpandMoreIcon /> Xem thêm{' '}
                    </span>
                  )}
                  {showedLocations.length > 5 && (
                    <span
                      className={clsx(styles.viewMore)}
                      onClick={handleSeeLessLocations}
                    >
                      <ExpandLessIcon /> Thu gọn{' '}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className={clsx(styles.searchFilter)}>
            <h3>Thương Hiệu</h3>
            <div>
              {showedBrands.map((brand, index) => (
                <div key={index} className={clsx(styles.rowFilter)}>
                  <input
                    id={`checkbox${brand}`}
                    className={clsx(styles.checkBox)}
                    type="checkbox"
                    value={brand}
                    checked={brands.includes(brand)}
                    onChange={() => {
                      handleBrands(brand);
                    }}
                  />
                  <label
                    className={clsx(styles.checkBoxLabel)}
                    htmlFor={`checkbox${brand}`}
                  >
                    {brand}
                  </label>
                </div>
              ))}
              {allBrands.length > 5 && (
                <div className={clsx(styles.rowFilter)}>
                  {showedBrands.length === 5 && (
                    <span
                      className={clsx(styles.viewMore)}
                      onClick={() => setShowedBrands(allBrands)}
                    >
                      <ExpandMoreIcon /> Xem thêm{' '}
                    </span>
                  )}
                  {showedBrands.length > 5 && (
                    <span
                      className={clsx(styles.viewMore)}
                      onClick={handleSeeLessBrands}
                    >
                      <ExpandLessIcon /> Thu gọn{' '}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div> */}
            <div className={clsx(styles.searchFilter)}>
              <h3>Khoảng giá</h3>
              <div>
                <div className={clsx(styles.priceFilter)}>
                  <input
                    className={clsx(styles.priceInput)}
                    type="text"
                    pattern="[0-9]*"
                    value={fromPrice}
                    onChange={(e) => {
                      setFromPrice((v) =>
                        e.target.validity.valid ? e.target.value : v
                      );
                    }}
                    placeholder="đ Từ"
                    disabled={apply}
                  />
                  <span> - </span>
                  <input
                    className={clsx(styles.priceInput)}
                    type="text"
                    pattern="[0-9]*"
                    value={toPrice}
                    onChange={(e) => {
                      setToPrice((v) =>
                        e.target.validity.valid ? e.target.value : v
                      );
                    }}
                    placeholder="đ Đến"
                    disabled={apply}
                  />
                </div>
                <div className={clsx(styles.rowFilter, styles.buttonGroup)}>
                  <Button
                    className={clsx(styles.button)}
                    variant="contained"
                    onClick={() => handleApply(true)}
                    disabled={apply || (fromPrice === '' && toPrice === '')}
                  >
                    Áp dụng
                  </Button>

                  <Button
                    className={clsx(styles.button)}
                    variant="contained"
                    color="error"
                    onClick={() => {
                      handleApply(false);
                    }}
                    disabled={!apply}
                  >
                    Hủy
                  </Button>
                </div>
              </div>
            </div>
            <div className={clsx(styles.searchFilter)}>
              <h3>Đánh giá</h3>
              <div>
                {allRating.current.map((rate) => (
                  <div key={rate} className={clsx(styles.rowFilter)}>
                    <input
                      id={`radio${rate}`}
                      className={clsx(styles.inputRadio)}
                      type="radio"
                      value={rate}
                      checked={rating === rate}
                      onChange={() => {
                        setRating(rate);
                      }}
                    />
                    <label
                      className={clsx(styles.radioLabel)}
                      htmlFor={`radio${rate}`}
                    >
                      <Rating
                        className={clsx(styles.rating)}
                        value={rate}
                        div
                        disabled
                      />
                      {rate === 5 || <span> trở lên</span>}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <Button
              className={clsx(styles.button)}
              variant="contained"
              onClick={handleClearAll}
            >
              Xóa tất cả
            </Button>
          </div>
        )}
        <div className={clsx(styles.searchBody)}>
          {shopId && (
            <div className={clsx(styles.shopContainer)}>
              <span className={clsx(styles.searchedTitle)}>
                <StorefrontOutlinedIcon className={clsx(styles.searchedIcon)} />{' '}
                Shop liên quan đến '<strong> {search}</strong>'
              </span>
              <ShopCard id={shopId} />
            </div>
          )}
          <div>
            <span className={clsx(styles.searchedTitle)}>
              <ManageSearchOutlinedIcon className={clsx(styles.searchedIcon)} />{' '}
              {search.indexOf('category=') >= 0
                ? `Sản phẩm thuộc danh mục '${cat}'`
                : `Kết quả tìm kiếm liên quan đến '${search}'`}
            </span>
            <div className={clsx(styles.productContent)}>
              {search.indexOf('category=') < 0 && (
                <div className={clsx(styles.productSort)}>
                  <span className={clsx(styles.productSortTitle)}>
                    Sắp xếp theo{' '}
                  </span>
                  <div className={clsx(styles.productSortNav)}>
                    {allSort.current.map((item) => (
                      <div
                        key={item.value}
                        className={clsx(styles.productSortItem)}
                      >
                        <button
                          className={clsx(
                            styles.productSortBtn,
                            sort === item.value && styles.selectedItem
                          )}
                          onClick={() => setSort(item.value)}
                        >
                          {item.showed}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {productIdList.length === 0 ? (
                <div className={clsx(styles.productContainer)}>
                  Không tìm thấy kết quả nào
                </div>
              ) : (
                <div className={clsx(styles.productContainer)}>
                  {productIdList.map((value, index) => (
                    <Grid item xs={1} sm={1} md={1} key={index}>
                      <ProductCard productId={value} />
                    </Grid>
                  ))}
                </div>
              )}
              {numPages > 1 && (
                <div className={clsx(styles.pagination)}>
                  <Stack spacing={2}>
                    <Pagination
                      count={numPages}
                      page={page}
                      variant="outlined"
                      shape="rounded"
                      color="primary"
                      onChange={handlePageChange}
                    />
                  </Stack>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
