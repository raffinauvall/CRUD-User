import axios from "axios";
import {useState, useEffect} from "react";


const UserList = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/users")
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data.", error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2 className="mb-2 font-bold">Selamat Datang, Raffi Nauval</h2>
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
            {user.map((item) => {
              return (
                <tr key={item.id}>
                  <td className="p-2">{item.id}</td>
                  <td className="p-2">{item.username}</td>
                  <td className="p-2">{item.phone_number}</td>
                  <td className="p-2">{item.address}</td>
                  <td className="p-2">
                    <button
                      className="mr-2 bg-red-500 p-2 rounded text-white"
                      onClick={() => alert(`Lihat detail ${item.id}`)}
                    >
                      Hapus
                    </button>
                    <button className="btn btn-primary" onClick={() => alert(`Lihat detail ${item.id}`)}>
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;