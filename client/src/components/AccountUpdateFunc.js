import axiosConfig from "../config/axios";

function updateNickName(newNickName, accessToken){
    return axiosConfig.post('/users/update-nickname', {
        nickName: newNickName
    },{
        headers: {"Authorization":`Bearer ${accessToken}`}
    }).then(res => res.data)
    .catch((err) => {
        console.log(err);
    })
}

function updateEmail(newEmail, accessToken){
    return axiosConfig.post('/users/update-email', {
        newEmail: newEmail
    },{
        headers: {"Authorization":`Bearer ${accessToken}`}
    }).then(res => res.data)
    .catch((err) => {
        console.log(err);
    })
}

function updateAddress(newAddress, accessToken){
    return axiosConfig.post('/users/update-address', {
        newAddress: newAddress
    },{
        headers: {"Authorization":`Bearer ${accessToken}`}
    }).then(res => res.data)
    .catch((err) => {
        console.log(err);
    })
}

function updatePassword(newPassword, accessToken){
    return axiosConfig.post('/users/change-password', {
        newPassword: newPassword
    },{
        headers: {"Authorization":`Bearer ${accessToken}`}
    }).then(res => res.data)
    .catch((err) => {
        console.log(err);
    })
}

function updateAvatarImage(newUrl, accessToken){
    return axiosConfig.post('/users/update-avatar', {
        newUrl: newUrl
    },{
        headers: {"Authorization":`Bearer ${accessToken}`}
    }).then(res => res.data)
    .catch((err) => {
        console.log(err);
    })
}