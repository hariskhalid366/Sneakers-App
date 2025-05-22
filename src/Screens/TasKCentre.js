import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Linking,
  ToastAndroid,
  Keyboard,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {HeaderComp, Notification} from '../Components';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {theme} from '../constants/theme';
import Tasks from '../constants/task.json';
import {TouchableRipple} from 'react-native-paper';
import {wp} from '../constants/Dimensions';
import TaskVerifyModal from '../Components/((modal))/TaskVerify';
import ChatBotModal from '../Components/((modal))/ChatBotModal';
import {Pressable} from 'react-native-gesture-handler';

const platformIcons = {
  youtube: require('../../assets/youtube.png'),
  instagram: require('../../assets/instagram.png'),
  facebook: require('../../assets/facebook.png'),
  twitter: require('../../assets/twitter.png'),
  tiktok: require('../../assets/tiktok.png'),
  linkedin: require('../../assets/linkedin.png'),
};

const TasKCentre = ({navigation}) => {
  const [data, setData] = useState([
    {
      id: 'task_1',
      type: 'subscribe',
      platform: 'youtube',
      target: 'https://www.youtube.com/@Nike',
      description: "Subscribe to Nike's YouTube channel",
      points: 50,
      completed: false,
    },
    {
      id: 'task_2',
      type: 'like_video',
      platform: 'youtube',
      target: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      description: 'Like this YouTube video',
      points: 20,
      completed: false,
    },
    {
      id: 'task_3',
      type: 'follow',
      platform: 'instagram',
      target: 'https://www.instagram.com/adidas/',
      description: 'Follow Adidas on Instagram',
      points: 30,
      completed: false,
    },
    {
      id: 'task_4',
      type: 'like_post',
      platform: 'instagram',
      target: 'https://www.instagram.com/p/CZxyz12345/',
      description: 'Like this Instagram post',
      points: 15,
      completed: false,
    },
    {
      id: 'task_5',
      type: 'comment',
      platform: 'instagram',
      target: 'https://www.instagram.com/p/CZxyz12345/',
      description: 'Comment on this Instagram post',
      points: 25,
      completed: false,
    },
    {
      id: 'task_6',
      type: 'follow',
      platform: 'facebook',
      target: 'https://www.facebook.com/Nike',
      description: 'Follow Nike on Facebook',
      points: 30,
      completed: false,
    },
    {
      id: 'task_7',
      type: 'share',
      platform: 'facebook',
      target: 'https://www.facebook.com/Nike/posts/10159538320260312',
      description: 'Share this Facebook post',
      points: 40,
      completed: false,
    },
    {
      id: 'task_8',
      type: 'follow',
      platform: 'twitter',
      target: 'https://twitter.com/Nike',
      description: 'Follow Nike on Twitter (X)',
      points: 30,
      completed: false,
    },
    {
      id: 'task_9',
      type: 'retweet',
      platform: 'twitter',
      target: 'https://twitter.com/Nike/status/1720012345678901234',
      description: 'Retweet this post from Nike',
      points: 40,
      completed: false,
    },
    {
      id: 'task_10',
      type: 'like_tweet',
      platform: 'twitter',
      target: 'https://twitter.com/Nike/status/1720012345678901234',
      description: 'Like this tweet',
      points: 20,
      completed: false,
    },
    {
      id: 'task_11',
      type: 'follow',
      platform: 'tiktok',
      target: 'https://www.tiktok.com/@nike',
      description: 'Follow Nike on TikTok',
      points: 30,
      completed: false,
    },
    {
      id: 'task_12',
      type: 'like_video',
      platform: 'tiktok',
      target: 'https://www.tiktok.com/@nike/video/7234567890123456789',
      description: 'Like this TikTok video',
      points: 20,
      completed: false,
    },
    {
      id: 'task_13',
      type: 'comment',
      platform: 'tiktok',
      target: 'https://www.tiktok.com/@nike/video/7234567890123456789',
      description: 'Comment on this TikTok video',
      points: 25,
      completed: false,
    },
    {
      id: 'task_14',
      type: 'follow',
      platform: 'linkedin',
      target: 'https://www.linkedin.com/company/nike/',
      description: 'Follow Nike on LinkedIn',
      points: 30,
      completed: false,
    },
    {
      id: 'task_15',
      type: 'like_post',
      platform: 'linkedin',
      target:
        'https://www.linkedin.com/feed/update/urn:li:activity:7021234567891234567',
      description: 'Like this LinkedIn post',
      points: 20,
      completed: false,
    },
    {
      id: 'task_16',
      type: 'comment',
      platform: 'linkedin',
      target:
        'https://www.linkedin.com/feed/update/urn:li:activity:7021234567891234567',
      description: 'Comment on this LinkedIn post',
      points: 25,
      completed: false,
    },
    {
      id: 'task_17',
      type: 'join_group',
      platform: 'facebook',
      target: 'https://www.facebook.com/groups/nikefans/',
      description: 'Join the Nike Fans Facebook group',
      points: 35,
      completed: false,
    },
    {
      id: 'task_18',
      type: 'tag_friend',
      platform: 'instagram',
      target: 'https://www.instagram.com/p/CZxyz12345/',
      description: 'Tag a friend in this Instagram post',
      points: 25,
      completed: false,
    },
    {
      id: 'task_19',
      type: 'repost',
      platform: 'instagram',
      target: 'https://www.instagram.com/p/CZxyz12345/',
      description: 'Repost this story to your Instagram story',
      points: 30,
      completed: false,
    },
    {
      id: 'task_20',
      type: 'use_hashtag',
      platform: 'twitter',
      target: '#NikeChallenge',
      description: 'Tweet with the hashtag #NikeChallenge',
      points: 35,
      completed: false,
    },
  ]);
  const sheetRef = useRef(null);
  const notificationRef = useRef(null);

  const [selectedTask, setSelectedTask] = useState(null);
  const [text, setText] = useState('');

  const Header = () => (
    <HeaderComp
      title={'Task Center'}
      apppend={<View className="w-10" />}
      prepend={
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-3 rounded-full bg-white elevation-sm">
          <ChevronLeftIcon color={theme.darkColor} size={18} />
        </TouchableOpacity>
      }
    />
  );

  const handleVerify = () => {
    if (!selectedTask) return;
    if (!text) return;
    if (text === selectedTask.target) {
      setData(prev =>
        prev.map(task =>
          task.id === selectedTask.id ? {...task, completed: true} : task,
        ),
      );
      setSelectedTask(null);
      sheetRef.current?.close();
      notificationRef.current.show({
        type: 'coin',
        text: `Task ${selectedTask.description} verified successfully!`,
      });
    } else {
      ToastAndroid.show(
        'Verification failed. Please check the link.',
        ToastAndroid.SHORT,
      );
      Keyboard.dismiss();
      setSelectedTask(null);
      sheetRef.current?.close();

      setText('');
    }
  };

  const renderItem = ({item}) => {
    const iconSource = platformIcons[item.platform];

    return (
      <TouchableRipple
        onPress={() => {
          Linking.openURL(item.target);
          setSelectedTask(item);
        }}
        rippleColor="rgba(13, 110, 253, 0.1)"
        style={[
          styles.card,
          {
            borderWidth:
              item?.target === selectedTask?.target
                ? 1.5
                : StyleSheet.hairlineWidth,
          },
        ]}>
        <View style={styles.row}>
          {iconSource && (
            <View style={styles.iconContainer}>
              <Image
                source={iconSource}
                style={styles.icon}
                resizeMode="cover"
                resizeMethod="scale"
              />
            </View>
          )}
          <View style={styles.info}>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.points}>+{item.points} points</Text>
          </View>
          {item.target === selectedTask?.target && (
            <TouchableOpacity
              onPress={() => sheetRef.current.expand()}
              className="p-3 rounded-xl bg-[#0D6EFD]">
              <Text
                className="text-white font-semibold"
                onPress={() => {
                  Linking.openURL(item.target);
                }}>
                Verify
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableRipple>
    );
  };

  return (
    <>
      <Notification ref={notificationRef} />
      <View className="flex-1 p-5 bg-[#F7F7F9]">
        <Header />
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <TaskVerifyModal
        ref={sheetRef}
        selectedTask={selectedTask}
        handleVerify={handleVerify}
        setText={setText}
        text={text}
      />
    </>
  );
};

export default TasKCentre;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    borderColor: theme.primery,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: wp(10),
    height: wp(10),
    backgroundColor: theme.secondaryBackground,
    borderRadius: 5,
    marginRight: 10,
  },
  icon: {
    width: '100%',
    height: '100%',
  },

  info: {
    flex: 1,
  },
  description: {
    fontSize: wp(4),
    color: '#000',
    fontWeight: '600',
  },
  points: {
    fontSize: wp(3),
    color: '#0D6EFD',
    fontWeight: '600',
    marginTop: 4,
  },
});
