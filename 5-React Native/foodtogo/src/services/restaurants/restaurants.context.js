import { createContext, useContext, useEffect, useState } from "react"
import { RestaurantRequest } from "./restaurants.services";
import { locationContext } from "../location/location.context";

export const RestaurantContext = createContext()

export const RestaurantProvider = (props) => {
    const { children } = props;
    const [restaurant, setRestaurant] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { location } = useContext(locationContext);


    useEffect(() => {
        getRestaurant()
    }, []);

    useEffect(() => {


        if (location) {
            const locationString = `${location?.lat},${location?.lng}`;
            getRestaurant(locationString);
        }

    }, [location])

    const getRestaurant = (locationParameter) => {
        setIsLoading(true)
        setTimeout(() => {
            RestaurantRequest(locationParameter)
                .then(result => {
                    setRestaurant(result)
                })
                .catch((error) => {
                    setError(error)
                })
            setIsLoading(false)
        }, 2000);


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