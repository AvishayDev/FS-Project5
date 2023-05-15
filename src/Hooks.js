import { useState,useEffect } from "react"


// useForm Hook
export function useForm(){
    const [inputs, setInputs] = useState({});
    
    const handleChange = (event) => {
        const {name, value, type, checked} = event.target;
        type === "checkbox" ? setInputs(values => ({...values, [name]: checked })) : setInputs(values => ({ ...values, [name]: value }));
    }

    return [inputs,handleChange]

}

// useFetch Hook
const controller = new AbortController();

export async function callFetch(url){
  //setTimeout(controller.abort,1000);      
  const res = await fetch(url,{ signal: controller.signal })
  const data = await res.json()
  return data
}

export function useFetch (urlApi, initialValue){
    const [url, setUrl] = useState(urlApi)
    const [data, setData] = useState(initialValue);
    const [error,setError] = useErrorMessage();
    const [isLoading,setIsLoading] = useState(false)
  
    useEffect(() => {
      setIsLoading(true)
      fetch(url)
      .then((res) => res.json())
      .then((resData) => {
        setData(resData)
        setIsLoading(false)
      })
      .catch((err) => {
        setError(err)
        setIsLoading(false)
      });
      
      return () => controller.abort();
    }, [url]);
  
    return [data, setUrl, error, isLoading];
  };

  // useLocalStorage Hook
export function clearKeyLS(key){
  localStorage.removeItem(key);
}

export function getItemLS(key){
  return JSON.parse(localStorage.getItem(key))
}

function getSavedItem(key, initialValue){
  const savedValue = getItemLS(key)
  if (savedValue) return savedValue

  if (initialValue instanceof Function) return initialValue()
  return initialValue
}

export function useLocalStorage(key, initialValue){
  const [value, setValue] = useState(() => {
    return getSavedItem(key, initialValue)
  })

  const saveInLS = (val) => {
    setValue(val)
    localStorage.setItem(key, JSON.stringify(val))
  }

  return [value, saveInLS]
}

//   useErrorMessage Hook
export function useErrorMessage(){
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(()=>{
    return ()=>setTimeout(()=>setErrorMessage(''),2000);
  },[errorMessage]);

  return [errorMessage, setErrorMessage]
}