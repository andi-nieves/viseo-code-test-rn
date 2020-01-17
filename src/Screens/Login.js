import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Keyboard,
} from 'react-native';
import { useDispatch } from 'react-redux'
import { AuthActions } from '../Redux/Module/'
import Container from '../Components/Container';
import TextInput from '../Components/TextInput';
import Button from '../Components/Button';
import Alert from '../Components/Alert';

const credentialDataset = [
  {email: 'andi@github.com', password: '1234'},
  {email: 'user2@ggithub.com', password: '1234'},
  {email: 'user3@github.com', password: '1234'},
];
const Login = ({navigation, ...props}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('')
  const loginHandler = () => {
    const errors = [];
    setError('')
    if(email.trim().length === 0){
      errors.push('Email')
    }
    if(password.trim().length === 0){
      errors.push('Password')
    }
    if(errors.length > 0) {
      setError(`${errors.join(', ')} is required`)
      return
    }
    const result = credentialDataset.filter(
      c =>
        c.email.toLowerCase() === email.toLowerCase()
        
    );
    if(result.length === 0) {
      setError('Account not found! Do you want to create instead?')
      return;
    }
    const match = result.filter(c => c.password === password)
    if(match.length === 0) {
      setError('Email and Password not match')
      return;
    }
    Keyboard.dismiss()
    dispatch(AuthActions.setState(match[0]))
    setPassword('')
    navigation.navigate('List')

  };

  return (
    <Container  padding={20}>
      <View style={styles.wrapper}>
        <View style={styles.box}>
        
        <Text style={styles.title}>My App</Text>
        <Alert message={error} />
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={value => setEmail(value)}
        />
        <TextInput
          placeholder="Password"
          textContentType="password"
          type="password"
          value={password}
          onChangeText={value => setPassword(value)}
        />
        <Button onPress={loginHandler} title="Login" />
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#49e',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20
  },
  wrapper: {
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
  },
  box: {
    borderColor: '#49e',
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 20,
    paddingTop: 40,
    paddingBottom: 40
  }
});

export default Login;
