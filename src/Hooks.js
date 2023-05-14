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

export function useFetch (urlApi){
    const [url, setUrl] = useState(urlApi)
    const [data, setData] = useState(null);
  
    useEffect(() => {
      fetch(url)
      .then((res) => {
        res.json()
      }).then((resData)=> setData(resData))
      .catch((err) => {
        setData('Something Goes Wrong..\nPlease Try Again')
      });

      return ()=>controller.abort();
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

export function clearKey(key){
  localStorage.removeItem(key);
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
export function useErrorMessage(errMessage){
  const [errorMessage, setErrorMessage] = useState(errMessage);

  useEffect(()=>{
    return ()=>setTimeout(()=>setErrorMessage(''),2000);
  },[errorMessage]);

  return [errorMessage, setErrorMessage]
}