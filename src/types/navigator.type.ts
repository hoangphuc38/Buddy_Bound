import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Welcome: undefined;
    SignIn: undefined;
    Tabs: undefined;
    LogIn: undefined;
    Register: undefined;
    ForgetPass: undefined;
    AddContact: undefined;
    NewRelationship: undefined;
    SetNewRelationship: undefined;
    LocationBuddy: { userID: number }
    LocationGroup: { groupID: number }
    NewPost: undefined
    PostOfGroup: { groupID: number }
    PostDetail: { postID: number }
    MemorablePlaces: undefined
    NewMemorable: undefined
    //Declare new screen with needed parameters
}

export type WelcomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>;
export type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;
export type TabsScreenProps = NativeStackScreenProps<RootStackParamList, 'Tabs'>;
export type LogInScreenProps = NativeStackScreenProps<RootStackParamList, 'LogIn'>;
export type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, 'Register'>;
export type ForgetPassScreenProps = NativeStackScreenProps<RootStackParamList, 'ForgetPass'>;
export type AddContactScreenProps = NativeStackScreenProps<RootStackParamList, 'AddContact'>;
export type NewRelationshipScreenProps = NativeStackScreenProps<RootStackParamList, 'NewRelationship'>;
export type SetNewRelationshipScreenProps = NativeStackScreenProps<RootStackParamList, 'SetNewRelationship'>;
export type LocationBuddyScreenProps = NativeStackScreenProps<RootStackParamList, 'LocationBuddy'>
export type LocationGroupScreenProps = NativeStackScreenProps<RootStackParamList, 'LocationGroup'>
export type NewPostScreenProps = NativeStackScreenProps<RootStackParamList, 'NewPost'>
export type PostOfGroupProps = NativeStackScreenProps<RootStackParamList, 'PostOfGroup'>
export type PostDetailProps = NativeStackScreenProps<RootStackParamList, 'PostDetail'>
export type MemorablePlacesProps = NativeStackScreenProps<RootStackParamList, 'MemorablePlaces'>
export type NewMemorableProps = NativeStackScreenProps<RootStackParamList, 'NewMemorable'>
//Continue when declare new screens


export type BottomTabParamList = {
    HomeScreen: undefined;
    RelationshipScreen: undefined;
    NotificationScreen: undefined;
    SettingScreen: undefined;
};
