import React from 'react';
import { Card, Title } from 'react-native-paper';
import { View, Image } from 'react-native';
import { SvgXml } from 'react-native-svg';
import star from "../../../../assets/star";
import open from "../../../../assets/open";
import { styled } from 'styled-components/native';

// styling css //
const RestaurantCard = styled(Card)`
background-color:${(props) => props.theme.colors.bg.primary};
margin:10px;
margin-bottom: 25px;
`;

const RestaurantCardCover = styled(Card.Cover)`
margin-bottom:2px;
padding:12px;`;

const CardSection = styled(View)`
padding:15px;`;

const CardInnerSection = styled(View)`
display:flex;
flex-direction:row;`;

const RatingContainer = styled(View)`
display:flex;
flex-direction:row;
margin-top:20px;
flex-grow:1;`;

const StatusContainer = styled(View)`
display:flex;
flex-direction:row;
margin-top:19px;
margin-right:10px;
`;
const CustomImage = styled(Image)`
width: 15px;
  height: 15px;
  margin-left: 20px;
`;

function CustomRestaurantCard(props) {
  const { restaurant = {} } = props;

  const {
    photos = ["https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
    ],
    rating = 1,
    name = "Dinner Together",
    isOpenNow = true,
    isClosedTemporarily = true,
    icon = "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
  } = restaurant;

  //rating=4
  const ratingArray = Array.from(new Array(Math.floor(rating)));
  // console.log(name, "name")


  return (
    <RestaurantCard>
      <RestaurantCardCover source={{ uri: photos[0] }} />
      <CardSection>
        <Title variant="label">{name}</Title>

        <CardInnerSection>

          <RatingContainer>
            {ratingArray?.map((singleRating) => {
              return <SvgXml xml={star} width={20} height={20} />;
            })}
          </RatingContainer>

          <StatusContainer>

            {isClosedTemporarily && (
              <Title variant="caption" style={{ color: "red" }}>
                CLOSED TEMPORARILY
              </Title>
            )}

            {isOpenNow && <SvgXml xml={open} width={20} height={20} />}

            {icon && <CustomImage source={{ uri: icon }} />}
          </StatusContainer>

        </CardInnerSection>

      </CardSection>




    </RestaurantCard>
  )
}

export default CustomRestaurantCard
