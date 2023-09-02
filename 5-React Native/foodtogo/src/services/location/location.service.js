import { locations } from "./location.mock"
import camelize from "camelize"

export const locationRequest = (searchTerm = "san francisco") => {
    return new Promise((resolve, reject) => {

        const locationDummyData = locations[searchTerm];

        if (!locationDummyData) {
            reject("Location Error");
        }

        const transformLocationData = locationTransform(locationDummyData);

        resolve(transformLocationData);
    })
}

const locationTransform = (data) => {
    const { results } = data;
    const formattedResponse = camelize(results);
    const { geometry } = formattedResponse[0]

    return {
        lat: geometry.location.lat,
        lng: geometry.location.lng,
        viewport: geometry.viewport,
    };
}