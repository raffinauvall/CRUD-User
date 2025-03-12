import { useEffect, useState } from "react";
import userApi from "../api/userApi";

export const useUserHandlers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userApi.getAll();
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to load data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setIsModalDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    try {
      await userApi.delete(selectedUser.id);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== selectedUser.id)
      );
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setIsModalDeleteOpen(false);
      setSelectedUser(null);
    }
  };

  return {
    users,
    loading,
    isModalDeleteOpen,
    selectedUser,
    openDeleteModal,
    handleDelete,
    setIsModalDeleteOpen,
  };
};
