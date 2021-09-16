import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";


import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./features/User/UserSlice";
import { setToken } from "./features/User/TokenSlice";
import { setHobbies } from "./features/Pages/Hobby/HobbySlice";

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
import Hobby from "./features/Pages/Hobby/Hobby";
import Event from "./features/Pages/Event/Event";
import OtherUser from "./features/Pages/OtherUser/OtherUser";


function App() {
    // Get local login info if it is present
    // Set user with Redux/rtk
    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();

    // Try to get a local token, then get the user info
    useEffect(() => {
        getUserInfo();
        getHobbies();
    }, [])
    
    
    async function getUserInfo() {
        const jwt = localStorage.getItem('token');
        if (jwt) {
            const localUser = jwtDecode(jwt);
            dispatch(setToken(localUser));
            let response = await axios.get(`https://localhost:44394/api/users/${localUser.id}`);
            if (response.data) {
                dispatch(setUser(response.data));
            }
        }
    }

    async function getHobbies() {
        let response = await axios.get("https://localhost:44394/api/Hobbies");
        if (response.data) {
            dispatch(setHobbies(response.data));
        }
    }

    return (
        <Router className="App">
            <Navbar />

            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/account" component={Account} />
                <Route path="/about" component={About} />
                
                <Route path="/hobbies" exact component={FindHobbies} />
                <Route path="/hobbies/:id" component={Hobby} />

                <Route path="/events" component={FindEvents} />
                <Route path="/events/:id" component={Event} />
                
                <Route path="/people" component={FindPeople} />
                <Route path="/people/:id" component={OtherUser} />


                <Route path="*" component={NotFound} />
                <Route path="notfound" component={NotFound} />
            </Switch>
        </Router>);
}

export default App;


