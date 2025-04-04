import React from "react";

const DeleteUserModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-30 backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 border border-gray-300">
        <h2 className="text-lg font-semibold">Konfirmasi Hapus</h2>
        <p className="mt-2">Apakah Anda yakin ingin menghapus data ini?</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Batal
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={onConfirm}
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
