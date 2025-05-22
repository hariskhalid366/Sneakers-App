import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {FAB, Portal} from 'react-native-paper';
import {
  ChevronLeftIcon,
  ClockIcon,
  LanguageIcon,
  ListBulletIcon,
  PencilIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
  TrashIcon,
} from 'react-native-heroicons/outline';
import {theme} from '../constants/theme';
import {hp, wp} from '../constants/Dimensions';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import CreatorCard from '../Components/CreatorCard';
import {useRoute} from '@react-navigation/native';
import {HeaderComp} from '../Components';

const CreateDesign = ({navigation}) => {
  const route = useRoute();
  const [state, setState] = React.useState({open: false});
  const [active, setActive] = React.useState(false);

  useEffect(() => {
    if (route?.name === 'CreateDesign') {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [route]);

  const onStateChange = ({open}) => setState({open});

  const {open} = state;

  const PortalFab = () => (
    <FAB.Group
      variant="surface"
      fabStyle={{
        backgroundColor: theme.primery,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      color={theme.backgroundColor}
      open={open}
      style={styles.fabStyle}
      backdropColor="#ffffff99"
      visible
      rippleColor={'#fff'}
      icon={({size}) => <PlusIcon color={theme.backgroundColor} size={size} />}
      actions={[
        {
          icon: ({size}) => (
            <QuestionMarkCircleIcon color={theme.backgroundColor} size={size} />
          ),
          label: 'Creators Guide',
          style: {backgroundColor: 'purple'},
          labelTextColor: 'purple',

          onPress: () => console.log('Pressed star'),
        },
        {
          icon: ({size}) => (
            <ListBulletIcon color={theme.backgroundColor} size={size} />
          ),
          label: 'My Creativity List',
          style: {backgroundColor: theme.orange},
          labelTextColor: theme.orange,

          onPress: () => console.log('Pressed star'),
        },
        {
          icon: ({size}) => (
            <ClockIcon color={theme.backgroundColor} size={size} />
          ),
          label: 'Pending Designs',
          onPress: () => console.log('Pressed email'),
          style: {backgroundColor: theme.backdrop},
          labelTextColor: theme.backdrop,
        },
        {
          icon: ({size}) => (
            <PencilIcon color={theme.backgroundColor} size={size} />
          ),
          label: 'Create Designs',
          style: {backgroundColor: theme.discount},
          labelTextColor: theme.discount,

          onPress: () => console.log('Pressed notifications'),
        },
      ]}
      onStateChange={onStateChange}
      onPress={() => {
        if (open) {
          // do something if the speed dial is open
        }
      }}
    />
  );
  const array = new Array(10).fill(0);

  const onScroll = ({nativeEvent}) => {
    setActive(false);
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    if (currentScrollPosition <= 150) {
      setActive(true);
    }
    if (currentScrollPosition > 300) {
      setActive(false);
    }
  };

  return (
    <>
      {active && <PortalFab />}
      <View
        style={{
          backgroundColor: theme.secondaryBackground,
        }}>
        <HeaderComp
          title={'Favoirute'}
          inlineStyles={{
            fontSize: 18,
            fontWeight: '600',
          }}
          containerStyles={{
            paddingHorizontal: 10,
          }}
          prepend={
            <View
              style={{
                backgroundColor: theme.backgroundColor,
                padding: 10,
                elevation: 3,
                borderRadius: 30,
              }}>
              <ChevronLeftIcon color={theme.darkColor} size={'18'} />
            </View>
          }
          apppend={
            <TouchableOpacity
              // onPress={() => {
              //   deleteAllFavorites();
              // }}
              style={{
                backgroundColor: theme.backgroundColor,
                padding: 10,
                borderRadius: 30,
                elevation: 3,
              }}>
              <TrashIcon
                strokeWidth={1.5}
                color={theme.darkColor}
                size={'20'}
              />
            </TouchableOpacity>
          }
        />
        <FlatList
          onScroll={onScroll}
          legacyImplementation={true}
          contentContainerStyle={{paddingBottom: hp(15)}}
          data={array}
          renderItem={({index, item}) => <CreatorCard />}
        />
      </View>
    </>
  );
};

export default CreateDesign;

const styles = StyleSheet.create({
  fabStyle: {
    position: 'absolute',
    bottom: hp(0.5),
    zIndex: 300,
  },
});
