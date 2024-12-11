import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
    Welcome: undefined;
    SignIn: undefined;
    Tabs: undefined;
    Permissions: undefined;
    //Declare new screen with needed parameters
}

export type WelcomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>;
export type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;
export type TabsScreenProps = NativeStackScreenProps<RootStackParamList, 'Tabs'>;
export type PermisstionsScreenProps = NativeStackScreenProps<RootStackParamList, 'Permissions'>;

//Continue when declare new screens


export type BottomTabParamList = {
    HomeScreen: undefined;
    RelationshipScreen: undefined;
    NotificationScreen: undefined;
    SettingScreen: undefined;
    PermisstionsScreen: undefined;
};