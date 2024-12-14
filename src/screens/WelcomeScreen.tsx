import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {WelcomeScreenProps} from '../types/navigator.type';

const welcomeImg = require('../assets/images/welcome-img.png');

const WelcomeScreen = ({navigation}: WelcomeScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{marginTop: 30}}>
        <Text style={styles.title}>Welcome to Buddy Bound</Text>
      </View>
      <View style={{marginTop: 15, alignItems: 'center'}}>
        <Text>Buddy Bound helps connect families and friends</Text>
        <Text>
          By prodviding real-time location updates and useful features
        </Text>
      </View>
      <View style={styles.imgContainer}>
        <Image style={styles.img} source={welcomeImg} />
      </View>
      <View style={styles.butContainer}>
        <TouchableOpacity
          style={styles.btnGo}
          onPress={() => navigation.push('LogIn')}>
          <Text style={{color: '#fff', fontSize: 16, fontWeight: 600}}>
            GET STARTED
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FEFDFD',
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
  },
  img: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  imgContainer: {
    width: '90%',
    height: '100%',
    position: 'absolute',
    flex: 1,
  },
  butContainer: {
    bottom: 80,
    position: 'absolute',
  },
  btnGo: {
    paddingHorizontal: 100,
    backgroundColor: '#125B9A',
    paddingVertical: 17,
    borderRadius: 30,
  },
});
