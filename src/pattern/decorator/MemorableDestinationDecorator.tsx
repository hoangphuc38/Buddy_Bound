import { Text, TouchableOpacity, View } from 'react-native';
import { TMemorablePlace } from '../../types/location-history.type';
import { MarkerComponent } from './MarkerComponent';
import { MarkerDecorator } from './MarkerDecorator';
import React from 'react';
import { MarkerView } from '@rnmapbox/maps';
import School from '../../assets/icons/school.svg';
import FavouritePlace from '../../assets/icons/favourite.svg';
import Home from '../../assets/icons/home.svg';
import Building from '../../assets/icons/building.svg';

export class MemorableDestinationDecorator extends MarkerDecorator {
  constructor(
      marker: MarkerComponent,
      private destination: TMemorablePlace,
      private onPress: () => void
  ) {
      super(marker);
  }

  getCorrectIcon = (type: string) => {
    switch(type) {
      case 'HOME':
        return <Home width={22} height={22} />;
      case 'FAVORITE_PLACE':
        return <FavouritePlace width={22} height={22} />;
      case 'SCHOOL':
        return <School width={22} height={22} />;
      case 'WORKPLACE':
        return <Building width={22} height={22} />;
      default:
        return null;
    }
  };

  render(): JSX.Element {
      const coordinate = this.getCoordinate();
      return (
          <MarkerView coordinate={[coordinate.longitude, coordinate.latitude]}>
              <TouchableOpacity onPress={this.onPress} >
                  <View className="flex items-center">
                      <View className="bg-white flex flex-row space-x-2 items-center rounded-full p-2" style={{elevation: 3}}>
                        <View className="bg-white rounded-full">
                          {this.getCorrectIcon(this.destination.locationType)}
                        </View>
                          <Text className="font-interMedium text-gray-700">{this.destination.note}</Text>
                      </View>
                  </View>
              </TouchableOpacity>
          </MarkerView>
      );
  }
}
