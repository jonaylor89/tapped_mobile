// export all components here

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Auth from "./Auth";
import Profile from "./Profile";
import CreateBadgeForm from "./CreateBadgeForm";
import OnboardForm from "./OnboardForm";
import { routes } from "./routes";

type RootStackParamList = {
  Auth: undefined;
  Profile: { userId: string };
  OnboardForm: undefined;
  CreateBadgeForm: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export {
  RootStack,
  RootStackParamList,
  routes,
  Auth,
  Profile,
  CreateBadgeForm,
  OnboardForm,
};
