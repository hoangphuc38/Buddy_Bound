import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import { NewRelationshipScreenProps } from '../types/navigator.type';
import { useState, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import Header from '../components/Header';

const back = require('../assets/images/back-vector.png');
const home = require('../assets/images/home-icon.png');
const group = require('../assets/images/group-icon.png');
const chevronDown = require('../assets/images/chevron-down.png');

const NewRelationshipScreen = ({ navigation }: NewRelationshipScreenProps) => {
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
        toValue: 160, // Chiều cao tối đa của dropdown
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
        toValue: 400, // Chiều cao tối đa của dropdown
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <>
      <Header title='New Relationship'
        onBack={() => navigation.pop()}
      />

      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.typeOfRelationshipText} className='font-interMedium'>
            Choose your type of relationship
          </Text>
          <View>
            <TouchableOpacity
              style={[
                styles.cbbBtn,
                { backgroundColor: isFamilyActive ? '#2C91E7' : '#fff' },
                { borderColor: isFamilyActive ? '#2C91E7' : '#cdcdcd' },
              ]}
              onPress={toggleDropdownFamily}>
              <View style={styles.cbbTitle}>
                <View style={styles.cbbIcon}>
                  <Image
                    source={home}
                    style={[
                      styles.img,
                      { tintColor: isFamilyActive ? '#fff' : '#423D3D' },
                    ]}
                  />
                </View>
                <Text
                  style={[
                    styles.cbbText,
                    { color: isFamilyActive ? '#fff' : '#423D3D' },
                  ]}>
                  Family
                </Text>
              </View>
              <View style={styles.cbbIcon}>
                <Image
                  source={chevronDown}
                  style={[
                    styles.img,
                    { tintColor: isFamilyActive ? '#fff' : '#423D3D' },
                  ]}
                />
              </View>
            </TouchableOpacity>
            <Animated.View
              style={[styles.cbbOptions, { height: animationValueFamily }]}>
              <TouchableOpacity
                onPress={() => navigation.push('SetNewRelationship', { relationshipType: "FAMILY", detailRelationship: "Parent-Child" })}
                style={styles.cbbItem}>
                <Text style={styles.itemText}>Parent-Child</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.push('SetNewRelationship', { relationshipType: "FAMILY", detailRelationship: "Spouse" })}
                style={styles.cbbItem}>
                <Text style={styles.itemText}>Spouse</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.push('SetNewRelationship', { relationshipType: "FAMILY", detailRelationship: "Sibling" })}
                style={styles.cbbItem}>
                <Text style={styles.itemText}>Sibling</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
          {/* friend */}
          <View style={{ marginTop: 5 }}>
            <TouchableOpacity
              style={[
                styles.cbbBtn,
                { backgroundColor: isFriendActive ? '#2C91E7' : '#fff' },
                { borderColor: isFriendActive ? '#2C91E7' : '#cdcdcd' },
              ]}
              onPress={toggleDropdownFriend}>
              <View style={styles.cbbTitle}>
                <View style={styles.cbbIcon}>
                  <Image
                    source={group}
                    style={[
                      styles.img,
                      { tintColor: isFriendActive ? '#fff' : '#423D3D' },
                    ]}
                  />
                </View>
                <Text
                  style={[
                    styles.cbbText,
                    { color: isFriendActive ? '#fff' : '#423D3D' },
                  ]}>
                  Friend
                </Text>
              </View>
              <View style={styles.cbbIcon}>
                <Image
                  source={chevronDown}
                  style={[
                    styles.img,
                    { tintColor: isFriendActive ? '#fff' : '#423D3D' },
                  ]}
                />
              </View>
            </TouchableOpacity>
            <Animated.View
              style={[styles.cbbOptions, { height: animationValueFriend }]}>
              <TouchableOpacity
                onPress={() => navigation.push('SetNewRelationship', { relationshipType: "FRIEND", detailRelationship: "Acquaintances" })}
                style={styles.cbbItem}>
                <Text style={styles.itemText}>Acquaintances</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.push('SetNewRelationship', { relationshipType: "FRIEND", detailRelationship: "Work friends" })}
                style={styles.cbbItem}>
                <Text style={styles.itemText}>Work friends</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.push('SetNewRelationship', { relationshipType: "FRIEND", detailRelationship: "Casual friends" })}
                style={styles.cbbItem}>
                <Text style={styles.itemText}>Casual friends</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.push('SetNewRelationship', { relationshipType: "FRIEND", detailRelationship: "Close friends" })}
                style={styles.cbbItem}>
                <Text style={styles.itemText}>Close friends</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </View>
    </>

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
    marginTop: 5,
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
    color: 'black',
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
  cbbIcon: { height: 24, width: 24 },
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
