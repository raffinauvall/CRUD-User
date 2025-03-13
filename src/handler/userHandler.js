import { useEffect, useState } from "react";
import userApi from "../api/userApi";

export const useUserHandlers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

useEffect(() => {
  const fetchUsers = async () => {
    try {
      const response = await userApi.getAll();
      console.log("API Response:", response.data);

      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        console.error("Data dari API bukan array:", response.data);
        setUsers([]); // Antisipasi biar `map()` gak error
      }
    } catch (error) {
      console.error("Failed to load data:", error);
      setUsers([]); // Antisipasi error API
    } finally {
      setLoading(false);
    }
  };
  fetchUsers();
}, []);


    const openCreateModal = () => {
        setIsModalCreateOpen(true)
    }

   const handleCreate = async (newUser) => {
     try {
       const response = await userApi.create(newUser);
       setUsers((prevUsers) => [...prevUsers, response.data]);

       // Ambil ulang data dari API untuk memastikan update
       const updatedUsers = await userApi.getAll();
       setUsers(updatedUsers.data);
     } catch (error) {
       console.error("Error creating user: ", error);
     } finally {
       setIsModalCreateOpen(false);
     }
   };


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
        isModalCreateOpen,
        setIsModalDeleteOpen,
        openCreateModal,
        handleCreate,
        setIsModalCreateOpen
    };
    };
