import React, { useState } from 'react';
import { useHistory } from 'react-router';
import useForm from '../../Hooks/useForm';
import useRegister from '../../Hooks/useRegister';


export default function Register(props) {
    const history = useHistory();
    const { register, userInfo } = useRegister();
    const { formValues, handleChange, handleSubmit } = useForm(() => register(formValues));
    const { valid, setValid } = useState({
        firstName: false,
        lastName: false,
        username: false,
        password: false,
        passwordConfirmation: false,
        email: false,
        phone: false
    });

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
            const atNotFirst = email.indexOf("@") != 0;
            const periodNotLast = email.indexOf(".") != (email.length - 1);
            return (hasAtAndPeriod && correctOrdering && atNotFirst && periodNotLast)
        } catch {
            return false;
        }
    }

    const countInvalidPhoneChars = (phone) => {
        let count = 0;
        for (let i = 0; i < phone.length; i++) { if (!'0123456789-()'.includes(num)) { count++; } }
        return count;
    }

    const validate = (event) => {
        switch (event.target.name) {
            case 'firstName':
                setValid(...valid, {firstName: (event.target.value.length >= 1)});
                break;
            case 'lastName':
                setValid(...valid, {lastName: (event.target.value.length >= 1)});
                break;
            case 'username':
                setValid(...valid, {username: (event.target.value.length >= 8)});
                break;
            case 'password':
                setValid(...valid, {password: (
                    event.target.value.length >= 8
                    && countDigits(event.target.value) >= 2
                )});
                break;
            case 'passwordConfirmation':
                setValid(...valid, {passwordConfirmation: (
                    event.target.value === formValues.password
                )});
                break;
            case 'email':
                setValid(...valid, {email: validEmail(event.target.value)});
                break;
            case 'phone':
                setValid(...valid, {phone: (
                    countDigits(event.target.value) === 10
                    && countInvalidPhoneChars(event.target.value) === 0
                )});
                break;

            default:
                console.log("default case");
                break;
        }
    }

    return (
        <form >

        </form>
    )
}

// {
//     "firstname": "Ryan",
//     "lastname": "D",
//     "username": "admin",
//     "password": "somePass12",
//     "email": "ryan@devcodecamp.com",
//     "phonenumber": "555-555-5555"
// }


// o.Password.RequireDigit = true;
// o.Password.RequireLowercase = false;
// o.Password.RequireUppercase = false;
// o.Password.RequireNonAlphanumeric = false;
// o.Password.RequiredLength = 8;
// o.User.RequireUniqueEmail = true;