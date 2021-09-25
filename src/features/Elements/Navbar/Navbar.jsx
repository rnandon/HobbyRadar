import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setToken } from '../../User/TokenSlice';
import { setUser } from '../../User/UserSlice';
import './Navbar.css'

export default function Navbar(props) {
    const user = useSelector((state) => state.user.value)
    const dispatch = useDispatch();

    const logout = () => {
        localStorage.removeItem('token');
        dispatch(setToken(""));
        dispatch(setUser(""));
        window.location.reload();
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-color">
            <div className="container-fluid">
                <Link id="brand" to="/" >HobbyRadar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    {user && 
                        <Fragment>
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to="/hobbies" >Find Hobbies</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/events" >Find Events</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/account" >Account</Link>
                                </li>
                            </ul>
                            <button className="right btn btn-primary" onClick={logout} >Log out</button>
                        </Fragment>
                    }
                    {!user &&
                        <Fragment> 
                            <Link to="/login" >Log In</Link>
                            <Link to="/register" >Register</Link>
                        </Fragment>
                    }
                </div>
            </div>
        </nav>
    )
}