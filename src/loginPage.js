import { useForm} from "./Hooks";


export default function Login(){
    const [inputs,handleChange] = useForm();

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
            {<input 
                name='password' 
                type="password" 
                value={inputs.password || ""} 
                onChange={handleChange}
            />}
        </form>
    </div>
    )
}