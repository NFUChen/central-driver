import axios from "axios";
import { useEffect, useState } from "react";

interface Response<T> {
    response: T,
    errorMessage: string
    isLoading: boolean,
    isError: boolean
}

export const useFetch = <T,>(apiUrl: string, intervalTimeSeconds: number): Response<T> => {
    const [response, setResponse] = useState<any>({});
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false)

    const fetchFunc = () => {
        axios.get(apiUrl)
            .then(
                (response) => {
                    setResponse(response.data)
                }
            ).catch(
                (error) => {
                    setErrorMessage(error.message)
                    setIsError(true)
                }
            ).finally(
                () => {
                    setIsLoading(false)
                }
            )
    }
    useEffect(

        () => {
            fetchFunc()
            const interval = setInterval(
                () => {
                    fetchFunc()
                }
                , intervalTimeSeconds * 1000)
            return () => clearInterval(interval);
        }
        , [])




    return {
        response: response,
        errorMessage: errorMessage,
        isError: isError,
        isLoading: isLoading,
    }
}