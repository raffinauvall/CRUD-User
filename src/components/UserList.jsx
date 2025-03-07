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
      <h2>List User</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Password</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {user.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.username}</td>
                    <td>{item.password}</td>
                    <td>
                      <button onClick={() => alert(`Lihat detail ${item.id}`)}>
                        Hapus
                      </button>
                    </td>
                    <td>
                      <button onClick={() => alert(`Lihat detail ${item.id}`)}>
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