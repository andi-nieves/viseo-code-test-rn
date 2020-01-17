import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

const Button = ({title, ...props}) => {
  return (
    <TouchableOpacity {...props} style={style.button}> 
      <Text style={style.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: '#49e',
    padding: 10,
    borderRadius: 4,
  },
  text: {
    color: '#fff',
    textAlign: 'center'
  }
  
});

export default Button
