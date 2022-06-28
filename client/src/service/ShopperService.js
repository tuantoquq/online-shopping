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
