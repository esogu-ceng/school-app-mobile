import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { NativeBaseProvider } from "native-base";
import React from "react";
import MainPage from "./src/containers/drawer/drawer";
import ResetPasswordPage from "./src/containers/resetPasswordPage/resetPasswordPage";
import SignInPage from "./src/containers/signInPage/signInPage";
import SignUpPage from "./src/containers/signUpPage/signUpPage";
import { AppProvider } from "./src/context/AppContext";
import { UserProvider } from "./src/context/UserContext";
const Stack = createStackNavigator();

function App() {
	return (
		<NativeBaseProvider>
			<AppProvider>
				<UserProvider>
					<NavigationContainer>
						<Stack.Navigator initialRouteName="MainPage">
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
								name="MainPage"
								component={MainPage}
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
