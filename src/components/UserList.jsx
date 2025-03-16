import React, { useState } from "react";
import { useUserHandlers } from "../handler/userHandler";
import DeleteUserModal from "./DeleteUserModal";
import CreateUserModal from "./CreateUserModal";
import UpdateUserModal from "./UpdateUserModal";

const UserList = () => {
  const {
    users,
    loading,
    isModalDeleteOpen,
    openDeleteModal,
    handleDelete,
    setIsModalDeleteOpen,
    isModalCreateOpen,
    openCreateModal,
    handleCreate,
    setIsModalCreateOpen,
    handleUpdate,
    isModalUpdateOpen,
    setIsModalUpdateOpen,
  } = useUserHandlers();

  // State buat user yang dipilih pas update
  const [selectedUser, setSelectedUser] = useState(null);

  // Debug: cek data users yang diterima
  console.log("Users list:", users);

  const openUpdateModal = (user) => {
    console.log("Opening update modal for user:", user);
    setSelectedUser(user); // Simpan user yang mau diupdate
    setIsModalUpdateOpen(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-9">
      <div className="flex justify-between mb-2">
        <h2 className="font-bold text-2xl">Selamat Datang, Raffi Nauval</h2>
        <button
          className="bg-blue-500 p-2 text-white rounded"
          onClick={openCreateModal}
        >
          Tambah data
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : users.length === 0 ? (
        <p className="text-gray-500 text-center">There are no users yet.</p>
      ) : (
        <table className="border-1" cellPadding="10">
          <thead className="border-1">
            <tr className="text-left">
              <th className="p-2">ID</th>
              <th className="p-2">Username</th>
              <th className="p-2">Nomor Telepon</th>
              <th className="p-2">Alamat</th>
              <th className="p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) => (
              <tr key={item.id}>
                <td className="p-2">{item.id}</td>
                <td className="p-2">{item.username}</td>
                <td className="p-2">{item.phone_number}</td>
                <td className="p-2">{item.address}</td>
                <td className="p-2">
                  <button
                    className="mr-2 bg-red-500 p-2 rounded text-white"
                    onClick={() => openDeleteModal(item)}
                  >
                    Hapus
                  </button>
                  <button
                    className="bg-yellow-500 text-white p-2 rounded"
                    onClick={() => openUpdateModal(item)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Debug modal state */}
      {console.log("Update Modal Open?", isModalUpdateOpen)}
      {console.log("Selected User for Update:", selectedUser)}

      <DeleteUserModal
        isOpen={isModalDeleteOpen}
        onClose={() => setIsModalDeleteOpen(false)}
        onConfirm={handleDelete}
      />
      <CreateUserModal
        isOpen={isModalCreateOpen}
        onClose={() => setIsModalCreateOpen(false)}
        onConfirm={handleCreate}
      />
      <UpdateUserModal
        isOpen={isModalUpdateOpen}
        onClose={() => setIsModalUpdateOpen(false)}
        onConfirm={handleUpdate}
        user={selectedUser} // Kirim user yang mau diupdate
      />
    </div>
  );
};

export default UserList;
