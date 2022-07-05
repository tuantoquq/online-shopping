import adminApi from './AdminApi.js';

export const changeUserStatus = async (email, role, state) => {
  let response;
  try {
    response = await adminApi.post(
      `/admin/auth/on-off-block-user?isBlock=${state === 'Active' ? 1 : 0}`,
      { email: email, role: role },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
  return response;
};

export const changeShopperState = async (shopperId, state) => {
  let response;
  try {
    response = await adminApi.post(
      `/admin/auth/change-state?shopperId=${shopperId}&state=${state}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
  return response;
};
