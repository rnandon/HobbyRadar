import React, {useState, useEffect } from 'react';
import { useHistory } from 'react-router';

import axios from 'axios';
import { setToken } from '../User/TokenSlice';

const useLogin = (setError) => {
    const history = useHistory();

    async function send(values) {
        try {
            const response = await axios.post("https://localhost:44394/api/authentication/login", values);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                setToken(response.data.token);
                setError(false);
                history.push("/");
            }
        } catch {
            setError(true);
        }
    }

    return send;
}

export default useLogin;