import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  Animated,
} from 'react-native';
import {SetNewRelationshipScreenProps} from '../types/navigator.type';
import {useState, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Search from '../components/search';

const back = require('../assets/images/back-vector.png');
const home = require('../assets/images/home-icon.png');
const group = require('../assets/images/group-icon.png');
const chevronDown = require('../assets/images/chevron-down.png');

const SetNewRelationshipScreen = ({
  navigation,
}: SetNewRelationshipScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backBtnBackground}>
        <Image source={back} style={styles.backVector}></Image>
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={{fontSize: 24, fontWeight: 600, color: '#2C7CC1'}}>
          New Relationship
        </Text>
        <View style={styles.qrImageContainer}></View>
      </View>
    </SafeAreaView>
  );
};

export default SetNewRelationshipScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFDFD',
    alignItems: 'center',
  },
  backBtnBackground: {
    height: 35,
    width: 35,
    backgroundColor: 'rgba(44, 124, 193, 0.2)',
    borderRadius: 17.5, // Đổi sang số vì React Native không hỗ trợ '50%'
    marginTop: 20,
    position: 'absolute',
    left: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  backVector: {
    height: 17,
    width: 10,
  },
  content: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  qrImageContainer: {
    height: 150,
    width: 150,
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 15,
  },
});
