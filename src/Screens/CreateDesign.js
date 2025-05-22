import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FAB, Portal} from 'react-native-paper';
import {
  ClockIcon,
  LanguageIcon,
  ListBulletIcon,
  PencilIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
} from 'react-native-heroicons/outline';
import {theme} from '../constants/theme';
import {wp} from '../constants/Dimensions';
import {ScrollView} from 'react-native-gesture-handler';

const CreateDesign = () => {
  const [state, setState] = React.useState({open: false});

  const onStateChange = ({open}) => setState({open});

  const {open} = state;

  const PortalFab = () => (
    <Portal>
      <FAB.Group
        variant="surface"
        fabStyle={{
          backgroundColor: theme.primery,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        color={theme.backgroundColor}
        open={open}
        backdropColor="#00000033"
        visible
        rippleColor={'#fff'}
        icon={({size}) => (
          <PlusIcon color={theme.backgroundColor} size={size} />
        )}
        actions={[
          {
            icon: ({size}) => (
              <QuestionMarkCircleIcon
                color={theme.backgroundColor}
                size={size}
              />
            ),
            label: 'Creators Guide',
            style: {backgroundColor: theme.orange},

            onPress: () => console.log('Pressed star'),
          },
          {
            icon: ({size}) => (
              <ListBulletIcon color={theme.backgroundColor} size={size} />
            ),
            label: 'My Creativity List',
            style: {backgroundColor: theme.orange},

            onPress: () => console.log('Pressed star'),
          },
          {
            icon: ({size}) => (
              <ClockIcon color={theme.backgroundColor} size={size} />
            ),
            label: 'Pending Designs',
            onPress: () => console.log('Pressed email'),
            style: {backgroundColor: theme.backdrop},
          },
          {
            icon: ({size}) => (
              <PencilIcon color={theme.backgroundColor} size={size} />
            ),
            label: 'Create Designs',
            style: {backgroundColor: theme.discount},

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
    </Portal>
  );

  return (
    <ScrollView className="flex-1 bg-background">
      <PortalFab />
    </ScrollView>
  );
};

export default CreateDesign;

const styles = StyleSheet.create({});
