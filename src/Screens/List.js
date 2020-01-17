import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  View,
  FlatList,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux'
import { AuthActions } from '../Redux/Module/'
import Container from '../Components/Container';
import TextInput from '../Components/TextInput';
import {debounce, get} from 'lodash';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import useAxios from 'axios-hooks'
// const data = [
//   {
//     id: 0,
//     name: 'test1',
//     description: 'This is a test',
//     owner: {
//       html_url: 'https://www.facebook.com',
//       avatar_url: 'https://www.facebook.com',
//       login: 'andi',
//     },
//   },
//   {
//     id: 1,
//     name: 'test2',
//     description: 'This is a test',
//     owner: {
//       html_url: 'https://www.facebook.com',
//       avatar_url: 'https://www.facebook.com',
//       login: 'andi',
//     },
//   },
//   {
//     id: 2,
//     name: 'test3',
//     description: 'This is a test',
//     owner: {
//       html_url: 'https://www.facebook.com',
//       avatar_url: 'https://www.facebook.com',
//       login: 'andi',
//     },
//   },
//   {
//     id: 3,
//     name: 'test4',
//     description: 'This is a test',
//     owner: {
//       html_url: 'https://www.facebook.com',
//       avatar_url: 'https://www.facebook.com',
//       login: 'andi',
//     },
//   },
// ];
const List = ({navigation}) => {
  const dispatch = useDispatch();
  const [query, setQuery] = React.useState('a');
  const [page, setPage] = React.useState(0)
  const [{ data, loading }] = useAxios(`https://api.github.com/search/repositories?q=${query}&sort=star&order=asc&per_page=50&page=${page}`)
  const onChangeTextHandler = value => {
    debounce(() => {
      console.log('values', value);
    }, 400)();
  };
  console.log('data', data)

  const showItemDetails = data =>
    navigation.navigate('RepoDetailsComponent', {data});
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.itemWrapper}
        onPress={() => showItemDetails(item)}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <View style={styles.ownerWrapper}>
          <Image style={styles.avatar} source={{uri: item.owner.avatar_url}} />
          <Text style={styles.ownerName}>{item.owner.login}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const signout = () => {
    dispatch(AuthActions.resetAuth());
    navigation.navigate('Login')
  }

  const refetch = () => {};
  return (
    <Container>
      <SafeAreaView style={styles.headerWrapper}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Search Repositories</Text>
          <TextInput
            placeholder="Keyword..."
            onChangeText={onChangeTextHandler}
          />
          <TouchableOpacity style={styles.signout} onPress={signout}>
            <Icon name="sign-out" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={false}
            progressBackgroundColor="transparent"
            onRefresh={refetch}
          />
        }>
        <FlatList
          data={get(data, 'items', [])}
          renderItem={renderItem}
          keyExtractor={e => e.id}
        />
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
  },
  headerText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  itemWrapper: {
    padding: 5,
    borderBottomColor: '#d3d3d3',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  itemName: {
    color: '#49e',
    fontWeight: 'bold',
    fontSize: 18,
  },
  itemDescription: {
    marginBottom: 8,
    color: '#454647',
  },
  ownerWrapper: {
    flexDirection: 'row',
  },
  ownerName: {
    color: '#454647',
  },
  avatar: {
    height: 20,
    width: 20,
    backgroundColor: '#d3d3d3',
    marginRight: 5,
  },
  signout: {
    position: 'absolute',
    right: 10,
    top: 6
  }
});
export default List;
