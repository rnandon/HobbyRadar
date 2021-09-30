import { useState } from 'react';

const useUserUpdate = (callback, initialState) => {
    const [formValues, setFormValues] = useState(initialState);

    const handleChange = (event) => {
        event.persist();

        setFormValues({ ...formValues, [event.target.name]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        callback();
    }

    return { formValues, handleChange, handleSubmit };
}

export default useUserUpdate;