import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TBuddy, TFamily, TGroup } from './group.type';

export type RootStackParamList = {
  Welcome: undefined;
  Tabs: undefined;
  LogIn: undefined;
  Register: undefined;
  ForgetPass: undefined;
  AddContact: undefined;
  NewRelationship: undefined;
  SetNewRelationship: { relationshipType: string, detailRelationship: string };
  LocationBuddy: { userID: number, user?: TBuddy };
  LocationGroup: { groupID: number, groupType: string, group: TFamily };
  NewPost: { groupID: number };
  PostOfGroup: { groupID: number };
  PostDetail: { postID: number };
  MemorablePlaces: undefined;
  NewMemorable: undefined;
  PermissionScreen: undefined;
  LocationHistoryScreen: undefined;
  AlbumStorageScreen: undefined;
  AlbumDetailsScreen: { albumId: number };
  NewGroupScreen: undefined;
  CreateAccInfo: {email: string, password: string};
  AddAlbum: { isEditMode: boolean, albumId?: number };
  ChatScreen: { groupId: number, user?: TBuddy, group?: TFamily };
  RelationshipRequest: { referenceId?: number }
  LimitedPeople: undefined;
  //Declare new screen with needed parameters
};

export type WelcomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Welcome'
>;
export type TabsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Tabs'
>;
export type LogInScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'LogIn'
>;
export type RegisterScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Register'
>;
export type ForgetPassScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ForgetPass'
>;
export type AddContactScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'AddContact'
>;
export type NewRelationshipScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'NewRelationship'
>;
export type SetNewRelationshipScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SetNewRelationship'
>;
export type LocationBuddyScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'LocationBuddy'
>;
export type LocationGroupScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'LocationGroup'
>;
export type NewPostScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'NewPost'
>;
export type PostOfGroupProps = NativeStackScreenProps<
  RootStackParamList,
  'PostOfGroup'
>;
export type PostDetailProps = NativeStackScreenProps<
  RootStackParamList,
  'PostDetail'
>;
export type MemorablePlacesProps = NativeStackScreenProps<
  RootStackParamList,
  'MemorablePlaces'
>;
export type NewMemorableProps = NativeStackScreenProps<
  RootStackParamList,
  'NewMemorable'
>;
export type PermissionScreenProps = NativeStackScreenProps<RootStackParamList, 'PermissionScreen'>
export type LocationHistoryScreenProps = NativeStackScreenProps<RootStackParamList, 'LocationHistoryScreen'>
export type AlbumStorageScreenProps = NativeStackScreenProps<RootStackParamList, 'AlbumStorageScreen'>
export type AlbumDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'AlbumDetailsScreen'>
export type NewGroupScreenProps = NativeStackScreenProps<RootStackParamList, 'NewGroupScreen'>
export type ChatScreenProps = NativeStackScreenProps<RootStackParamList, 'ChatScreen'>
export type AddAlbumProps = NativeStackScreenProps<RootStackParamList, 'AddAlbum'>
export type CreateAccInfoProps = NativeStackScreenProps<RootStackParamList, 'CreateAccInfo'>
export type RelationshipRequestScreenProps = NativeStackScreenProps<RootStackParamList, 'RelationshipRequest'>
export type LimitedPeopleScreenProps = NativeStackScreenProps<RootStackParamList, 'LimitedPeople'>
//Continue when declare new screens

export type BottomTabParamList = {
  HomeScreen: undefined;
  RelationshipScreen: undefined;
  NotificationScreen: undefined;
  SettingScreen: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<BottomTabParamList, 'HomeScreen'>
export type RelationshipScreenProps = NativeStackScreenProps<BottomTabParamList, 'RelationshipScreen'>
export type NotificationScreen = NativeStackScreenProps<BottomTabParamList, 'NotificationScreen'>
export type SettingScreen = NativeStackScreenProps<BottomTabParamList, 'SettingScreen'>

