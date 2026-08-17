import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import "../../Styles/Dashboard/Admin.css";

import Loader from "../../components/Loader/Loader";

import {
  getAllUsers,
  updateUserRole,
  blockUser,
  unblockUser,
  deleteUser,
  getAdminContacts,
} from "../../api/adminApi";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [contactsLoading, setContactsLoading] = useState(true);


  // =====================================================
  // Users
  // =====================================================

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();

      setUsers(response.data.users);

    } catch (error) {

      if (!error.response) {
        toast.error(
          "Server is unavailable. Please try again later."
        );
        return;
      }

      toast.error(
        error.response?.data?.message ||
        "Failed to load users."
      );

    } finally {
      setLoading(false);
    }
  };


  // =====================================================
  // Contact Requests
  // =====================================================

  const fetchContacts = async () => {
    try {
      const response = await getAdminContacts();

      setContacts(response.data.contacts);

    } catch (error) {

      if (!error.response) {
        toast.error(
          "Server is unavailable. Please try again later."
        );
        return;
      }

      toast.error(
        error.response?.data?.message ||
        "Failed to load contact requests."
      );

    } finally {
      setContactsLoading(false);
    }
  };


  // =====================================================
  // Initial Load
  // =====================================================

  useEffect(() => {
    fetchUsers();
    fetchContacts();
  }, []);


  // =====================================================
  // Role Change
  // =====================================================

  const handleRoleChange = async (
    userId,
    currentRole
  ) => {

    try {

      const newRole =
        currentRole === "admin"
          ? "user"
          : "admin";

      const response =
        await updateUserRole(
          userId,
          newRole
        );

      toast.success(
        response.data.message
      );

      fetchUsers();

    } catch (error) {

      if (!error.response) {
        toast.error(
          "Server is unavailable. Please try again later."
        );
        return;
      }

      toast.error(
        error.response?.data?.message ||
        "Failed to update role."
      );
    }
  };


  // =====================================================
  // Block / Unblock
  // =====================================================

  const handleBlockToggle = async (
    userId,
    isBlocked
  ) => {

    try {

      const response = isBlocked
        ? await unblockUser(userId)
        : await blockUser(userId);

      toast.success(
        response.data.message
      );

      fetchUsers();
      fetchContacts();

    } catch (error) {

      if (!error.response) {
        toast.error(
          "Server is unavailable. Please try again later."
        );
        return;
      }

      toast.error(
        error.response?.data?.message ||
        "Failed to update block status."
      );
    }
  };


  // =====================================================
  // Delete User
  // =====================================================

  const handleDelete = async (userId) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this user?"
      );

    if (!confirmDelete) {
      return;
    }

    try {

      const response =
        await deleteUser(userId);

      toast.success(
        response.data.message
      );

      fetchUsers();

    } catch (error) {

      if (!error.response) {
        toast.error(
          "Server is unavailable. Please try again later."
        );
        return;
      }

      toast.error(
        error.response?.data?.message ||
        "Failed to delete user."
      );
    }
  };


  // =====================================================
  // Main Loading
  // =====================================================

  if (loading) {
    return <Loader />;
  }


  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="admin-dashboard">

      <h1>
        Admin Dashboard
      </h1>


      {/* =================================================
          Users
      ================================================= */}

      <h3>
        Total Users : {users.length}
      </h3>


      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          marginTop: "20px",
        }}
      >

        <thead>

          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Verified</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>

        </thead>


        <tbody>

          {users.map((user) => (

            <tr key={user._id}>

              <td>
                {user.name}
              </td>


              <td>
                {user.email}
              </td>


              <td>
                {user.role}
              </td>


              <td>
                {user.isVerified
                  ? "✅"
                  : "❌"}
              </td>


              <td>
                {user.isBlocked
                  ? "🔴 Blocked"
                  : "🟢 Active"}
              </td>


              <td>

                {/* Role */}

                <button
                  type="button"
                  onClick={() =>
                    handleRoleChange(
                      user._id,
                      user.role
                    )
                  }
                >
                  {user.role === "admin"
                    ? "Make User"
                    : "Make Admin"}
                </button>


                {" "}


                {/* Block / Unblock */}

                <button
                  type="button"
                  onClick={() =>
                    handleBlockToggle(
                      user._id,
                      user.isBlocked
                    )
                  }
                >
                  {user.isBlocked
                    ? "Unblock User"
                    : "Block User"}
                </button>


                {" "}


                {/* Delete */}

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(
                      user._id
                    )
                  }
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>


      {/* =================================================
          Contact Requests
      ================================================= */}

      <div
        style={{
          marginTop: "50px",
        }}
      >

        <h2>
          Contact Requests
        </h2>


        {contactsLoading ? (

          <p>
            Loading contact requests...
          </p>

        ) : contacts.length === 0 ? (

          <p>
            No contact requests found.
          </p>

        ) : (

          <table
            border="1"
            cellPadding="10"
            style={{
              width: "100%",
              marginTop: "20px",
            }}
          >

            <thead>

              <tr>
                <th>Email</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>


            <tbody>

              {contacts.map(
                (contact) => (

                  <tr
                    key={contact._id}
                  >

                    <td>
                      {contact.email}
                    </td>


                    <td>
                      {contact.subject}
                    </td>


                    <td>
                      {contact.message}
                    </td>


                    <td>
                      {contact.status ===
                      "pending"
                        ? "🟡 Pending"
                        : "🟢 Resolved"}
                    </td>


                    <td>

                      {contact.user?.isBlocked ? (

                        <button
                          type="button"
                          onClick={() =>
                            handleBlockToggle(
                              contact.user._id,
                              true
                            )
                          }
                        >
                          Unblock User
                        </button>

                      ) : (

                        <span>
                          User Active
                        </span>

                      )}

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
};

export default AdminDashboard;