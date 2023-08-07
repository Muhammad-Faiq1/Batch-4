import { ThemeProvider } from "styled-components";
import theme from "./src/infrastructure/theme";
import { SafeAreaView, StatusBar } from "react-native";
import styled from "styled-components/native";
import RestaurantScreen from "./src/features/screen/RestaurantScreen";
import { RestaurantProvider } from "./src/services/restaurants/restaurants.context";
import LocationContextProvider from "./src/services/location/location.context";


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
            <RestaurantScreen />
          </CustomSaveAreaView>
        </RestaurantProvider>
      </LocationContextProvider>
    </ThemeProvider>
  );
}


