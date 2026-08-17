import api from "./axios";

// Get All Users
export const getAllUsers = () => {
    return api.get("/admin/users");
};

// Get Single User
export const getSingleUser = (id) => {
    return api.get(`/admin/user/${id}`);
};

// Update User Role
export const updateUserRole = (id, role) => {
    return api.put(`/admin/change-role/${id}`, { role });
};

// Delete User
export const deleteUser = (id) => {
    return api.delete(`/admin/user/${id}`);
};
// Block User
export const blockUser = (id) => {
    return api.put(`/admin/block/${id}`);
};

// Unblock User
export const unblockUser = (id) => {
    return api.put(`/admin/unblock/${id}`);
};
// Create Contact Request
export const createAdminContact = (data) => {
    return api.post("/admin/contact", data);
};

// Get Contact Requests
export const getAdminContacts = () => {
    return api.get("/admin/contacts");
};