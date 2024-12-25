import { Image, Text, TouchableOpacity, View } from 'react-native';
import { TPost } from '../../types/post.type';
import { MarkerComponent } from './MarkerComponent';
import { MarkerDecorator } from './MarkerDecorator';
import React from 'react';
import { MarkerView } from '@rnmapbox/maps';

export class PostDecorator extends MarkerDecorator {
  constructor(
      marker: MarkerComponent,
      private post: TPost,
      private onPress: () => void
  ) {
      super(marker);
  }

  render(): JSX.Element {
      const coordinate = this.getCoordinate();
      return (
          <MarkerView coordinate={[coordinate.longitude, coordinate.latitude]}>
              <TouchableOpacity onPress={this.onPress}>
                  <View className="flex items-center">
                      <View className="p-3 bg-white rounded-lg mb-2">
                          <Text className="font-interMedium">{this.post.note}</Text>
                          <Text className="text-sm text-gray-600">
                              by {this.post.member.user.fullName}
                          </Text>
                      </View>
                      <Image
                          source={{ uri: this.post.member.user.avatar }}
                          className="w-10 h-10 rounded-full border-2 border-primary"
                      />
                  </View>
              </TouchableOpacity>
          </MarkerView>
      );
  }
}
