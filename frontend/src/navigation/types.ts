export type ConversationRouteData = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  distance: string;
  area: string;
  unreadCount: number;
};

export type PromotePostRouteData = {
  id: string;
  image: string;
  caption: string;
  location: string;
  likes: string;
};

export type RootStackParamList = {
  Splash: undefined;
  Onboarding1: undefined;
  Onboarding2: undefined;
  Onboarding3: undefined;
  SignIn: undefined;
  HomeFeed: undefined;
  PostCreation: undefined;
  Notifications: undefined;
  Search: undefined;
  Messages: undefined;
  Conversation: {
    conversation: ConversationRouteData;
  };
  ChatDetails: {
    conversation: ConversationRouteData;
  };
  Profile: undefined;
  EditProfile: undefined;
  EditAvatar: undefined;
  Settings: undefined;
  Privacy: undefined;
  NotificationsSettings: undefined;
  AccountSettings: undefined;
  SelectPost: undefined;
  PromotePost: {
    post: PromotePostRouteData;
  };
  BusinessProfile: undefined;
};
