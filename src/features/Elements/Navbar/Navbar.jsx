import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setToken } from '../../User/TokenSlice';
import { setUser } from '../../User/UserSlice';
import './Navbar.css'
import '../../../index.css';

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
        <nav className="navbar navbar-expand-lg bg-green">
            <div className="container-fluid">
                <Link id="brand" to="/" >HobbyRadar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"> </span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    {user && 
                        <Fragment>
                            <div>
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
                            </div>
                            <div className="float-end">
                                <button className="float-end btn bg-blue" onClick={logout} >Log out</button>
                            </div>
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