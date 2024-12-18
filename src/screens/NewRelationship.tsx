import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import {NewRelationshipScreenProps} from '../types/navigator.type';
import {useState, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import React from 'react';

const back = require('../assets/images/back-vector.png');
const home = require('../assets/images/home-icon.png');
const group = require('../assets/images/group-icon.png');
const chevronDown = require('../assets/images/chevron-down.png');

const NewRelationshipScreen = ({navigation}: NewRelationshipScreenProps) => {
  const [isFamilyActive, setIsFamilyActive] = useState(false);
  const [isFriendActive, setIsFriendActive] = useState(false);

  const animationValueFamily = useRef(new Animated.Value(0)).current; // Giá trị animation
  const animationValueFriend = useRef(new Animated.Value(0)).current;

  const toggleDropdownFamily = () => {
    if (isFamilyActive) {
      // Trượt lên (ẩn dropdown)
      Animated.timing(animationValueFamily, {
        toValue: 0,
        duration: 500, // Thời gian hiệu ứng
        useNativeDriver: false, // Không dùng native driver vì thay đổi layout
      }).start(() => setIsFamilyActive(false));
    } else {
      // Trượt xuống (hiện dropdown)
      setIsFamilyActive(true);
      Animated.timing(animationValueFamily, {
        toValue: 100, // Chiều cao tối đa của dropdown
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  };

  const toggleDropdownFriend = () => {
    if (isFriendActive) {
      // Trượt lên (ẩn dropdown)
      Animated.timing(animationValueFriend, {
        toValue: 0,
        duration: 500, // Thời gian hiệu ứng
        useNativeDriver: false, // Không dùng native driver vì thay đổi layout
      }).start(() => setIsFriendActive(false));
    } else {
      // Trượt xuống (hiện dropdown)
      setIsFriendActive(true);
      Animated.timing(animationValueFriend, {
        toValue: 100, // Chiều cao tối đa của dropdown
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backBtnBackground}>
        <Image source={back} style={styles.backVector} />
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={{fontSize: 24, fontWeight: 600, color: '#2C7CC1'}}>
          New Relationship
        </Text>
        <Text style={styles.typeOfRelationshipText}>
          Choose your type of relationship
        </Text>
        <View>
          <TouchableOpacity
            style={[
              styles.cbbBtn,
              {backgroundColor: isFamilyActive ? '#2C91E7' : '#fff'},
              {borderColor: isFamilyActive ? '#2C91E7' : '#cdcdcd'},
            ]}
            onPress={toggleDropdownFamily}>
            <View style={styles.cbbTitle}>
              <View style={styles.cbbIcon}>
                <Image
                  source={home}
                  style={[
                    styles.img,
                    {tintColor: isFamilyActive ? '#fff' : '#423D3D'},
                  ]}
                />
              </View>
              <Text
                style={[
                  styles.cbbText,
                  {color: isFamilyActive ? '#fff' : '#423D3D'},
                ]}>
                Family
              </Text>
            </View>
            <View style={styles.cbbIcon}>
              <Image
                source={chevronDown}
                style={[
                  styles.img,
                  {tintColor: isFamilyActive ? '#fff' : '#423D3D'},
                ]}
              />
            </View>
          </TouchableOpacity>
          <Animated.View
            style={[styles.cbbOptions, {height: animationValueFamily}]}>
            <TouchableOpacity
              onPress={() => navigation.push('SetNewRelationship')}
              style={styles.cbbItem}>
              <Text style={styles.itemText}>Parent-Child</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.push('SetNewRelationship')}
              style={styles.cbbItem}>
              <Text style={styles.itemText}>Others</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
        {/* friend */}
        <View style={{marginTop: 5}}>
          <TouchableOpacity
            style={[
              styles.cbbBtn,
              {backgroundColor: isFriendActive ? '#2C91E7' : '#fff'},
              {borderColor: isFriendActive ? '#2C91E7' : '#cdcdcd'},
            ]}
            onPress={toggleDropdownFriend}>
            <View style={styles.cbbTitle}>
              <View style={styles.cbbIcon}>
                <Image
                  source={group}
                  style={[
                    styles.img,
                    {tintColor: isFriendActive ? '#fff' : '#423D3D'},
                  ]}
                />
              </View>
              <Text
                style={[
                  styles.cbbText,
                  {color: isFriendActive ? '#fff' : '#423D3D'},
                ]}>
                Friend
              </Text>
            </View>
            <View style={styles.cbbIcon}>
              <Image
                source={chevronDown}
                style={[
                  styles.img,
                  {tintColor: isFriendActive ? '#fff' : '#423D3D'},
                ]}
              />
            </View>
          </TouchableOpacity>
          <Animated.View
            style={[styles.cbbOptions, {height: animationValueFriend}]}>
            <TouchableOpacity
              onPress={() => navigation.push('SetNewRelationship')}
              style={styles.cbbItem}>
              <Text style={styles.itemText}>Parent-Child</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.push('SetNewRelationship')}
              style={styles.cbbItem}>
              <Text style={styles.itemText}>Others</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NewRelationshipScreen;

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
  typeOfRelationshipText: {
    marginTop: 25,
    textAlign: 'left',
    width: '100%',
    fontSize: 16,
    fontWeight: '500',
    color: '#125B9A',
    marginBottom: 15,
  },
  cbbBtn: {
    paddingHorizontal: 22,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
  },
  cbbTitle: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  cbbIcon: {height: 24, width: 24},
  cbbText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  cbbOptions: {
    overflow: 'hidden', // Đảm bảo nội dung không bị tràn
  },
  cbbItem: {
    paddingLeft: 60,
    paddingVertical: 15,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
