import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {PaperAirplaneIcon} from 'react-native-heroicons/outline';
import {hp, wp} from '../constants/Dimensions';
import {theme} from '../constants/theme';
import {ActivityIndicator} from 'react-native-paper';

const InputMessage = ({onSend, loading}) => {
  const [messages, setMessages] = useState('');

  return (
    <View style={[styles.container]}>
      <TextInput
        style={styles.input}
        value={messages}
        onChangeText={e => setMessages(e)}
        placeholder="Type a message..."
        multiline
        placeholderTextColor={theme.primeryDark}
      />

      {loading ? (
        <ActivityIndicator size={wp(6)} color={theme.primery} />
      ) : (
        <TouchableOpacity
          onPress={() => {
            onSend({type: 'input', content: messages});
            setMessages('');
          }}>
          <PaperAirplaneIcon color={theme.primery} size={wp(7)} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InputMessage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 5,
    padding: 10,
    borderColor: theme.primery,
    borderWidth: 1,
  },
  input: {
    width: '90%',
    fontSize: wp(3.4),
    color: '#000',
    paddingHorizontal: 10,
  },
});
