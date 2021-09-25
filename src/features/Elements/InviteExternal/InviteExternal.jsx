import axios from 'axios';
import useForm from '../../Hooks/useForm';
import { useSelector } from 'react-redux';
import { useState } from 'react';


export default function InviteExternal(props) {
    const { formValues, handleChange, handleSubmit } = useForm(() => sendInvite(formValues));
    const user = useSelector((state) => state.user.value.payload);
    const [status, setStatus] = useState("");

    async function sendInvite(values) {
        let newInvite = {
            name: values.name,
            contactInfo: values.contactInfo,
            contactMethod: values.contactMethod,
            fromUserId: user.id
        }
        let response = await axios.post("https://localhost:44394/api/ExternalInvitations", newInvite);
        if (response.data) {
            setStatus(`Successfully invited ${values.name}!`);
        }
    }


    return (
        <div className="container-fluid">
            <p> Want to share your hobbies with a friend?
                <button className="btn btn-primary mx-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                    <span>Invite a Friend!</span>
                </button>
            </p>
            <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Invite a Friend!</h5>
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <form className="mb-3" onSubmit={handleSubmit} >
                        <input className="form-control form-control-lg" type="text" required="true" placeholder="Name" name="name" onChange={handleChange} />
                        <select className="form-select" name="contactMethod" required="true" aria-label="Contact method selector" onChange={handleChange} >
                            <option value="phone" selected>Phone</option>
                            <option value="email">Email</option>
                        </select>
                        {formValues.contactMethod === "phone" &&
                            <input className="form-control" name="contactInfo" type="phone" placeholder="Phone number" value={formValues.contactInfo} aria-label="Phone input" onChange={handleChange} />
                        }
                        {formValues.contactMethod === "email" &&
                            <input className="form-control" name="contactInfo" type="email" placeholder="Email Address" value={formValues.contactInfo} aria-label="Email input" onChange={handleChange} />
                        }

                        <div className="col-12">
                            <button className="btn btn-primary" type="submit">Send Invitation</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}