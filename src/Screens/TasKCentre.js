import React, {useRef, useState} from 'react';
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
import {HeaderComp, Loading, Notification} from '../Components';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {theme} from '../constants/theme';
import {TouchableRipple} from 'react-native-paper';
import {wp} from '../constants/Dimensions';
import TaskVerifyModal from '../Components/((modal))/TaskVerify';
import {useMutation, useQuery} from '@tanstack/react-query';
import showToast from '../Components/Toast';
import {completeTasks, tasks} from '../services/apiServices';

const platformIcons = {
  youtube: require('../../assets/youtube.png'),
  instagram: require('../../assets/instagram.png'),
  facebook: require('../../assets/facebook.png'),
  twitter: require('../../assets/twitter.png'),
  tiktok: require('../../assets/tiktok.png'),
  linkedin: require('../../assets/linkedin.png'),
};

const TaskCentre = ({navigation}) => {
  const sheetRef = useRef(null);
  const notificationRef = useRef(null);

  const [selectedTask, setSelectedTask] = useState(null);
  const [text, setText] = useState('');

  const {data, isLoading, error} = useQuery({
    queryKey: ['tasks'],
    queryFn: tasks,
    experimental_prefetchInRender: true,
  });

  const verifyTask = useMutation({
    mutationFn: id => completeTasks({taskId: id}),
    onSuccess: res => {
      if (res?.status) {
        notificationRef?.current.show({
          type: 'coin',
          text: `Task ${selectedTask.description} verified successfully!`,
        });
      } else {
        showToast(res?.message);
      }
      setSelectedTask(null);
      sheetRef.current?.close();
      setText('');
    },
    onError: err => {
      console.error('Error verifying task:', err);
      showToast('Error verifying task. Please try again.');
    },
  });

  const handleVerify = () => {
    Keyboard.dismiss();
    if (!selectedTask || !text) {
      return showToast('Please enter the verification text.');
    }

    if (text === selectedTask.target) {
      verifyTask.mutate(selectedTask?._id);
    } else {
      ToastAndroid.show(
        'Verification failed. Please check the link.',
        ToastAndroid.SHORT,
      );
      sheetRef.current?.close();
      setSelectedTask(null);
      setText('');
    }
  };

  const Header = () => (
    <HeaderComp
      title="Task Center"
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

  const renderItem = ({item, index}) => {
    const isSelected = item?.target === selectedTask?.target;
    const iconSource = platformIcons[item?.platform];

    return (
      <TouchableRipple
        key={index}
        onPress={() => {
          Linking.openURL(item?.target);
          setSelectedTask(item);
        }}
        rippleColor="rgba(13, 110, 253, 0.1)"
        style={[
          styles.card,
          {
            borderWidth: isSelected ? 1.5 : StyleSheet.hairlineWidth,
            borderColor: item?.status ? 'red' : theme.primery,
          },
        ]}>
        <View style={styles.row}>
          {iconSource && (
            <View style={styles.iconContainer}>
              <Image
                source={iconSource}
                style={styles.icon}
                resizeMode="cover"
              />
            </View>
          )}
          <View style={styles.info}>
            <Text style={styles.description}>{item?.description}</Text>
            <Text style={styles.points}>+{item?.points} points</Text>
          </View>
          {isSelected && (
            <TouchableOpacity
              onPress={() => {
                !item?.status && sheetRef.current.expand();
              }}
              style={styles.verifyBtn}>
              <Text style={styles.verifyText}>
                {item?.status ? 'Verified' : 'Verify'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableRipple>
    );
  };

  if (error) {
    showToast(error?.message);
  }

  return (
    <>
      {isLoading && <Loading />}
      <Notification ref={notificationRef} />
      <View className="flex-1 p-5 bg-[#F7F7F9]">
        <Header />
        <FlatList
          data={data?.data}
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

export default TaskCentre;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: wp(2),
    padding: wp(4),
    marginVertical: wp(1),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: wp(10),
    height: wp(10),
    backgroundColor: theme.secondaryBackground,
    borderRadius: wp(1.5),
    marginRight: wp(3),
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
    fontWeight: '600',
    color: '#000',
  },
  points: {
    fontSize: wp(3),
    fontWeight: '600',
    color: theme.primery,
    marginTop: wp(1),
  },
  verifyBtn: {
    paddingVertical: wp(2),
    paddingHorizontal: wp(4),
    backgroundColor: theme.primery,
    borderRadius: wp(2),
  },
  verifyText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: wp(3.5),
  },
});
