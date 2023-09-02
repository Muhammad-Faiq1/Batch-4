import React, { useContext, useEffect, useState } from 'react'
import MapView, { Marker, Callout } from "react-native-maps";
import { locationContext } from '../../../services/location/location.context'
import { ActivityIndicator, SafeAreaView } from 'react-native';
import { RestaurantContext } from '../../../services/restaurants/restaurants.context';
import MapSearch from './Map.search';
import MapCalloutComponent from './MapCalloutComponent';



function MapScreen(props) {
    const { navigation } = props;
    const { location, isLoading: locationLoading } = useContext(locationContext);
    const { lat, lng, viewport } = location;
    const [latDelta, setLatDelta] = useState(0);
    const { restaurant, isLoading: restaurantLoading } = useContext(RestaurantContext);
    const bothLoader = locationLoading || restaurantLoading
    useEffect(() => {
        const northeastLat = viewport.northeast.lat;
        const southwestLat = viewport.southwest.lat;

        setLatDelta(northeastLat - southwestLat);
    }, [location, viewport])



    return (
        <SafeAreaView>
            <MapSearch />
            {bothLoader &&
                (<ActivityIndicator size={50} animating={true} color="#0000ff" />)
                }

            <MapView
                style={{
                    height: "100%",
                    width: "100%",
                }}
                initialRegion={{
                    latitude: lat,
                    longitude: lng,
                    latitudeDelta: latDelta,
                    longitudeDelta: 0.02,

                }}>
                {restaurant.map((singleRestaurant) => {
                    return (
                        <Marker
                            key={singleRestaurant.name}
                            title={singleRestaurant.name}
                            coordinate={{
                                latitude: singleRestaurant.geometry.location.lat,
                                longitude: singleRestaurant.geometry.location.lng,
                            }}
                        >
                            <Callout
                                onPress={() => {

                                    navigation.navigate("RestaurantDetail", {
                                        singleRestaurant: singleRestaurant,

                                    });
                                }}
                            >
                                <MapCalloutComponent singleRestaurant={singleRestaurant} />
                            </Callout>
                        </Marker>
                    );
                })}

            </MapView>
        </SafeAreaView>
    )

}

export default MapScreen
