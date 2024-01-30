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
const Stack = createStackNavigator();

function App() {
	return (
		<NativeBaseProvider>
			<AppProvider>
				<NavigationContainer>
					<Stack.Navigator initialRouteName="Welcome">
						<Stack.Screen
							name="Welcome"
							component={WelcomePage}
							options={{ headerShown: false }}
						/>
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
			</AppProvider>
		</NativeBaseProvider>
	);
}

export default App;
