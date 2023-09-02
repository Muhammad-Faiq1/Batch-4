import React, { useContext } from "react";
import Search from "../components/Search/Search";
import CustomRestaurantCard from "../components/CustomRestaurantCard/CustomRestaurantCard";
import { ActivityIndicator, FlatList } from "react-native";
import { View } from "react-native";
import { styled } from "styled-components/native";
import { RestaurantContext } from "../../services/restaurants/restaurants.context";
import { locationContext } from "../../services/location/location.context";
import { TouchableOpacity } from "react-native";

// styling cs //
const RestaurantListContainer = styled(View)`
flex: 1;
padding: ${(props) => props.theme.space[3]};
background-color: ${(props) => props.theme.colors.bg.primary};`;

const RestaurantList = styled(FlatList).attrs({
    contentContainerStyle: {
        padding: 16,
    },
})``;

const Loading = styled(ActivityIndicator)``;

function RestaurantScreen(props) {

    const { navigation } = props;
    // const allRestaurant = Array.from({ length: 5 });
    const { isLoading, restaurant } = useContext(RestaurantContext);
    const { isLoading: locationLoader } = useContext(locationContext);

    //combine both loader//
    const bothLoader = isLoading || locationLoader
    return (
        <>
            <Search />

            {bothLoader && <Loading size={50} animating={true} color="#0000ff"></Loading>}

            {!bothLoader && <RestaurantListContainer>
                <RestaurantList
                    data={restaurant}
                    renderItem={(singleRestaurant) => {


                        return (<TouchableOpacity
                            onPress={() => {
                                navigation.navigate("RestaurantDetail", {
                                    singleRestaurant: singleRestaurant.item
                                })
                            }}>
                            < CustomRestaurantCard restaurant={singleRestaurant?.item} />

                        </TouchableOpacity>)
                    }}


                    keyExtractor={({ singleRestaurant }) => singleRestaurant?.name}
                />
            </RestaurantListContainer>}
        </>
    );
}

export default RestaurantScreen;
