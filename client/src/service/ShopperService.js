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
    response = await shopperApi.put('/shopper/auth/update-profile', updateInfo, {
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
  console.log(product);
  response = await shopperApi({
    url:'/shopper/auth/add-product',
    method:'post',
    headers: { "Content-Type": "multipart/form-data" },
    data:product

  })
  return response;
};

export const getOrder = async (status) => {
  let response;
  try {
    response = await shopperApi({
      url:`/shopper/auth/list-order?status=${status}`,
      method:'get',
      headers: { "Content-Type": "multipart/form-data" },
    })
  } catch (err) {
    console.log(err);
  }
  return response;
};

export const changeOrderStatus = async (status,orderId,reason) => {
  let response;
  let data = {
    status:status,
    orderId:orderId,
    reasonReject:reason}
  try {
    response = await shopperApi({
      url:"/shopper/auth/updateOrder",
      method:'put',
      data:data
    })
  } catch (err) {
    console.log(err);
  }
  return response;
};

export const getShopInformation = async () => {
  let response;
  try {
    response = await shopperApi.get('/shopper/auth/shop-info');
  } catch (err) {
    console.log(err);
  }
  return response;
};