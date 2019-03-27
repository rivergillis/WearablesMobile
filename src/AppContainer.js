import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginPage from "./components/LoginPage";
import DeviceList from "./components/DeviceList";
import Testing from "./components/Testing";

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginPage
    },
    DeviceList: {
      screen: DeviceList
    },
    Testing: {
      screen: Testing
    }
  },
  // This will hide the automatically-added header so that we can use our own
  {
    initialRouteName: "Login", // which screen the app starts out on
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

export default createAppContainer(AppNavigator);
