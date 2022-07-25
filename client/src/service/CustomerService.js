import customerApi from './CustomerApi.js';

export const getCustomerProfile = async () => {
    let response;
    try{
        response = await customerApi.get('/customer/auth/get-profiles');
    }catch(err){
        console.log(err);
    }
    return response;
}

export const updateCustomerProfile = async (updateInfo) => {
    let response;
    try{
        response = await customerApi.post('/customer/auth/update', updateInfo, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }catch(err){
        console.log(err);
    }
    return response;
}
export const addCartItem = async (item) => {
    let response;
    try{
        response = await customerApi.post('/customer/auth/cart/add', item, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }catch(err){
        console.log(err);
    }
    return response;
}

export const getCartItem = async () => {
    let response;
    try{
        response = await customerApi.get('/customer/auth/cart');
    }catch(err){
        console.log(err);
    }
    return response;
}

export const deleteCartItem = async (cartId) => {
    let response;
    try{
        response = await customerApi.delete(`/customer/auth/cart/delete/${cartId}`);
    }catch(err){
        console.log(err);
    }
    return response;
}

export const updateCartItem = async (quantity) => {
    let response;
    try{
        response = await customerApi.put(`/customer/auth/cart/update`, quantity, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }catch(err){
        console.log(err);
    }
    return response;
}
export const getListCartItems = async() =>{
    let response;
    try{
        response = await customerApi.get('/customer/auth/cart');
    }catch(err){
        console.log(err);
    }
    return response;
}
export const getListAddress = async () => {
    let response;
    try{
        response = await customerApi.get('/customer/auth/delivery-address');
    }catch(err){
        console.log(err);
    }
    return response;
}

export const addAddress = async (address) => {
    let response;
    try{
        response = await customerApi.post('/customer/auth/delivery-address', address, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }catch(err){
        console.log(err);
    }
    return response;
}
export const updateAddress = async (address_id, change) => {
    let response;
    try{
        response = await customerApi.put(`/customer/auth/delivery-address/${address_id}`, change, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }catch(err){
        console.log(err);
    }
    return response;
}
export const addOrder = async (order) => {
    let response;
    try{
        response = await customerApi.post('/customer/auth/orders', order, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }catch(err){
        console.log(err);
    }
    return response;
}

export const getOrderHistory = async () => {
    let response;
    try{
        response = await customerApi.get('/customer/auth/orders');
    }catch(err){
        console.log(err);
    }
    return response;
}

export const uploadAvatar = async (avatar) => {
    let response;
    try{
        response = await customerApi.put('/customer/auth/update-avatar', avatar, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }catch(err){
        console.log(err);
    }
    return response;
}


export const addComment = async (data) => {
    let response;
    response = await customerApi.post('/customer/auth/comments', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response;
}

export const cancelOrder = async (idOrder) => {
    let response;
    try{
        response = await customerApi.post(`/customer/auth/cancel-order?orderId=${idOrder}`);
    }catch(err){
        console.log(err);
    }
    return response;
}