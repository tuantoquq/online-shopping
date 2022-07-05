import shopperApi from './ShopperApi.js';

export const getShopperProfile = async () => {
  let response;
  try {
    response = await shopperApi.get('/shopper/auth/get-profiles');
  } catch (err) {
    console.log(err);
  }
  return response;
};

export const updateShopperProfile = async (updateInfo) => {
  let response;
  try {
    response = await shopperApi.post('/shopper/auth/update', updateInfo, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    console.log(err);
  }
  return response;
};

export const deleteProduct = async (id) => {
  let response;
  try {
    response = await shopperApi.delete(`/product/auth/delete/${id}`);
  } catch (err) {
    console.log(err);
  }
  return response;
};

export const UpdateProduct = async (id, product) => {
  let response;
  try {
    response = await shopperApi.put(`/product/auth/update/${id}`, product, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    console.log(err);
  }
  return response;
};

export const AddProduct = async (product) => {
  let response;
  try {
    response = await shopperApi({
      url:'/shopper/auth/add-product',
      method:'post',
      headers: { "Content-Type": "multipart/form-data" },
      data:product

    })
  } catch (err) {
    console.log(err);
  }
  return response;
};
