import camelize from "camelize"
import { mockImages, mocks } from "./mock/index"

export const RestaurantRequest = (location = "41.878113,-87.629799") => {
    return new Promise((resolve, reject) => {
        const mock = mocks[location]

        if (!mock) {
            reject("There is no Data")
        }
        const tempResponse = restaurantTransform(mock);
        resolve(tempResponse)
    })

}

export const restaurantTransform = (data) => {
    const results = camelize(data?.results)
    
    const mappedResult = results?.map((singleRestaurant) => {
        singleRestaurant.photos = singleRestaurant.photos.map((singlePhots) => {
            return mockImages[Math.ceil(Math.random() * (mockImages.length) - 1)]
        })
    
        return {
            ...singleRestaurant,
            address: singleRestaurant?.vicinity,
            isOpenNow: Boolean(singleRestaurant?.openingHours?.openNow),
            isClosedTemporarily: singleRestaurant.business_status === "CLOSED_TEMPORARILY",
        }
    })
    return mappedResult;
}