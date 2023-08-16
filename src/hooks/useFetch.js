import { useState, useEffect } from "react";

export const useFetch = (url) => {
    const [data, setData] = useState(null)

    const [config, setConfig] = useState(null)
    const [method, setMethod] = useState(null)
    const [callFetch, setCallFetch] = useState(false)

    const [loading, setLoadig] = useState(false)

    const [error, setError] = useState(null)
    
    const httpConfig = (data, method) => {
        if(method === "POST") {
            setConfig({
                method: method,
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            })
            setMethod("POST")
        } else if(method === "DELETE"){
            setMethod("DELETE")
            setConfig({
                method: method,
            })
        }
    }
  
    useEffect(() => {
        const fetchData =async () => {
            setLoadig(true)
            await fetch(url)
            .then( res => res.json())
            .then(data => setData(data))
            .catch(() => setError("Houve algum erro ao carregar os dados."))
            .finally(() => setLoadig(false))
        }

        fetchData()
    }, [url, callFetch])

    useEffect(() => {
        // eslint-disable-next-line no-empty
       const httpRequest = async () => {
        if(method === 'POST'){
            let fatchOptions = [url, config]

             await fetch(...fatchOptions)
             .then(res => res.json())
             .then(data => setCallFetch(data))
        } else if( method === "DELETE") {
            const deleteUrl = `${url}/${itemId}`;
            let fatchOptions = [deleteUrl, config]
            
            await fetch(...fatchOptions)
            .then(res => res.json())
            .then(data => setCallFetch(data))
        }
       }
       httpRequest()
    }, [config, method, url])

    return {data: data, httpConfig, loading, error}
}