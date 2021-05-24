import { useState } from "react";
import UserContext from "./index";
import apiCall from "../../api/apiCall"

export default function UserProvider({ children }) {
    const [userActive, setUserActive] = useState({
        "id": 1,
        "name": {
            "firstName": "Hans",
            "lastName": "Correa",
            "alternativeName": "Hasinto"
        },
        "email": "hanscorca@unisabana.edu.co",
        "lastAcces": "20-05-2021",
        "password": "ramito2",
        "role": "PAT",
        "area": "Produccion"
    });
    const [projectDetail, setProjectDetail] = useState({});
    const [projectUsers, setProjectUsers] = useState({});
    const [users, setUsers] = useState({});
    const login = async (value) => {
        setUserActive(value);
        console.log(value);
    }
    const logout = () => {
        setUserActive(null);
    }
    const getProjectDetail = async (id) => {
        if (!id) Promise.reject("id es requerido");
        try {
            const projectDetail = await apiCall({ url: `http://localhost:3000/projects/${id}` });
            setProjectDetail(projectDetail);
        } catch (error) {
            setProjectDetail({});
        }
    }
    const getUsers = async () => {
        try {
            const users = await apiCall({ url: `http://localhost:3000/users` });
            setUsers(users);

        } catch (error) {
            setUsers([]);
        }
    }

    return (
        <UserContext.Provider value={{ login, logout, userActive, getProjectDetail, projectDetail, getUsers, users }}>
            {children}
        </UserContext.Provider>
    );
}