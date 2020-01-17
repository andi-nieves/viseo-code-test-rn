import React from 'react';
import {
  TextInput as RNTextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const TextInput = ({type, ...props}) => {
  const [viewPass, setViewPass] = React.useState(type === 'password');

  const iStyle =
    type !== 'password'
      ? style.textInput
      : {...style.textInput, paddingRight: 33};

  const onViewPasswordHandler = () => setViewPass(!viewPass);
  return (
    <View>
      <Text style={style.label}>{props.placeholder}</Text>
      <RNTextInput {...props} style={iStyle} secureTextEntry={viewPass} />
      {type === 'password' && (
        <TouchableOpacity onPress={onViewPasswordHandler} style={style.suffix}>
          <Icon name={viewPass ? 'eye':'eye-slash'} size={20} color="#333" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  textInput: {
    borderColor: '#49e',
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    marginBottom: 10,
    backgroundColor: '#fff'
  },
  suffix: {
    alignSelf: 'flex-end',
    position: 'absolute',
    right: 10,
    top: 25,
  },
  label: {
    color: '#49e'
  }
});

export default TextInput;
