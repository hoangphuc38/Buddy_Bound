import { Text, TouchableOpacity, View } from 'react-native';
import { TMemorablePlace } from '../../types/location-history.type';
import { MarkerComponent } from './MarkerComponent';
import { MarkerDecorator } from './MarkerDecorator';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

export class MemorableDestinationDecorator extends MarkerDecorator {
    constructor(
        marker: MarkerComponent,
        private destination: TMemorablePlace,
        private onPress: () => void
    ) {
        super(marker);
    }

    render(): JSX.Element {
        return (
          <TouchableOpacity onPress={this.onPress}>
            {super.render()}
            <View className="flex items-center">
              <View className="px-4 py-2 bg-white rounded-lg mb-2">
                <Text className="font-interMedium">{this.destination.note}</Text>
              </View>
              <FontAwesomeIcon icon={faStar} size={24} color="#FFD700" />
            </View>
          </TouchableOpacity>
        );
      }
}
