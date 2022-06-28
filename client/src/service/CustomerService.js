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