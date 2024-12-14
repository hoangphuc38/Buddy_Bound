import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {ForgetPassScreenProps} from '../types/navigator.type';
import {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

const back = require('../assets/images/back-vector.png');
const nextIcon = require('../assets/images/next-icon.png');
const preIcon = require('../assets/images/previous-icon.png');
const checkIcon = require('../assets/images/check-icon.png');

const ForgetPassScreen = ({navigation}: ForgetPassScreenProps) => {
  // State để quản lý bước hiện tại
  const [currentStep, setCurrentStep] = useState(1);

  // Hàm chuyển bước
  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Dữ liệu cho từng bước
  const steps = [
    {
      title: 'Verify your email',
      placeholder: 'Type your email',
      image: require('../assets/images/email-verify.png'),
      showPrevious: false,
      showDone: false,
    },
    {
      title: 'Verify OTP',
      placeholder: 'Type your OTP',
      image: require('../assets/images/otp-verify.png'),
      showPrevious: true,
      showDone: false,
    },
    {
      title: 'Create new Password',
      placeholder: 'Type your new password',
      placeholderConfirm: 'Re-type your new password',
      image: require('../assets/images/confirm-pass.png'),
      showPrevious: true,
      showDone: true,
    },
  ];

  const currentData = steps[currentStep - 1];

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backBtnBackground}>
        <Image source={back} style={styles.backVector}></Image>
      </TouchableOpacity>
      <View style={styles.content}>
        {/* tiêu đề */}
        <Text style={{fontSize: 24, fontWeight: 600, color: '#2C7CC1'}}>
          {currentData.title}
        </Text>
        {/* ảnh */}
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={currentData.image}></Image>
        </View>
        {/* nhập liệu */}
        <View style={styles.form}>
          {currentStep === 3 ? (
            <>
              <View style={styles.textInput}>
                <TextInput
                  placeholder={currentData.placeholder}
                  placeholderTextColor="#2C7CC1"
                  multiline={false}
                  style={styles.inputStyle}
                />
              </View>
              <View style={styles.textInput}>
                <TextInput
                  placeholder={currentData.placeholderConfirm}
                  placeholderTextColor="#2C7CC1"
                  multiline={false}
                  style={styles.inputStyle}
                />
              </View>
            </>
          ) : (
            <View style={styles.textInput}>
              <TextInput
                placeholder={currentData.placeholder}
                placeholderTextColor="#2C7CC1"
                multiline={false}
                style={styles.inputStyle}
              />
            </View>
          )}
          {/* nút chuyển bước */}
          <View style={styles.btnContainer}>
            {currentData.showPrevious && (
              <TouchableOpacity style={styles.btnPrev} onPress={handlePrevious}>
                <View style={styles.btnContent}>
                  <View style={{height: 14, width: 15}}>
                    <Image source={preIcon} style={styles.img} />
                  </View>
                  <Text style={styles.btnText}>Previous</Text>
                </View>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.btnNext} onPress={handleNext}>
              <View style={styles.btnContent}>
                <Text style={styles.btnText}>
                  {currentData.showDone ? 'Done' : 'Next'}
                </Text>
                <View style={{height: 14, width: 15}}>
                  <Image
                    source={currentData.showDone ? checkIcon : nextIcon}
                    style={styles.img}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          gap: 5,
          position: 'absolute',
          bottom: 50,
          alignSelf: 'center',
        }}>
        <Text style={{color: 'rgba(0, 0, 0, 0.6)', fontWeight: 500}}>
          Don't have account?
        </Text>
        <TouchableOpacity>
          <Text style={{color: '#2C7CC1', fontWeight: 700}}>SignUp</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ForgetPassScreen;

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
