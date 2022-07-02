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