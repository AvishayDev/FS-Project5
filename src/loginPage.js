import { useNavigate } from "react-router-dom";
import { callFetch, useForm, useLocalStorage} from "./Hooks";
import {  useState } from "react";


export default function Login(){
    const [inputs,handleChange] = useForm();
    const [_, setUser] = useLocalStorage('loggedUser',null);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        const data = await callFetch('https://jsonplaceholder.typicode.com/users');

        let user = data.find((user) => user.username === username);
        if (user){
            setUser(user);
            navigate(`/users/${user.id}`);
        }
        else{
            setErrorMessage('User Not Found!')
            setTimeout(()=>setErrorMessage(''),2000)
        }
    }


    return (
    <div>
        <form onSubmit={handleSubmit}>
            <label for='username'>
                User Name:
            </label>
            <input 
                name='username' 
                type="text" 
                value={inputs.username || ""} 
                onChange={handleChange}
            />
            <br/>
            <label for='username'>
                Password:
            </label>
            <input 
                name='password' 
                type="password" 
                value={inputs.password || ""} 
                onChange={handleChange}
            />
            <h4>{errorMessage}</h4>
            <input 
                name="submit"
                type="submit"
                value='Login'
            />
        </form>
    </div>
    )
}