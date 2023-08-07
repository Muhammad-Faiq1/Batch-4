import { createContext, useEffect, useState } from "react"
import { RestaurantRequest } from "./restaurants.services";

export const RestaurantContext = createContext()

export const RestaurantProvider = (props) => {
    const { children } = props;
    const [restaurant, setRestaurant] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        getRestaurant()
    }, []);

    const getRestaurant = () => {
        setIsLoading(true)
        setTimeout(() => {
            RestaurantRequest()
                .then(result => {
                    setRestaurant(result)
                })
                .catch((error) => {
                    setError(error)
                })
                setIsLoading(false)
        }, 1000);


    }

    return (
        <RestaurantContext.Provider value={{
            restaurant,
            isLoading,
            error
        }}>
            {children}
        </RestaurantContext.Provider>
    )
}