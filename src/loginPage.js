import { useNavigate } from "react-router-dom";
import { callFetch, useErrorMessage, useForm, useLocalStorage} from "./Hooks";
import './loginpage.css'


export default function Login(){
    const [inputs,handleChange] = useForm();
    const [_, setUser] = useLocalStorage('loggedUser',null);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useErrorMessage();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        let data;
        try{
            data = await callFetch('https://jsonplaceholder.typicode.com/users');
        }catch{
            setErrorMessage("Oops..! You're Not conected!")
            return
        }

        let user = data.find((user) => user.username === username);
        if (!user){
            setErrorMessage('Are You Sure About The Username..?')
            return
        }
        if (user.address.geo.lat.slice(-4) !== password){
            setErrorMessage('Just The Password..!')
            return
        }

        setUser(user);
        navigate(`/users/${user.id}`);
    }


    return (
    <>
        <div className="hv-wrapper">
            <div id="login-form">
                <form onSubmit={handleSubmit}>
                    <label>
                        Username:
                    </label>
                    <input 
                        name='username' 
                        type="text" 
                        value={inputs.username || ""} 
                        onChange={handleChange}
                    />
                    <br/>
                    <label>
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
        </div>
    </>
        
    )
}