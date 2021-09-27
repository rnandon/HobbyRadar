import React, { useState, Fragment } from 'react';
import { useHistory } from 'react-router';
import useForm from '../../Hooks/useForm';
import useRegister from '../../Hooks/useRegister';


export default function Register(props) {
    const history = useHistory();
    const { register } = useRegister();
    const { formValues, handleChange, handleSubmit } = useForm(() => {});
    const [valid, setValid] = useState({ 
        firstName: true,
        lastName: true,
        username: true,
        password: true,
        passwordConfirmation: true,
        email: true,
        phone: true,
        userCity: true,
        userState: true,
        userZip: true,
    });

    const validateAndSubmit = (event) => {
        if (valid.firstName
            && valid.lastName
            && valid.username
            && valid.password
            && valid.passwordConfirmation
            && valid.email
            && valid.phone
            && valid.userCity
            && valid.userState
            && valid.userZip) 
        {
            const userDto = {
                firstName: formValues.firstName,
                lastName: formValues.lastName,
                username: formValues.username,
                password: formValues.password,
                email: formValues.email,
                phoneNumber: formValues.phoneNumber,
                userCity: formValues.userCity,
                userState: formValues.userState,
                userZip: formValues.userZip,
                contactPreference: formValues.contactPreference
            };
            console.log(userDto);
            register(userDto);
            history.push("/");
        }
    }

    const validateChange = (event) => {
        validate(event);
        handleChange(event);
    }

    const countDigits = (word) => {
        let count = 0;
        for (let i = 0; i < word.length; i++) { if ('0123456789'.includes(word[i])) { count++ } }
        return count;
    }

    const validEmail = (email) => {
        try {
            const hasAtAndPeriod = email.includes("@") && email.includes(".");
            const correctOrdering = email.indexOf("@") < email.indexOf(".");
            const atNotFirst = email.indexOf("@") !== 0;
            const periodNotLast = email.indexOf(".") !== (email.length - 1);
            return (hasAtAndPeriod && correctOrdering && atNotFirst && periodNotLast)
        } catch {
            return false;
        }
    }

    const countInvalidPhoneChars = (phone) => {
        let count = 0;
        for (let i = 0; i < phone.length; i++) { if (!'0123456789-()'.includes(phone[i])) { count++; } }
        return count;
    }

    const validate = (event) => {
        switch (event.target.name) {
            case 'firstName':
                setValid({...valid, firstName: (event.target.value.length >= 1)});
                break;
            case 'lastName':
                setValid({...valid, lastName: (event.target.value.length >= 1)});
                break;
            case 'username':
                setValid({...valid, username: (event.target.value.length >= 8)});
                break;
            case 'password':
                setValid({...valid, password: (
                    event.target.value.length >= 8
                    && countDigits(event.target.value) >= 2
                )});
                break;
            case 'passwordConfirmation':
                setValid({...valid, passwordConfirmation: (
                    event.target.value === formValues.password
                )});
                break;
            case 'email':
                setValid({...valid, email: validEmail(event.target.value)});
                break;
            case 'phoneNumber':
                setValid({...valid, phone: (
                    countDigits(event.target.value) === 10
                    && countInvalidPhoneChars(event.target.value) === 0
                )});
                break;
            case 'userCity':
                setValid({...valid, userCity: (event.target.value.length > 0)});
                break;
            case 'userState':
                setValid({...valid, userState: (event.target.value.length > 0)});
                break;
            case 'userZip':
                setValid({...valid, userZip: (
                    countDigits(event.target.value) === 5
                    && event.target.value.length === 5 
                )});
                break;
            default:
                console.log("default case");
                break;
        }
    }

    return (
        <form className="row g-3 needs-validation" onSubmit={validateAndSubmit}>
            <div className="col-md-4">
                <label htmlFor="firstName" className="form-label">First name</label>
                <input type="text" className="form-control" name="firstName" id="firstName" value={formValues.firstName} onChange={validateChange} required />
                {!valid.firstName && 
                    <Fragment>
                        <div>
                            Please provide your first name.
                        </div>
                    </Fragment>
                }
            </div>
            <div className="col-md-4">
                <label htmlFor="lastName" className="form-label">Last name</label>
                <input type="text" className="form-control" name="lastName" id="lastName" value={formValues.lastName} onChange={validateChange} required />
                {!valid.lastName && 
                    <Fragment>
                        <div>
                            Please provide your last name.
                        </div>
                    </Fragment>
                }
            </div>
            <div className="col-md-4">
                <label htmlFor="username" className="form-label">Username</label>
                <div className="input-group has-validation">
                    <span className="input-group-text" id="inputGroupPrepend">@</span>
                    <input type="text" className="form-control" name="username" id="username" aria-describedby="inputGroupPrepend" onChange={validateChange} required />
                {!valid.username && 
                    <Fragment>
                        <div>
                            Please choose a username.
                        </div>
                    </Fragment>
                }
                </div>
            </div>
            <div className="col-md-4">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="input-group has-validation">
                    <input type="password" className="form-control" name="password" id="password" onChange={validateChange} required />
                {!valid.password && 
                    <Fragment>
                        <div>
                            Password requirements: Minimum 8 characters, requires at least one number.
                        </div>
                    </Fragment>
                }
                </div>
            </div>
            <div className="col-md-4">
                <label htmlFor="passwordConfirmation" className="form-label">Confirm password</label>
                <div className="input-group has-validation">
                    <input type="password" className="form-control" name="passwordConfirmation" id="passwordConfirmation" onChange={validateChange} required />
                {!valid.passwordConfirmation && 
                    <Fragment>
                        <div>
                            Password confirmation needs to match password.
                        </div>
                    </Fragment>
                }
                </div>
            </div>
            
            <div className="col-md-4">
                <label htmlFor="email" className="form-label">Email</label>
                <div className="input-group has-validation">
                    <input type="email" className="form-control" name="email" id="email" onChange={validateChange} required />
                {!valid.email && 
                    <Fragment>
                        <div>
                            Please provide a valid email address.
                        </div>
                    </Fragment>
                }
                </div>
            </div>
            <div className="col-md-4">
                <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                <div className="input-group has-validation">
                    <input type="text" className="form-control" name="phoneNumber" id="phoneNumber" onChange={validateChange} required />
                {!valid.phone && 
                    <Fragment>
                        <div>
                            Please provide a valid phone number.
                        </div>
                    </Fragment>
                }
                </div>
            </div>
            <div className="col-md-3">
                <label htmlFor="contactPreference" className="form-label">Contact Preference</label>
                <select className="form-select" name="contactPreference" id="contactPreference" onChange={handleChange} required>
                    <option value="none" defaultValue >None</option>
                    <option value="text" >Text Messages</option>
                    <option value="email" >Email</option>
                </select>
            </div>
            <div className="col-md-6">
                <label htmlFor="userCity" className="form-label">City</label>
                <input type="text" className="form-control" name="userCity" id="userCity" onChange={validateChange} required />
                {!valid.userCity && 
                    <div>
                        Please provide a city.
                    </div>
                }
            </div>
            <div className="col-md-3">
                <label htmlFor="userState" className="form-label">State</label>
                <select className="form-select" name="userState" id="userState" onChange={validateChange} required>
                    <option defaultValue value="">Choose...</option>
                    <option value="AK" >AK</option>
                    <option value="AL" >AL</option>
                    <option value="AZ" >AZ</option>
                    <option value="AR" >AR</option>
                    <option value="CA" >CA</option>
                    <option value="CO" >CO</option>
                    <option value="CT" >CT</option>
                    <option value="DE" >DE</option>
                    <option value="FL" >FL</option>
                    <option value="GA" >GA</option>
                    <option value="HI" >HI</option>
                    <option value="ID" >ID</option>
                    <option value="IL" >IL</option>
                    <option value="IN" >IN</option>
                    <option value="IA" >IA</option>
                    <option value="KS" >KS</option>
                    <option value="KY" >KY</option>
                    <option value="LA" >LA</option>
                    <option value="ME" >ME</option>
                    <option value="MD" >MD</option>
                    <option value="MA" >MA</option>
                    <option value="MI" >MI</option>
                    <option value="MN" >MN</option>
                    <option value="MS" >MS</option>
                    <option value="MO" >MO</option>
                    <option value="MT" >MT</option>
                    <option value="NE" >NE</option>
                    <option value="NV" >NV</option>
                    <option value="NH" >NH</option>
                    <option value="NJ" >NJ</option>
                    <option value="NM" >NM</option>
                    <option value="NY" >NY</option>
                    <option value="NC" >NC</option>
                    <option value="ND" >ND</option>
                    <option value="OH" >OH</option>
                    <option value="OK" >OK</option>
                    <option value="OR" >OR</option>
                    <option value="PA" >PA</option>
                    <option value="RI" >RI</option>
                    <option value="SC" >SC</option>
                    <option value="SD" >SD</option>
                    <option value="TN" >TN</option>
                    <option value="TX" >TX</option>
                    <option value="UT" >UT</option>
                    <option value="VT" >VT</option>
                    <option value="VA" >VA</option>
                    <option value="WA" >WA</option>
                    <option value="WV" >WV</option>
                    <option value="WI" >WI</option>
                    <option value="WY" >WY</option>
                </select>
                {!valid.userState && 
                    <div>
                        Please select a state.
                    </div>
                }
            </div>
            <div className="col-md-3">
                <label htmlFor="userZip" className="form-label">Zip</label>
                <input type="text" className="form-control" name="userZip" id="userZip" onChange={validateChange} required />
                {!valid.userZip && 
                    <div>
                        Please provide a valid zip code.
                    </div>
                }
            </div>
            <div className="col-12">
                <button className="btn bg-blue" type="submit">Submit form</button>
            </div>
        </form>
    )
}