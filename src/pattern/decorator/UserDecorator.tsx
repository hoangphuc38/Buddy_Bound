import { Image, Text, View } from 'react-native';
import { TUser } from '../../types/user.type';
import { MarkerComponent } from './MarkerComponent';
import { MarkerDecorator } from './MarkerDecorator';
import React from 'react';
import { MarkerView } from '@rnmapbox/maps';

export class UserDecorator extends MarkerDecorator {
    constructor(marker: MarkerComponent, private user: TUser) {
        super(marker);
    }

    render(): JSX.Element {
        const coordinate = this.getCoordinate();
        return (
            <MarkerView coordinate={[coordinate.longitude, coordinate.latitude]}>
                <View className="flex items-center">
                    <Image
                      source={{ uri: this.user.avatar }}
                      className="w-10 h-10 rounded-full border-2 border-primary"
                    />
                    <View className="px-4 py-1 bg-tooltip rounded-full mt-1">
                      <Text className="font-interMedium text-green-800">{this.user.fullName}</Text>
                    </View>
                </View>
            </MarkerView>
        );
    }
}
