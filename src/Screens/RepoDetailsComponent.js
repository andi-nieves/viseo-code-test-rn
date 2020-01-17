import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Container from '../Components/Container';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
const RepoDetailsComponent = ({navigation}) => {
  const details = navigation.getParam('data');
  console.log(details);
  const goBack = () => navigation.goBack()
  return (
    <Container>
      <SafeAreaView style={styles.headerWrapper}>
        <TouchableOpacity style={styles.header} onPress={goBack}>
          <Icon name="chevron-left" size={15} color="#fff" />
          <View style={styles.headerDetailsWrapper}>
            <Text style={styles.headerText}>{details.name}</Text>
            <Text style={styles.headerDescription}>{details.description}</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </Container>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: '#49e',
  },
  header: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerDetailsWrapper: {
    marginLeft: 10,
  },
  headerDescription: {
    color: '#fff',
    opacity: 0.8
  },
  headerText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 20,
  },
});
export default RepoDetailsComponent;
