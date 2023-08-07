import React, { useState } from 'react'
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { styled } from 'styled-components/native'

const SearchContainer = styled(View)`
padding: ${(props) => props.theme.space[3]};
background-color: ${(props) => props.theme.colors.bg.primary};
`;


function Search() {
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query)
  return (
    <SearchContainer>
      <Searchbar
        placeholder='Search for location'
        value={searchQuery}
        onChangeText={onChangeSearch} />
        
    </SearchContainer>
  )
}

export default Search
