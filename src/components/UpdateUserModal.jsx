import React, { useState, useEffect } from "react";

const UpdateUserModal = ({ isOpen, onClose, onConfirm, user }) => {
  const [updatedUser, setUpdatedUser] = useState({
    id: "",
    username: "",
    phone_number: "",
    address: "",
  });

  // Update state ketika modal dibuka dan ada user
  useEffect(() => {
    if (user && isOpen) {
      setUpdatedUser({ ...user });
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  const isFormValid = () => {
    return (
      updatedUser.username.trim() !== "" &&
      updatedUser.phone_number.trim() !== "" &&
      updatedUser.address.trim() !== ""
    );
  };

const handleSubmit = async () => {
  console.log("Tombol Simpan diklik!");
  try {
    await onConfirm(updatedUser); // Tunggu update selesai
    console.log("✅ Update berhasil, modal ditutup");
    onClose(); // Tutup modal setelah sukses
  } catch (error) {
    console.error("❌ Gagal mengupdate user:", error);
  }
};



  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
      <div className="bg-white p-5 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Update User</h2>
        <input
          type="text"
          name="username"
          value={updatedUser.username || ""}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          placeholder="Username"
        />
        <input
          type="text"
          name="phone_number"
          value={updatedUser.phone_number || ""}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          placeholder="Nomor Telepon"
        />
        <input
          type="text"
          name="address"
          value={updatedUser.address || ""}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          placeholder="Alamat"
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isFormValid()} // Disable kalau form kosong
            className={`px-4 py-2 rounded ${
              isFormValid()
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserModal;
