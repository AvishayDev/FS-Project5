import { useState,useEffect } from "react"


// useForm Hook
export function useForm(){
    const [inputs,setInputs] = useState({});
    
    const handleChange = (event) => {
        const {name, value, type, checked} = event.target;
        type === "checkbox" ? setInputs(values => ({...values, [name]: checked })) : setInputs(values => ({ ...values, [name]: value }));
    }

    return [inputs,handleChange]

}

// useFetch Hook
const controller = new AbortController();

export function useFetch (urlApi){
    const [url, setUrl] = useState(urlApi)
    const [data, setData] = useState(null);
  
    useEffect(() => {
      //setTimeout(controller.abort,1000);      
      fetch(url,{ signal: controller.signal })
        .then((res) => res.json())
        .then((data) => setData(data));
    }, [url]);
  
    return [data, setUrl];
  };

  // useLocalStorage Hook
function getSavedItem(key,initialValue){
  const savedValue = JSON.parse(localStorage.getItem(key))
  if (savedValue) return savedValue

  if (initialValue instanceof Function) return initialValue()
  return initialValue
}

export function useLocalStorage(key, initialValue){
  const [value, setValue] = useState(() => {
    return getSavedItem(key, initialValue)
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  },[value])

  return [value, setValue]
}

