import React, { memo } from 'react'
import { Image, Text } from 'react-native';
import { Platform, View } from 'react-native';
import WebView from 'react-native-webview';
import { styled } from 'styled-components/native';


const Item = styled(View)`
padding: 10px;
max-width: 200px;
align-items: center;
`;

const CustomImage = styled(Image)`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

const CustomWebViewImage = styled(WebView)`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

const CustomText = styled(Text)`
margin-top: 7px;
`;


const isAndroid = Platform.OS === "android"

function MapCalloutComponent(props) {
    const { singleRestaurant } = props;
    const CustomImageComponent = isAndroid ? CustomWebViewImage : CustomImage;
    return (
        <Item>
            <CustomImageComponent source={{ uri: singleRestaurant.photos[0] }} />
            <CustomText>{singleRestaurant.name}</CustomText>
        </Item>
    )
}

export default memo(MapCalloutComponent)
