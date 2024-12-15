import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLocationDot , faClockRotateLeft, faPhoneSquare} from '@fortawesome/free-solid-svg-icons';
import { PermissionScreenProps } from '../types/navigator.type';

const PermissionsScreen = ({ notification }: PermissionScreenProps) => {
  const [locationPermission, setLocationPermission] = useState(false);
  const [contactsPermission, setContactsPermission] = useState(false);
  const [locationHistoryTracking, setLocationHistoryTracking] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Permissions</Text>

      <ScrollView contentContainerStyle={styles.permissionsContainer}>
        <View style={styles.permissionRow}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <View style={[styles.logo, {backgroundColor: '#752d84' }]}>
                    <FontAwesomeIcon icon={faLocationDot} size={15} color="white"/>
                </View>
                <View>
                    <Text style={styles.permissionText}>Location to everyone</Text>
                    <Text style={styles.permissionTextScript}>(Except for Parent-Child relationship)</Text>
                </View>
            </View>
            <Switch
            value={locationPermission}
            onValueChange={(value) => setLocationPermission(value)}
            trackColor={{ false: '#ccc', true: '#125b9a' }}
            thumbColor={locationPermission ? '#125b9a' : '#125b9a'}
            />
        </View>

        <View style={styles.permissionRow}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <View style={[styles.logo, {backgroundColor: '#00aa00' }]}>
                    <FontAwesomeIcon icon={faPhoneSquare} size={15} color="white"/>
                </View>
            <Text style={styles.permissionText}>Contacts Permission</Text>
            </View>
          <Switch
            value={contactsPermission}
            onValueChange={(value) => setContactsPermission(value)}
            trackColor={{ false: '#ccc', true: '#125b9a' }}
            thumbColor={contactsPermission ? '#125b9a' : '#125b9a'}
          />
        </View>

        <View style={styles.permissionRow}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <View style={[styles.logo, {backgroundColor: '#125b9a' }]}>
                    <FontAwesomeIcon icon={faClockRotateLeft} size={15} color="white"/>
                </View>
                <Text style={styles.permissionText}>Location History Tracking</Text>
            </View>
          <Switch
            value={locationHistoryTracking}
            onValueChange={(value) => setLocationHistoryTracking(value)}
            trackColor={{ false: '#ccc', true: '#125b9a' }}
            thumbColor={locationHistoryTracking ? '#125b9a' : '#125b9a'}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#125b9a',
  },
  permissionsContainer: {
    flexGrow: 1,
    marginVertical: 10,
  },
  permissionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  permissionText: {
    fontSize: 16,
    color: '#125b9a',
    fontWeight: 600,
  },
  permissionTextScript:{
    fontSize: 13,
    color: '#125b9a',
    fontWeight: 300,
  },
});

export default PermissionsScreen;
