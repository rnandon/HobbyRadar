import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import useForm from "../../Hooks/useForm";
import { setHobbies } from "../Hobby/HobbySlice";

export default function NewHobby() {
    const { formValues, handleChange, handleSubmit } = useForm(() => postHobby(formValues));
    let tags = useSelector((state) => state.tags.value.payload);
    const hobbies = useSelector((state) => state.hobbies.value.payload);
    const dispatch = useDispatch();

    async function postHobby(values) {
        let response = await axios.post("https://localhost:44394/api/Hobbies", values);
        if (response.data) {
            const newHobby = {
                name: response.data.name,
                hobbyId: response.data.hobbyId,
                tags: formValues.tags,
            }
            const allHobbies = [...hobbies, newHobby];
            dispatch(setHobbies(allHobbies));
        }
    }

    const modifyTags = (event) => {
        let currentValue = []
        if (formValues.tags) {
            currentValue = formValues.tags;
        }

        // If the value is in the list, we need to remove it. Otherwise, add it.
        if (currentValue.includes(event.target.name)) {
            currentValue = currentValue.filter((tag) => tag != event.target.name);
        } else {
            currentValue.push(event.target.name);
        }
        const formPass = {
            target: {
                name: "tags",
                value: currentValue
            },
            persist: () => {}
        }
        handleChange(formPass);
    }

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                    <span>New Hobby</span>
                </button>
                <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Make a New Hobby</h5>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <form className="mb-3" onSubmit={handleSubmit} >
                            <input className="form-control form-control-lg" type="text" placeholder="Hobby Name" name="name" onChange={handleChange} />
                            {tags.length === 0 &&
                                <h2>Loading...</h2>
                            }
                            {tags.length > 0 &&
                                <div className="row">
                                    {tags.map((tag) => {
                                        return (
                                            <div className="col m-0 p-1">
                                                <input className="btn-check" type="checkbox" id={tag} name={tag} autoComplete="off" onClick={modifyTags}/>
                                                <label className="btn btn-outline-primary" htmlFor={tag}>{tag}</label>
                                            </div>
                                        )
                                    })}
                                </div>
                            }
                            <div className="col-12">
                                <button className="btn btn-primary" type="submit">Save Hobby</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </nav>


        
    )
}