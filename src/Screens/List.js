import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import {useDispatch} from 'react-redux';
import {AuthActions} from '../Redux/Module/';
import Container from '../Components/Container';
import TextInput from '../Components/TextInput';
import {debounce, get, uniqBy} from 'lodash';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import useAxios from 'axios-hooks';

const List = ({navigation}) => {
  const dispatch = useDispatch();
  const [query, setQuery] = React.useState('a');
  const [page, setPage] = React.useState(0);
  const [previous, setPrevious] = React.useState(0);
  const [dataArray, setDataArray] = React.useState([])
  const [{data, loading}] = useAxios(
    `https://api.github.com/search/repositories?q=${query}&sort=star&order=asc&per_page=50&page=${page}`,
  );

  if(previous !== page) {
    const arr = uniqBy([...dataArray, ...get(data, 'items', [])], 'id');
    setDataArray(arr);
    setPrevious(page)
  }
  const onChangeTextHandler = value => {
    debounce(() => {
      setPage(0)
      setQuery(value)
    }, 400)();
  };

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
    navigation.navigate('Login');
  };

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
      {loading && <ActivityIndicator />}
      <ScrollView
        style={styles.scrollView}
        scrollEventThrottle={600}
        onScroll={e => {
          let paddingToBottom = 10;
          paddingToBottom += e.nativeEvent.layoutMeasurement.height;
          if (
            e.nativeEvent.contentOffset.y >=
            e.nativeEvent.contentSize.height - paddingToBottom
          ) {
            setPage(page + 1);
          }
        }}>
        <FlatList
          data={dataArray.length === 0 ? get(data, 'items', []) : dataArray}
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
    top: 6,
  },
});
export default List;
