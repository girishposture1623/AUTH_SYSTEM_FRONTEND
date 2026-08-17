import api from './axios.js';

const register = (data) => {
    return api.post('/auth/register', data);
};

 const verifyOtp = (data) => {
    return api.post("/auth/verify-otp", data);
};


const resendOtp = (data)=>{
    return api.post("/auth/resend-otp", data)
}

const login = (data)=>{
    return api.post('/auth/login', data)
}
const forgotPassword = (data)=>{
    return api.post('/auth/forgot-password', data)
}

const verifyResetOtp = (data=>{
    return api.post('/auth/verify-reset-otp', data)
})

const resetPassword = (data)=>{
    return api.post("/auth/reset-password", data)
}

const logOut = ()=>{
    return api.post("/auth/logout")
}

const getCurrentUser = ()=>{
    return api.get("/auth/me")
}

export { register, verifyOtp , resendOtp, login,forgotPassword,verifyResetOtp,
resetPassword, logOut, getCurrentUser,
};
