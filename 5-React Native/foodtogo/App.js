import { ThemeProvider } from "styled-components";
import theme from "./src/infrastructure/theme";
import { SafeAreaView, StatusBar, View, Text } from "react-native";
import styled from "styled-components/native";
import LocationContextProvider from "./src/services/location/location.context";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RestaurantNavigator } from "./src/navigation/restuarnts.navigator";
import { RestaurantProvider } from "./src/services/restaurants/restaurants.context";
import MapScreen from "./src/features/screen/map/Map.screen";



const Tab = createBottomTabNavigator();
const TAB_ICONS = {
  Restaurants: "md-restaurant",
  Map: "md-map",
  Settings: "md-settings",
};

const createScreenOptions = (parameter) => {
  // console.log(parameter, "parameter");
  const { route } = parameter;
  const iconName = TAB_ICONS[route.name];
  // const iconName = TAB_ICONS["Restaurants"];

  return {
    tabBarIcon: (tabBarParam) => {
      const { size, color } = tabBarParam;
      return <Ionicons name={iconName} size={size} color={color} />;
    },

    headerShown: false,
  };
};

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}



export default function App() {

  const CustomSaveAreaView = styled(SafeAreaView)`
  flex: 1;
  margin-top: ${StatusBar.currentHeight}px;
  `;
  return (
    <ThemeProvider theme={theme}>
      <LocationContextProvider>
        <RestaurantProvider>
          <CustomSaveAreaView>
            <NavigationContainer>
              <Tab.Navigator
                screenOptions={createScreenOptions}
                tabBarOptions={{
                  activeTintColor: "tomato",
                  inactiveTintColor: "gray",
                }}
              >
                <Tab.Screen
                  name="Restaurants"
                  component={RestaurantNavigator}
                />
                <Tab.Screen name="Map" component={MapScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
              </Tab.Navigator>
            </NavigationContainer>
          </CustomSaveAreaView>
        </RestaurantProvider>
      </LocationContextProvider>
    </ThemeProvider>
  );
}


