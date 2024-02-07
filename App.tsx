import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { NativeBaseProvider } from "native-base";
import React from "react";
import HomePage from "./src/containers/homePage/homePage";
import ResetPasswordPage from "./src/containers/resetPasswordPage/resetPasswordPage";
import SignInPage from "./src/containers/signInPage/signInPage";
import SignUpPage from "./src/containers/signUpPage/signUpPage";
import WelcomePage from "./src/containers/welcomePage/welcomePage";
import { AppProvider } from "./src/context/AppContext";
import { UserProvider } from "./src/context/UserContext";
const Stack = createStackNavigator();

function App() {
	return (
		<NativeBaseProvider>
			<AppProvider>
				<UserProvider>
					<NavigationContainer>
						<Stack.Navigator initialRouteName="Home">
							<Stack.Screen
								name="SignIn"
								component={SignInPage}
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name="SignUp"
								component={SignUpPage}
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name="Home"
								component={HomePage}
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name="ResetPasswordPage"
								component={ResetPasswordPage}
								options={{ headerShown: false }}
							/>
						</Stack.Navigator>
					</NavigationContainer>
				</UserProvider>
			</AppProvider>
		</NativeBaseProvider>
	);
}

export default App;
