import React from 'react';
import {View, StyleSheet} from 'react-native';

const CenterView = ({children, padding}) => {
  return (
    <View style={{padding, flex: 1}}>
      <View style={styles.wrapper}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
  },
  wrapper: {
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
  },
});

export default CenterView;
