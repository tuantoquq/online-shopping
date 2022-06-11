import React from 'react';
import clsx from 'clsx';
import styles from './CSS/searchCSS.module.scss';
import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import Header from '../components/header';
import Footer from '../components/footer';
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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Search({ search }) {
  //request data with search term;
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
      value: 'related',
      showed: 'Liên quan',
    },
    {
      value: 'newer',
      showed: 'Mới nhất',
    },
    {
      value: 'bestseller',
      showed: 'Bán chạy',
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

  //for all data -request once time when component construct
  const [allCategories] = useState((search) => getAllCategories(search));
  const [allBrands] = useState((search) => getAllBrands(search));
  const [allLocations] = useState((search) => getAllLocations(search));

  function getAllLocations(searchTerm) {
    // console.log('re-render');
    //get All location from list products
    const ressponseData = [
      'Hà Nội',
      'Hải Phòng',
      'TP. Hồ  Chí Minh',
      'Quận Long Biên',
      'Nghệ An',
      'Quận Hoàng Mai',
    ];
    //console.log(ressponseData);
    return ressponseData; //sample data
  }

  function getAllCategories(searchTerm) {
    const ressponseData = [
      'Phụ kiện máy tính',
      'Đồ chơi',
      'Gamming',
      'Máy tính bàn',
      'Bàn di chuột',
      'Thời trang',
    ];
    //console.log(ressponseData);
    return ressponseData; //sample data
  }

  function getAllBrands(searchTerm) {
    //request data
    const ressponseData = ['Lionvn', 'Creality', 'Phrozen', 'Elgoo'];
    //console.log(ressponseData);
    return ressponseData;
  }

  //for display filter if all data too long
  const [showedCategories, setShowedCategories] = useState(
    allCategories.slice(0, 5)
  );
  const [showedLocations, setShowedLocations] = useState(
    allLocations.slice(0, 5)
  );
  const [showedBrands, setShowedBrands] = useState(allBrands.slice(0, 5));
  const [numPages, setNumPages] = useState(0);
  //console.log(numPages);

  //for changing Filter
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [brands, setBrands] = useState([]);
  const [fromPrice, setFromPrice] = useState('');
  const [toPrice, setToPrice] = useState('');
  const [fromPriceApplied, setFromPriceApplied] = useState(null);
  const [toPriceApplied, setToPriceApplied] = useState(null);
  const [apply, setApply] = useState(false);
  const [rating, setRating] = useState(0);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('related');

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

  //Locations
  const handleLocations = (location) => {
    setLocations((prev) => {
      const isChecked = locations.includes(location);
      if (isChecked) {
        return locations.filter((item) => item !== location);
      } else {
        return [...prev, location];
      }
    });
  };

  function handleSeeLessLocations() {
    const len = allLocations.length;
    setShowedLocations(allLocations.slice(0, 5));
    const checkedUnshowed = allLocations
      .slice(5, len)
      .filter((item) => locations.find((location) => location === item));
    //console.log(checkedUnshowed);
    if (checkedUnshowed.length !== 0) {
      for (const location of checkedUnshowed) {
        //console.log(location);
        setLocations(locations.filter((item) => item !== location));
      }
    }
  }

  // Brands
  const handleBrands = (brand) => {
    setBrands((prev) => {
      const isChecked = brands.includes(brand);
      if (isChecked) {
        return brands.filter((item) => item !== brand);
      } else {
        return [...prev, brand];
      }
    });
  };

  function handleSeeLessBrands() {
    const len = allBrands.length;
    setShowedBrands(allBrands.slice(0, 5));
    const checkedUnshowed = allBrands
      .slice(5, len)
      .filter((item) => brands.find((brand) => brand === item));
    //console.log(checkedUnshowed);
    if (checkedUnshowed.length !== 0) {
      for (const brand of checkedUnshowed) {
        //console.log(brand);
        setBrands(brands.filter((item) => item !== brand));
      }
    }
  }

  function handleApply(apply) {
    //console.log('Set apply to', apply);
    if (apply === true) {
      //console.log(fromPrice === '');
      //console.log(toPrice);
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
      setFromPriceApplied(null);
      setToPriceApplied(null);
      setApply(apply);
    }
  }

  const handlePageChange = (event, value) => {
    //console.log('Page: ', value);
    setPage(value);
  };

  function handleClearAll() {
    setCategories([]);
    setLocations([]);
    setBrands([]);
    setRating();
    setFromPrice('');
    setToPrice('');
    setApply(false);
    setFromPriceApplied(null);
    setToPriceApplied(null);
    setSort('related');
  }
  function getProductIdList(filter, page) {
    //request
    function randomId() {
      return Math.floor(Math.random() * 12 + 1);
    }
    let productIds = [];
    for (let i = 0; i < 12; i++) {
      productIds.push(randomId());
    } //sample data
    //console.log(productIds);
    return productIds;
  }

  //data and request data
  const [productIdList, setProductIdList] = useState([]);
  const [shopId] = useState((search) => getShopId(search));

  // console.log(productIdList);

  function getShopId(searchTerm) {
    //request
    const responseData = Math.floor(Math.random() * 10) + 1;
    return responseData;
  }
  useEffect(() => {
    //console.log('filter change');
    const filter = {
      search: search,
      category: categories,
      location: locations,
      brand: brands,
      rating: rating,
      fromPrice: fromPriceApplied,
      toPrice: toPriceApplied,
      sort: sort,
    };
    //console.log(filter);
    //console.log('Filter changed');
    //request for new data +numPages
    setProductIdList(getProductIdList(filter, 1));
    setNumPages(Math.floor(Math.random() * 8) + 2); //numPages was responsed
    setPage(1);
  }, [
    search,
    categories,
    locations,
    brands,
    rating,
    fromPriceApplied,
    toPriceApplied,
    sort,
  ]);

  useEffect(() => {
    //Request for new data
    const filter = {
      search: search,
      category: categories,
      location: locations,
      brand: brands,
      rating: rating,
      fromPrice: fromPriceApplied,
      toPrice: toPriceApplied,
      sort: sort,
    };
    //console.log('page changed');
    setProductIdList(getProductIdList(filter, page));
    setPage(page);
  }, [page]);

  return (
    <div className={clsx(styles.search)}>
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
          <div className={clsx(styles.searchFilter)}>
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
          </div>
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
        <div className={clsx(styles.searchBody)}>
          <div className={clsx(styles.shopContainer)}>
            <span className={clsx(styles.searchedTitle)}>
              <StorefrontOutlinedIcon className={clsx(styles.searchedIcon)} />{' '}
              Shop liên quan đến '<strong> {search}</strong>'
            </span>
            <ShopCard id={shopId} />
          </div>
          <div>
            <span className={clsx(styles.searchedTitle)}>
              <ManageSearchOutlinedIcon className={clsx(styles.searchedIcon)} />{' '}
              Kết quả tìm kiếm liên quan đến '<strong> {search}</strong>'
            </span>
            <div className={clsx(styles.productContent)}>
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
              <div className={clsx(styles.productContainer)}>
                {productIdList.map((value, index) => (
                  <Grid item xs={1} sm={1} md={1} key={index}>
                    <ProductCard id={value} />
                  </Grid>
                ))}
              </div>
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
