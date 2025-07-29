// import React, {useState} from 'react';
// import {
//   ViroARScene,
//   ViroARSceneNavigator,
//   ViroText,
//   ViroTrackingReason,
//   ViroTrackingStateConstants,
// } from '@reactvision/react-viro';
// import {StyleSheet} from 'react-native';

// // AR Scene Component
// const ARScene = () => {
//   const [text, setText] = useState('Initializing AR...');

//   const onInitialized = (state: number, reason: ViroTrackingReason) => {
//     console.log('onInitialized', state, reason);
//     if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
//       setText('Hello World!');
//     } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
//       setText('Tracking Unavailable');
//     }
//   };

//   return (
//     <ViroARScene onTrackingUpdated={onInitialized}>
//       <ViroText
//         text={text}
//         scale={[0.5, 0.5, 0.5]}
//         position={[0, 0, -1]}
//         style={styles.helloWorldTextStyle}
//       />
//     </ViroARScene>
//   );
// };

// // AR Screen Navigator
// const ARScreen = () => {
//   return (
//     <ViroARSceneNavigator
//       autofocus={true}
//       initialScene={{scene: ARScene}}
//       style={styles.f1}
//     />
//   );
// };

// export default ARScreen;

// const styles = StyleSheet.create({
//   f1: {flex: 1},
//   helloWorldTextStyle: {
//     fontFamily: 'Arial',
//     fontSize: 30,
//     color: '#ffffff',
//     textAlignVertical: 'center',
//     textAlign: 'center',
//   },
// });
