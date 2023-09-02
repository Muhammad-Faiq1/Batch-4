import { createContext, useEffect, useState } from "react";
import React from "react";
import { locationRequest } from "./location.service";

export const locationContext = createContext();

const LocationContextProvider = (props) => {
    const { children } = props;
    const [location, setLocation] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [keyword, setKeyword] = useState("san francisco");

    const onSearchHandler = (searchKeyword) => {
        if (searchKeyword) {
            setIsLoading(true)

            setTimeout(() => {
                setKeyword(searchKeyword)
            }, 1000)
        }
    }

    useEffect(() => {
        if (!keyword.length) {
            return
        }

        locationRequest(keyword)
            .then((result) => {
                setLocation(result);
                setIsLoading(false)
                error(null)
            })
            .catch((error) => {
                setIsLoading(false)
                setError(error)
            })
    }, [keyword])


    return (
        <locationContext.Provider value={{
            isLoading,
            location,
            error,
            keyword,
            search: onSearchHandler
        }}>
            {children}
        </locationContext.Provider>
    )
}

export default LocationContextProvider;