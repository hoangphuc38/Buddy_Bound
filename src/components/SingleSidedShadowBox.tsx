import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface ISingleSidedShadowBoxProps {
    children: ReactNode;
    style?: ViewStyle | ViewStyle[];
}

const SingleSidedShadowBox: React.FC<ISingleSidedShadowBoxProps> = ({ children, style }) => (
    <View style={[styles.container, style]}>{children}</View>
);

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        paddingBottom: 5,
    },
});

export default SingleSidedShadowBox;
