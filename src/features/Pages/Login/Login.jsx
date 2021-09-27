import React, { useState, Fragment } from 'react';
import useForm from '../../Hooks/useForm';
import useLogin from '../../Hooks/useLogin';


export default function Login(props) {
    const [error, setError] = useState(false);
    const send = useLogin(setError);
    const { formValues, handleChange, handleSubmit } = useForm(() => send(formValues));

    return (
        <form className="row g-3 needs-validation" onSubmit={handleSubmit}>
            {error && 
                <Fragment>
                    <p>Invalid username or password.</p>    
                </Fragment>}
            <div className="col-md-4">
                <label htmlFor="username" className="form-label">Username</label>
                <div className="input-group has-validation">
                    <span className="input-group-text" id="inputGroupPrepend">@</span>
                    <input type="text" className="form-control" name="username" id="username" aria-describedby="inputGroupPrepend" onChange={handleChange} required />
                </div>
            </div>
            <div className="col-md-4">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="input-group has-validation">
                    <input type="password" className="form-control" name="password" id="password" onChange={handleChange} required />
                </div>
            </div>
            <div className="col-12">
                <button className="btn bg-blue" type="submit">Login</button>
            </div>
        </form>
    )
}