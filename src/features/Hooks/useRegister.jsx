import React, {useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';

export default function useRegister () {
    const history = useHistory();

    async function register(values) {
        console.log(values);
        const response = await axios.post("https://localhost:44394/api/authentication", values);
        if (response.data) {
            history.push("/login");
        }
    }

    return { register };
}