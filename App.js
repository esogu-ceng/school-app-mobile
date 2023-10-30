import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WelcomePage from "./src/containers/welcomePage/welcomePage";
import SignInPage from "./src/containers/signInPage/signInPage";
import SignUpPage from "./src/containers/signUpPage/signUpPage";
import MainPage from "./src/containers/mainPage/mainPage";
import { AppProvider } from "./src/context/AppContext";
import "./App.css";
import { NativeBaseProvider } from 'native-base';
function App() {
  const router = createBrowserRouter([
    {
      path: "/welcome",
      element: <WelcomePage />,
    },
    {
      path: "/signIn",
      element: <SignInPage />,
    },
    {
      path: "/signUp",
      element: <SignUpPage />,
    },
    {
      path: "/",
      element: <MainPage />,
    },
  ]);

  return (
	<div className="App">
	  <NativeBaseProvider>
		 <AppProvider>
			<RouterProvider router={router}>
			</RouterProvider>
		 </AppProvider>
	  </NativeBaseProvider>
	</div>
 );
}

export default App;
