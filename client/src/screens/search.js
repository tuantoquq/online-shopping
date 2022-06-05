import clsx from 'clsx';
import styles from './CSS/searchCSS.module.scss';
import { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Rating from '@mui/material/Rating';
import ProductCard from '../components/productCard';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

var allProductIds = [];

const allRating = [5, 4, 3, 2, 1];

function Search(navigation, search) {
  //request data with search term;

  //for all data -request once time when component construct
  const [allCategories] = useState((search) => getAllCategories(search));
  const [allBrands] = useState((search) => getAllBrands(search));
  const [allLocations] = useState((search) => getAllLocations(search));

  //for User Input (checkbox)
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [brands, setBrands] = useState([]);
  const [fromPrice, setFromPrice] = useState('');
  const [toPrice, setToPrice] = useState('');
  const [rating, setRating] = useState(0);

  //for display data if all data too long
  const [showedCategories, setShowedCategories] = useState(
    allCategories.slice(0, 5)
  );
  const [showedLocations, setShowedLocations] = useState(
    allLocations.slice(0, 5)
  );
  const [showedBrands, setShowedBrands] = useState(allBrands.slice(0, 5));

  const [productIdList, setProductIdList] = useState((search) =>
    getProductIdList(search)
  );

  function getAllCategories(searchTerm) {
    //requestData
    const ressponseData = [
      'Phụ kiện máy tính',
      'Đồ chơi',
      'Gamming',
      'Máy tính bàn',
      'Bàn di chuột',
      'Thời trang',
    ];
    console.log(ressponseData);
    return ressponseData; //sample data
  }

  function getAllLocations(searchTerm) {
    //get All location from list products
    const ressponseData = [
      'Hà Nội',
      'Hải Phòng',
      'TP. Hồ  Chí Minh',
      'Quận Long Biên',
      'Nghệ An',
      'Quận Hoàng Mai',
    ];
    console.log(ressponseData);
    return ressponseData; //sample data
  }

  function getAllBrands(searchTerm) {
    //request data
    const ressponseData = ['Lionvn', 'Creality', 'Phrozen', 'Elgoo'];
    console.log(ressponseData);
    return ressponseData;
  }

  function getProductIdList(searchTerm) {
    //request data
    allProductIds = [1, 2, 3, 4, 5, 6, 7]; //sample data
    return [
      1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1,
      1, 2, 1, 2, 1,
    ];
  }

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

  function handleSeeLessCategories() {
    const len = allCategories.length;
    setShowedCategories(allCategories.slice(0, 5));
    for (const category of allCategories.slice(5, len)) {
      setCategories(categories.filter((item) => item !== category));
    }
  }

  function handleSeeLessLocations() {
    const len = allLocations.length;
    setShowedLocations(allLocations.slice(0, 5));
    for (const location of allLocations.slice(5, len)) {
      setLocations(locations.filter((item) => item !== location));
    }
  }

  function handleSeeLessBrands() {
    const len = allBrands.length;
    setShowedBrands(allBrands.slice(0, 5));
    for (const brand of allBrands.slice(5, len)) {
      setBrands(brands.filter((item) => item !== brand));
    }
  }

  function handleClearAll() {
    setCategories([]);
    setLocations([]);
    setBrands([]);
    setRating();
    setFromPrice('');
    setToPrice('');
  }

  function handleClearPriceRange() {
    setFromPrice('');
    setToPrice('');
  }

  return (
    <div className="search">
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
                />
                <span> đ - </span>
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
                />
                <span> đ </span>
              </div>
              <div className={clsx(styles.rowFilter, styles.buttonGroup)}>
                <Button
                  className={clsx(styles.button)}
                  variant="contained"
                  color="success"
                  // onClick={handleClearAll}
                >
                  Áp dụng
                </Button>

                <Button
                  className={clsx(styles.button)}
                  variant="contained"
                  color="error"
                  onClick={handleClearPriceRange}
                >
                  Hủy
                </Button>
              </div>
            </div>
          </div>
          <div className={clsx(styles.searchFilter)}>
            <h3>Đánh giá</h3>
            <div>
              {allRating.map((rate) => (
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
        <div sx={{ flexGrow: 1 }} className={clsx(styles.searchBody)}>
          <Grid
            container
            spacing={{ xs: 1, md: 1 }}
            columns={{ xs: 2, sm: 3, md: 4 }}
          >
            {productIdList.map((value, index) => (
              <Grid item xs={1} sm={1} md={1} key={index}>
                <ProductCard id={value} />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default Search;
