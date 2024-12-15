import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { TabsScreenProps } from '../types/navigator.type';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserShield, faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const SettingScreen = ({ navigation }: TabsScreenProps) => {
    return (
        <View className="flex flex-1 h-full w-full">
             <Text style={styles.title}>Settings Management</Text>

            <ScrollView contentContainerStyle={styles.settingsContainer}>
                <TouchableOpacity style={styles.settingOption} onPress={() => navigation.push('PermissionScreen')}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <View style={[styles.logo, {backgroundColor: '#00aa00' }]}>
                            <FontAwesomeIcon icon={faUserShield} size={15} color="white"/>
                        </View>
                        <Text style={styles.optionText}>Permission</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingOption}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <View style={[styles.logo, {backgroundColor: '#ff6600' }]}>
                            <FontAwesomeIcon icon={faClockRotateLeft} size={15} color="white"/>
                        </View>
                        <Text style={styles.optionText}>Your location history</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingOption}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <View style={[styles.logo, {backgroundColor: '#ff6600' }]}>
                            <FontAwesomeIcon icon={faClockRotateLeft} size={15} color="white"/>
                        </View>
                        <Text style={styles.optionText}>Album storage</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingOption}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <View style={[styles.logo, {backgroundColor: '#ff6600' }]}>
                            <FontAwesomeIcon icon={faClockRotateLeft} size={15} color="white"/>
                        </View>
                        <Text style={styles.optionText}>Memorable Destinations</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>

            <TouchableOpacity style={styles.logoutButton}>
                <Text style={styles.logoutText}>Log out</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#2C7CC1',
  },
  settingsContainer: {
    flexGrow: 1,
    marginVertical: 10,
  },
  logo:{
    height: 50,
    width: 50,
    margin: 0,
    borderRadius: 90,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingOption: {
    backgroundColor: 'transparent',
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 8,
    marginBottom: 15,
  },
  optionText: {
    fontSize: 16,
    fontWeight: 600,
    color: '#2C7CC1',
  },
  logoutButton: {
    backgroundColor: '#d9534f',
    padding: 15,
    margin: 20,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default SettingScreen;
