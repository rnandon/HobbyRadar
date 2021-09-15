import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";


import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./features/User/UserSlice";

import "./App.css";
import Home from "./features/Pages/Home/Home";
import Navbar from "./features/Elements/Navbar/Navbar";
import Account from './features/Pages/Account/Account';
import About from "./features/Pages/About/About";
import NotFound from './features/Pages/NotFound/NotFound';
import Login from "./features/Pages/Login/Login";
import Register from "./features/Pages/Register/Register";
import FindHobbies from "./features/Pages/FindHobbies/FindHobbies";
import FindEvents from "./features/Pages/FindEvents/FindEvents";
import FindPeople from "./features/Pages/FindPeople/FindPeople";


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
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/account" component={Account} />
                <Route path="/about" component={About} />
                
                <Route path="/hobbies" component={FindHobbies} />
                <Route path="/events" component={FindEvents} />
                <Route path="/people" component={FindPeople} />

                <Route path="*" component={NotFound} />
            </Switch>
        </Router>);
}

export default App;
