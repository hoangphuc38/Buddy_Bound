import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {AddContactScreenProps} from '../types/navigator.type';
import {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

const back = require('../assets/images/back-vector.png');
const nextIcon = require('../assets/images/next-icon.png');
const preIcon = require('../assets/images/previous-icon.png');
const checkIcon = require('../assets/images/check-icon.png');

const AddContactScreen = ({navigation}: AddContactScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Add your Buddy</Text>
    </SafeAreaView>
  );
};

export default AddContactScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFDFD',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#2C7CC1',
    fontWeight: 600,
    marginTop: 15,
  },
  backBtnBackground: {
    height: 35,
    width: 35,
    backgroundColor: 'rgba(44, 124, 193, 0.2)',
    borderRadius: '50%',
    marginTop: 70,
    position: 'absolute',
    left: 25,
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
    marginTop: 70,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  imgContainer: {
    marginTop: 10,
    height: 195,
    width: 195,
  },
  textInput: {
    backgroundColor: 'rgba(44, 124, 193, 0.2)',
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    paddingHorizontal: 36,
    gap: 8,
  },
  btnNext: {
    backgroundColor: '#125B9A',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  btnPrev: {
    flex: 1,
    backgroundColor: '#125B9A',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    marginTop: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    gap: 10,
  },
  inputStyle: {
    fontSize: 14,
    fontWeight: 600,
    color: '#2C7CC1',
    height: 50,
  },
  btnText: {color: '#fff', fontSize: 16, fontWeight: '600'},
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingVertical: 15,
  },
});
