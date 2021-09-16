import React, {useState, useEffect } from 'react';
import { useHistory } from 'react-router';

import axios from 'axios';
import { setToken } from '../User/TokenSlice';
import { useDispatch } from 'react-redux';

const useLogin = (setError) => {
    const history = useHistory();
    const dispatch = useDispatch();

    async function send(values) {
        try {
            const response = await axios.post("https://localhost:44394/api/authentication/login", values);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                dispatch(setToken(response.data.token));
                history.push("/");
            }
        } catch {
            setError(true);
        }
    }

    return send;
}

export default useLogin;