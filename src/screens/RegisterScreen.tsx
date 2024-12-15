import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RegisterScreenProps} from '../types/navigator.type';

const register = require('../assets/images/register-icon.png');
const back = require('../assets/images/back-vector.png');
const email = require('../assets/images/email-icon.png');
const pasword = require('../assets/images/lock-icon.png');
const user = require('../assets/images/user-icon.png');
const google = require('../assets/images/google-icon.png');

const RegisterScreen = ({navigation}: RegisterScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backBtnBackground}
        onPress={() => navigation.pop()}>
        <Image source={back} style={styles.backVector} />
      </TouchableOpacity>
      <View style={styles.contentContainer}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text
            style={{
              color: '#2C7CC1',
              fontSize: 35,
              fontWeight: 600,
            }}>
            Register
          </Text>
          <View style={{height: 50, width: 40}}>
            <Image source={register} style={styles.img} />
          </View>
        </View>
        {/* form đăng ký */}
        <View style={styles.form}>
          {/* username */}
          <View style={styles.textInput}>
            <View style={{height: 13, width: 13}}>
              <Image source={user} style={styles.icon} />
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                placeholder="User name"
                placeholderTextColor={'#2C7CC1'}
                multiline={false}
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#2C7CC1',
                  height: 50,
                }}
              />
            </View>
          </View>
          {/* email */}
          <View style={styles.textInput}>
            <View style={{height: 13, width: 13}}>
              <Image source={email} style={styles.icon} />
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                placeholder="Email"
                placeholderTextColor={'#2C7CC1'}
                multiline={false}
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#2C7CC1',
                  height: 50,
                }}
              />
            </View>
          </View>
          {/* password */}
          <View style={styles.textInput}>
            <View style={{height: 13, width: 13}}>
              <Image source={pasword} style={styles.icon} />
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                placeholder="Password"
                placeholderTextColor={'#2C7CC1'}
                secureTextEntry
                multiline={false}
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#2C7CC1',
                  height: 50,
                }}
              />
            </View>
          </View>
          {/* confirm pass */}
          <View style={styles.textInput}>
            <View style={{height: 13, width: 13}}>
              <Image source={pasword} style={styles.icon} />
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                placeholder="Repeat your password"
                placeholderTextColor={'#2C7CC1'}
                secureTextEntry
                multiline={false}
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#2C7CC1',
                  height: 50,
                }}
              />
            </View>
          </View>
          {/* nút signUP */}
          <TouchableOpacity style={styles.btnSignUp}>
            <Text
              style={{
                textAlign: 'center',
                color: '#fff',
                fontSize: 17,
                fontWeight: 700,
              }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        {/* continue with */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 60,
          }}>
          <View style={styles.dash} />
          <Text style={{marginLeft: 5, marginRight: 5, fontWeight: 500}}>
            Or Continue With
          </Text>
          <View style={styles.dash} />
        </View>
        {/* google */}
        <TouchableOpacity style={styles.googleSignInBtn}>
          <Image source={google} style={styles.img} />
        </TouchableOpacity>
        {/* login */}
        <View style={{flexDirection: 'row', gap: 5, marginTop: 80}}>
          <Text style={{color: 'rgba(0, 0, 0, 0.6)', fontWeight: 500}}>
            Already have an account?
          </Text>
          <TouchableOpacity>
            <Text style={{color: '#2C7CC1', fontWeight: 700}}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFDFD',
  },
  backBtnBackground: {
    height: 35,
    width: 35,
    backgroundColor: 'rgba(44, 124, 193, 0.2)',
    borderRadius: '50%',
    marginTop: 70,
    position: 'relative',
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
  contentContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    marginTop: 40,
    width: '100%',
    paddingHorizontal: 36,
    gap: 8,
  },
  textInput: {
    backgroundColor: 'rgba(44, 124, 193, 0.2)',
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  textInputContainer: {
    marginLeft: 10,
  },
  btnSignUp: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: '#125B9A',
    borderRadius: 30,
    marginTop: 20,
  },
  dash: {
    width: 80,
    height: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  googleSignInBtn: {
    marginTop: 20,
    height: 45,
    width: 45,
    borderColor: '#d9d9d9',
    borderWidth: 1.5,
    borderRadius: '50%',
    padding: 5,
  },
});
