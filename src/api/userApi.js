import api from "./axios";

const getProfile = () => {
  return api.get("/user/profile");
};

const updateProfile = (formData) => {
  return api.put("/user/profile", formData);
};

const changePassword = (data) => {
  return api.put("/user/change-password", data);
};

const setPassword = (data) => {
  return api.put("/user/set-password", data);
};

const uploadProfileImage = (formData) =>
  api.put("/user/profile-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

const deleteProfileImage = () => {
  return api.delete("/user/profile-image");
};

const deleteAccount = (data) => {
  return api.delete("/user/delete-account", {
    data,
  });
};

export const sendChangeEmailOTP = (data) => {
  return api.post("/user/change-email", data);
};

export const verifyChangeEmailOTP = (data) => {
  return api.post("/user/verify-change-email", data);
};

export {
  getProfile,
  updateProfile,
  changePassword,
  setPassword,
  uploadProfileImage,
  deleteProfileImage,
  deleteAccount,
};
