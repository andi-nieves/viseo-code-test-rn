import React from 'react';
import {useSelector} from 'react-redux';
import {
  StyleSheet,
  Text,
} from 'react-native';
import CenterView from '../Components/CenterView';
const LaunchScreen = ({navigation}) => {
  const auth = useSelector(state => state.Auth);
  React.useEffect(() => {
      navigation.navigate(auth.data.email ? 'List' : 'Login')
  },[])
  return (
    <CenterView>
      <Text style={styles.title}>My App</Text>
    </CenterView>
  );
};
const styles = StyleSheet.create({
  title: {
    color: '#49e',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
});
export default LaunchScreen;
