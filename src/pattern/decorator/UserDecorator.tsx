import { Image, Text, View } from 'react-native';
import { TUser } from '../../types/user.type';
import { MarkerComponent } from './MarkerComponent';
import { MarkerDecorator } from './MarkerDecorator';
import React from 'react';

export class UserDecorator extends MarkerDecorator {
    constructor(
        marker: MarkerComponent,
        private user: TUser
    ) {
        super(marker);
    }

    render(): JSX.Element {
        return (
          <View>
            {super.render()}
            <View className="flex items-center">
              <View className="px-4 py-2 bg-white rounded-lg mb-2">
                <Text className="font-interRegular">{this.user.fullName}</Text>
              </View>
              <Image
                source={{ uri: this.user.avatar }}
                className="w-10 h-10 rounded-full border-2 border-primary"
              />
            </View>
          </View>
        );
      }
}
