
import React from "react";
import { useUserHandlers } from "../handler/userHandler";
import DeleteUserModal from "./DeleteUserModal";



const UserList = () => {
  const {
    users,
    loading,
    isModalDeleteOpen,
    openDeleteModal,
    handleDelete,
    setIsModalDeleteOpen,
  } = useUserHandlers();

  return (
    <div className="bg-white rounded-xl shadow-md p-9">
      <div className="flex justify-between mb-2">
        <h2 className=" font-bold text-2xl">
          Selamat Datang, Raffi Nauval
        </h2>
        <button className="bg-blue-500 p-2 text-white rounded">Tambah data</button>
      </div>
      {loading ? (
        <p>Loading...</p>
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
            {users.map((item) => {
              return (
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
                      className="bg-yellow-500 text-white p-2 rounded "
                      onClick={() => alert(`Lihat detail ${item.id}`)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
       <DeleteUserModal
      isOpen = {isModalDeleteOpen}
    onClose={() => setIsModalDeleteOpen(false)}
    onConfirm={handleDelete}
    />
    </div>
   
  );
};

export default UserList;