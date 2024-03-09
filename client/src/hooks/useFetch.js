import { useEffect , useState ,useCallback } from 'react';
import axios from 'axios'

function useFetch(url) {

    const [data , setData] = useState([]);
    const [isLoading , setIsLoading] = useState(true);
    const [error , setError] = useState();

    const fetchData = useCallback(async function fetchData(url){

        try {
            setIsLoading(true);
            const response = await axios.get(url);
            
            console.log(response.data);
            setData(response.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setError(error)
        }
        setIsLoading(false);
    } , [])

    

    useEffect(() => {
        fetchData(url);
    } , [url ,fetchData]);


    return {
        data,
        isLoading,
        error,
        fetchData
    };
    
}

export default useFetch;