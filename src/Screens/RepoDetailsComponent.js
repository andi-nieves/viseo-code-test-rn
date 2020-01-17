import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  Linking,
  ScrollView
} from 'react-native';
import Container from '../Components/Container';
import Button from '../Components/Button';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const RepoDetailsComponent = ({navigation}) => {
  const details = navigation.getParam('data');
  const keys = Object.keys(details);
  const goBack = () => navigation.goBack();

  const renderDetials = () => {
    return keys.map(key => {
      if (typeof details[key] === 'string') {
        return (
          <View style={styles.others} key={key}>
            <Text style={styles.othersKey}>{key}</Text>
            <Text style={styles.othersDes}>{details[key]}</Text>
          </View>
        );
      }
      if (typeof details[key] === 'object' || typeof details[key] === 'array') {
        return (
          <View style={styles.others} key={key}>
            <Text style={styles.othersKey}>{key}</Text>
            <Text style={styles.othersDes}>{JSON.stringify(details[key])}</Text>
          </View>
        );
      }
    });
  };

  const viewRepo = () => {
    Linking.openURL(details.html_url)
  }

  
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
      <View style={styles.wrapper}>
        <Text style={styles.detailsHeader}>{details.full_name}</Text>
        <View style={styles.ownerWrapper}>
          <Image style={styles.ownerAvatar} source={{ uri: details.owner.avatar_url }} />
          <Text style={styles.ownerName}>{details.owner.login}</Text>
        </View>
        <View style={styles.counts}>
          <Text><Icon name="star" /> Stars: {details.stargazers_count}</Text>
          <Text><Icon name="eye" /> Watch: {details.watchers_count}</Text>
          <Text><Icon name="code" /> Fork: {details.forks_count}</Text>
        </View>
        <Button onPress={viewRepo} style={styles.button} title="View Repo" />
      </View>
      <Text style={styles.otherDetailsHeader}>Other details:</Text>
      <ScrollView>
        {renderDetials()}
      </ScrollView>
      
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
    opacity: 0.8,
  },
  headerText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 20,
  },
  wrapper: {
    padding: 10
  },
  detailsHeader: {
    color: '#49e',
    fontWeight: 'bold',
    fontSize: 30,
  },
  counts: {marginBottom: 20, marginTop: 10},
  others: {
    padding: 10,
    borderBottomColor: '#dadada',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  othersKey: {
    color: '#454647',
  },
  othersDes: {
    color: '#49e',
  },
  ownerWrapper: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center'
  },  
  ownerAvatar: {
    height: 30,
    width: 30,
    marginRight: 5
  },
  otherDetailsHeader: {
    margin: 10,
    fontWeight: 'bold',
    color: '#49e',
  }
});
export default RepoDetailsComponent;
