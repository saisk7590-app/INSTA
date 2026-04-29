import { createBrowserRouter } from "react-router";
import { SplashScreen } from "./screens/SplashScreen";
import { OnboardingStep1 } from "./screens/OnboardingStep1";
import { OnboardingStep2 } from "./screens/OnboardingStep2";
import { OnboardingStep3 } from "./screens/OnboardingStep3";
import { SignInScreen } from "./screens/SignInScreen";
import { HomeFeed } from "./screens/HomeFeed";
import { PostCreation } from "./screens/PostCreation";
import { BusinessProfile } from "./screens/BusinessProfile";
import { NotificationsScreen } from "./screens/NotificationsScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: SplashScreen,
  },
  {
    path: "/onboarding/1",
    Component: OnboardingStep1,
  },
  {
    path: "/onboarding/2",
    Component: OnboardingStep2,
  },
  {
    path: "/onboarding/3",
    Component: OnboardingStep3,
  },
  {
    path: "/signin",
    Component: SignInScreen,
  },
  {
    path: "/home",
    Component: HomeFeed,
  },
  {
    path: "/create-post",
    Component: PostCreation,
  },
  {
    path: "/business/:id",
    Component: BusinessProfile,
  },
  {
    path: "/notifications",
    Component: NotificationsScreen,
  },
]);
