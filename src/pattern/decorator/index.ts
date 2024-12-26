import { TMemorablePlace } from '../../types/location-history.type';
import { TLocation } from '../../types/location.type';
import { TPost } from '../../types/post.type';
import { TUser } from '../../types/user.type';
import { BaseMarker } from './BaseMarker';
import { MarkerComponent } from './MarkerComponent';
import { MemorableDestinationDecorator } from './MemorableDestinationDecorator';
import { PostDecorator } from './PostDecorator';
import { UserDecorator } from './UserDecorator';

export const createUserMarker = (location: { longitude: number; latitude: number; user: TUser }): MarkerComponent => {
    const baseMarker = new BaseMarker({ longitude: location.longitude, latitude: location.latitude });
    return new UserDecorator(baseMarker, location.user);
  };

export const createDestinationMarker = (destination: TMemorablePlace, onPress: () => void): MarkerComponent => {
    const baseMarker = new BaseMarker({ longitude: destination.longitude, latitude: destination.latitude });
    return new MemorableDestinationDecorator(baseMarker, destination, onPress);
  };

export const createPostMarker = (post: TPost, onPress: () => void): MarkerComponent => {
    const baseMarker = new BaseMarker({ longitude: post.location.longitude, latitude: post.location.latitude });
    return new PostDecorator(baseMarker, post, onPress);
};

interface IMarker<T> {
  isShown: boolean;
  type: 'User' | 'Post' | 'Destination';
  navigation?: any;
  data: T[];
}

export const renderMarkers = <T extends TLocation | TPost | TMemorablePlace>(
  markerList: IMarker<T>
): JSX.Element[] | null => {
  const { isShown, type, data, navigation } = markerList;

  if (!isShown) {return null;}

  const markers = data.map((item) => {
    switch (type) {
      case 'User':
        return createUserMarker({
          longitude: (item as TLocation).longitude,
          latitude: (item as TLocation).latitude,
          user: (item as TLocation).user as TUser,
        }).render();
      case 'Post':
        return createPostMarker(item as TPost, () => {
          navigation.push('PostDetail', { postID: item.id });
        }).render();
      case 'Destination':
        return createDestinationMarker(item as TMemorablePlace, () => {}).render();
      default:
        return null;
    }
  }).filter((marker): marker is JSX.Element => marker !== null);

  return markers;
};

