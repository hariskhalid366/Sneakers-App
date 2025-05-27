import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {GoogleGenAI} from '@google/genai';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {hp, wp} from '../../constants/Dimensions';
import {theme} from '../../constants/theme';
import InputMessage from '../InputMessage';

const ChatBotScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const listRef = useRef(null);

  useEffect(() => {
    handleSend({content: 'Hello!'});
  }, []);

  const GEMINI_API_KEY = 'AIzaSyCgnpSW0e37RdjpUnVo67pceYW9vFWpW6E';
  const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

  const handleSend = async ({content}) => {
    if (!content?.trim()) return;
    setLoading(true);

    const userMsg = {
      id: Date.now().toString(),
      text: content,
      sender: 'user',
    };
    setMessages(prev => [userMsg, ...prev]);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: `Only answer this if it is about sneakers, shoes, presents. If it's not, just respond with: "I’m here to assist you about shoes." Now, here's the question: ${content}`,
      });

      const botReply = response?.text || 'I’m here to assist you about shoes.';
      const botMsg = {
        id: (Date.now() + 1).toString(),
        text: botReply,
        sender: 'bot',
      };
      setMessages(prev => [botMsg, ...prev]);
    } catch (error) {
      console.error('Gemini API error:', error);
      setMessages(prev => [
        {
          id: (Date.now() + 1).toString(),
          text: "Sorry, I couldn't process your request.",
          sender: 'bot',
        },
        ...prev,
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (listRef.current && messages.length > 0) {
      listRef.current.scrollToOffset({offset: 0, animated: true});
    }
  }, [messages]);

  const renderItem = ({item}) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === 'user' ? styles.user : styles.bot,
      ]}>
      <Text
        style={[
          styles.messageText,
          {color: item.sender === 'user' ? '#fff' : '#000'},
        ]}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.touchable}>
          <ChevronLeftIcon color={'#000'} size={wp(6)} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Chat</Text>
        <Image
          source={require('../../../assets/chat.png')}
          style={{width: 50, height: 50}}
        />
      </View>

      <FlatList
        ref={listRef}
        style={styles.messageList}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{padding: 16, paddingBottom: 100}}
        showsVerticalScrollIndicator={false}
        inverted
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
      />

      <InputMessage onSend={handleSend} loading={loading} />
    </SafeAreaView>
  );
};

export default ChatBotScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
  },
  header: {
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: theme.darkColor,
    padding: 16,
  },
  touchable: {
    padding: 13,
    borderRadius: wp(100),
    backgroundColor: '#fff',
    elevation: 4,
  },
  messageList: {
    flex: 1,
    backgroundColor: theme.secondaryBackground,
    margin: 10,
    borderRadius: 20,
    maxHeight: hp(75),
  },
  messageBubble: {
    maxWidth: '80%',
    marginVertical: 6,
    padding: 12,
    borderRadius: 12,
  },
  user: {
    alignSelf: 'flex-end',
    backgroundColor: theme.primery,
  },
  bot: {
    alignSelf: 'flex-start',
    backgroundColor: '#eee',
  },
  messageText: {
    fontSize: wp(3.5),
    fontWeight: '600',
  },
});
