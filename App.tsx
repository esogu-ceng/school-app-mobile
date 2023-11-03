import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomePage from "./src/containers/welcomePage/welcomePage";
import SignInPage from "./src/containers/signInPage/signInPage";
import SignUpPage from "./src/containers/signUpPage/signUpPage";
import MainPage from "./src/containers/mainPage/mainPage";
import { AppProvider } from "./src/context/AppContext";
import { NativeBaseProvider } from 'native-base';

const Stack = createStackNavigator();

function App() {
  return (
    <NativeBaseProvider>
      <AppProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen name="Welcome" component={WelcomePage}options={{ headerShown: false }} />
            <Stack.Screen name="SignIn" component={SignInPage} options={{ headerShown: false }}/>
            <Stack.Screen name="SignUp" component={SignUpPage}options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={MainPage} options={{ headerShown: false }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </AppProvider>
    </NativeBaseProvider>
  );
}

export default App;
