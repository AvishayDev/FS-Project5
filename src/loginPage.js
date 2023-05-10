import { useFetch, useForm} from "./Hooks";


export default function Login(){
    const [inputs,handleChange] = useForm();
    const [data, setUrl] = useFetch();

    return (
    <div>
        <form>
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
            <input 
                name="submit"
                type="submit"
                value='Login'
            />
        </form>
    </div>
    )
}