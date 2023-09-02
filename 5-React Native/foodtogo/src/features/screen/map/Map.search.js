import React, { useContext, useState } from 'react'
import { Searchbar } from 'react-native-paper';
import { locationContext } from '../../../services/location/location.context';
import { styled } from 'styled-components';
import { View } from 'react-native';

const SearchContainer = styled(View)`
padding: ${(props) => props.theme.space[3]};
background-color: ${(props) => props.theme.colors.bg.primary};
`;

function MapSearch() {
    const [searchQuery, setSearchQuery] = useState("");
    const { search } = useContext(locationContext)
    const onChangeSearch = (query) => setSearchQuery(query)
    return (
        <SearchContainer>
            <Searchbar
                placeholder='Search for location'
                value={searchQuery}
                onChangeText={onChangeSearch}
                onSubmitEditing={() => {
                    search(searchQuery)
                }}
            />

        </SearchContainer>)
}

export default MapSearch