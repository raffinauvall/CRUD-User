import axios from "axios";
import {useState, useEffect} from "react";

const UserList = () => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/users")
        .then((response) => {
            setUser(response.data);
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching data.", error);
            setLoading(false);
        });
    }, []);

    return(
        <div>
        <h2>List User</h2>
        </div>
    )
}

export default UserList;