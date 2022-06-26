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