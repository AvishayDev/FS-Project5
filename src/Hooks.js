import { useState,useEffect } from "react"


export function useForm(){
    const [inputs,setInputs] = useState({});
    
    const handleChange = (event) => {
        const {name, value, type, checked} = event.target;
        type === "checkbox" ? setInputs(values => ({...values, [name]: checked })) : setInputs(values => ({ ...values, [name]: value }));
    }

    return [inputs,handleChange]

}

export function useFetch (url){
    const [data, setData] = useState(null);
  
    useEffect(() => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => setData(data));
    }, [url]);
  
    return [data];
  };