import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";


import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./features/User/UserSlice";

import "./App.css";
import Home from "./features/Pages/Home/Home";
import Navbar from "./features/Pages/Navbar/Navbar";


function App() {
    // Get local login info if it is present
    // Set user with Redux/rtk
    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();

    // Try to get a local token, then get the user info
    useEffect(() => {
        try{
            const jwt = localStorage.getItem('token');
            const localUser = jwtDecode(jwt);
            if (localUser){
                let response = axios.get(`https://localhost:44394/api/users/${localUser.id}`).then(dispatch(setUser(response.data)));
            }
        } catch {}
    }, [])

    return (
        <Router className="App">
            <Navbar />

            <Switch>
                <Route path="/" exact component={Home} />
            </Switch>
        </Router>);
}

export default App;
