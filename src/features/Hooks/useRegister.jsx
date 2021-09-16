import React, {useState, useEffect } from 'react';
import axios from 'axios';

export default function useRegister () {
    const [data, setData] = useState({});
    const [userInfo, setUserInfo] = useState({});
    useEffect(() => {
        if (data.data) {
            setUserInfo(data.data);
        }
    }, [data])

    async function register(values) {
        console.log(values);
        const response = await axios.post("https://localhost:44394/api/authentication", values);
        if (response.data) {
            setData(response);
        }
    }

    return { register, userInfo };
}