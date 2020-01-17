import React from 'react';
import {View, StyleSheet} from 'react-native';

const Container = ({children, padding}) => {
  return (
    <View style={{ padding, flex: 1}}>
      {children}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1
  }
  
});

export default Container
