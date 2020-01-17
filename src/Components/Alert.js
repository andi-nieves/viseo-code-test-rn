import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const Alert = ({message}) => {
  return message !== '' && (
    <View style={styles.wrapper}>
      <Icon name="times" size={30} color="#900" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    borderLeftColor: '#900',
    borderLeftWidth: 5,
    marginBottom: 10,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  message: {
    color: '#900'
  }
  
});

export default Alert
