import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native-gesture-handler';

// const data = [
//   {
//     status: true,
//     id: '658c026c6cd3fcc3b7c32a7e',
//     order: {
//       _id: '659935d4b4bdad81d5eaac45',
//       id: '658c026c6cd3fcc3b7c32a7e',
//       username: 'Harry',
//       email: 'hariskhalid36@gmail.com',
//       phoneNumber: '03163618793',
//       address: 'Haha I love you too ',
//       date: 'Sat Jan 06 2024 16:13:24 GMT+0500 (Pakistan Standard Time)',
//       product: [
//         {
//           item: {
//             id: '1',
//             image:
//               'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/nike/nike1.png',
//             images: [
//               'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/nike/nike1.png',
//               'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/nike/nike1_1.png',
//               'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/nike/nike1_2.png',
//               'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/nike/nike1_3.png',
//               'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/nike/nike1_4.png',
//             ],
//             name: 'Wild Berry',
//             price: 160,
//             sizes: [39, 40, 41],
//             description:
//               "Inspired by the original that debuted in 1985, the Air Jordan 1 Low delivers a clean, classic look that's familiar yet fresh. With an iconic design that blends seamlessly with any fit, these shoes are perfect for taking charge.\n\nAdvantages:\n- Encapsulated Air-Sole unit for lightweight cushioning.\n- Genuine leather on the upper for durability and a premium look.\n- Solid rubber outsole for greater traction on different types of surfaces.\n- Color Shown: Palomino/White/Wild Berry\n- Model: 553558-215\n- Proven efficacy\n\nA timeless rubber sole combines with a soft sockliner and encapsulated Nike Air cushioning for all-day comfort. The rubber outsole offers durable traction on a variety of surfaces.",
//             quantity: 2,
//           },
//           price: 320,
//         },
//         {
//           item: {
//             id: '9',
//             image:
//               'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/nike/nike9.png',
//             images: [
//               'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/nike/nike9.png',
//             ],
//             name: 'Nike Dunk',
//             price: 119,
//             sizes: [40, 41, 42, 43, 44],
//             description:
//               "Inspired by the original that debuted in 1985, the Air Jordan 1 Low delivers a clean, classic look that's familiar yet fresh. With an iconic design that blends seamlessly with any fit, these shoes are perfect for taking charge.\n\nAdvantages:\n- Encapsulated Air-Sole unit for lightweight cushioning.\n- Genuine leather on the upper for durability and a premium look.\n- Solid rubber outsole for greater traction on different types of surfaces.\n- Color Shown: Palomino/White/Wild Berry\n- Model: 553558-215\n- Proven efficacy\n\nA timeless rubber sole combines with a soft sockliner and encapsulated Nike Air cushioning for all-day comfort. The rubber outsole offers durable traction on a variety of surfaces.",
//             quantity: 4,
//           },
//           price: 476,
//         },
//         {
//           item: {
//             id: '2',
//             image:
//               'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/nike/nike2.png',
//             images: [
//               'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/nike/nike2.png',
//               'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/nike/nike2_1.png',
//               'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/nike/nike2_2.png',
//               'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/nike/nike2_3.png',
//               'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/nike/nike2_4.png',
//             ],
//             name: 'Air Force 1',
//             price: 169,
//             sizes: [39, 40, 41, 42, 43],
//             description:
//               "Inspired by the original that debuted in 1985, the Air Jordan 1 Low delivers a clean, classic look that's familiar yet fresh. With an iconic design that blends seamlessly with any fit, these shoes are perfect for taking charge.\n\nAdvantages:\n- Encapsulated Air-Sole unit for lightweight cushioning.\n- Genuine leather on the upper for durability and a premium look.\n- Solid rubber outsole for greater traction on different types of surfaces.\n- Color Shown: Palomino/White/Wild Berry\n- Model: 553558-215\n- Proven efficacy\n\nA timeless rubber sole combines with a soft sockliner and encapsulated Nike Air cushioning for all-day comfort. The rubber outsole offers durable traction on a variety of surfaces.",
//             quantity: 2,
//           },
//           price: 338,
//         },
//         {
//           item: {
//             id: '3',
//             image:
//               'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/nike/nike3.png',
//             images: [
//               'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/nike/nike3.png',
//             ],
//             name: 'Nike Cosmic',
//             price: 129,
//             sizes: [38, 39, 40, 41, 42],
//             description:
//               "Inspired by the original that debuted in 1985, the Air Jordan 1 Low delivers a clean, classic look that's familiar yet fresh. With an iconic design that blends seamlessly with any fit, these shoes are perfect for taking charge.\n\nAdvantages:\n- Encapsulated Air-Sole unit for lightweight cushioning.\n- Genuine leather on the upper for durability and a premium look.\n- Solid rubber outsole for greater traction on different types of surfaces.\n- Color Shown: Palomino/White/Wild Berry\n- Model: 553558-215\n- Proven efficacy\n\nA timeless rubber sole combines with a soft sockliner and encapsulated Nike Air cushioning for all-day comfort. The rubber outsole offers durable traction on a variety of surfaces.",
//             quantity: 1,
//           },
//           price: 129,
//         },
//         {
//           item: {
//             id: '4',
//             image:
//               'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/nike/nike4.png',
//             images: [
//               'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/nike/nike4.png',
//             ],
//             name: 'Retro High',
//             price: 119,
//             sizes: [39, 40, 41, 42, 45],
//             description:
//               "Inspired by the original that debuted in 1985, the Air Jordan 1 Low delivers a clean, classic look that's familiar yet fresh. With an iconic design that blends seamlessly with any fit, these shoes are perfect for taking charge.\n\nAdvantages:\n- Encapsulated Air-Sole unit for lightweight cushioning.\n- Genuine leather on the upper for durability and a premium look.\n- Solid rubber outsole for greater traction on different types of surfaces.\n- Color Shown: Palomino/White/Wild Berry\n- Model: 553558-215\n- Proven efficacy\n\nA timeless rubber sole combines with a soft sockliner and encapsulated Nike Air cushioning for all-day comfort. The rubber outsole offers durable traction on a variety of surfaces.",
//             quantity: 1,
//           },
//           price: 119,
//         },
//         {
//           item: {
//             id: '5',
//             image:
//               'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/nike/nike5.png',
//             images: [
//               'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/nike/nike5.png',
//             ],
//             name: 'Pegas Turbo',
//             price: 95,
//             sizes: [36, 40, 41, 42, 47],
//             description:
//               "Inspired by the original that debuted in 1985, the Air Jordan 1 Low delivers a clean, classic look that's familiar yet fresh. With an iconic design that blends seamlessly with any fit, these shoes are perfect for taking charge.\n\nAdvantages:\n- Encapsulated Air-Sole unit for lightweight cushioning.\n- Genuine leather on the upper for durability and a premium look.\n- Solid rubber outsole for greater traction on different types of surfaces.\n- Color Shown: Palomino/White/Wild Berry\n- Model: 553558-215\n- Proven efficacy\n\nA timeless rubber sole combines with a soft sockliner and encapsulated Nike Air cushioning for all-day comfort. The rubber outsole offers durable traction on a variety of surfaces.",
//             quantity: 1,
//           },
//           price: 95,
//         },
//       ],
//       reference: '2h8sd',
//       __v: 0,
//     },
//   },
// ];

const DisplayOrder = ({items}) => {
  return (
    <View className="self-center p-3 rounded-2xl flex-1 bg-white ">
      <View className="justify-center gap-x-4 flex-row items-center my-3">
        <Image
          source={require('../../assets/logo.png')}
          style={{width: 40, height: 40, borderRadius: 10}}
        />
        <Text className="   text-lg text-black font-bold tracking-wide ">
          Sneakers
        </Text>
      </View>
      <FlatList
        legacyImplementation={true}
        scrollEnabled={false}
        data={items}
        keyExtractor={item => item.order._id}
        renderItem={({item}) => (
          <View className="gap-y-2">
            <View className="flex-row items-center ">
              <Text className="   text-base text-gray-600 font-bold tracking-wide ">
                Name :{' '}
              </Text>
              <Text className="   text-base text-black font-bold tracking-wide ">
                {item.order.username}
              </Text>
            </View>
            <View className="flex-row items-center ">
              <Text className="   text-base text-gray-600 font-bold tracking-wide ">
                Email :{' '}
              </Text>
              <Text className="   text-base text-black font-bold tracking-wide ">
                {item.order.email}
              </Text>
            </View>

            <View className="flex-row items-center ">
              <Text className="   text-base text-gray-600 font-bold tracking-wide ">
                Location :{' '}
              </Text>
              <Text className="   text-base text-black font-bold tracking-wide ">
                {item.order.address}
              </Text>
            </View>
            <View className="flex-row items-center ">
              <Text className="   text-base text-gray-600 font-bold tracking-wide ">
                Payment Method :{' '}
              </Text>
              <Text className="   text-base text-black font-bold tracking-wide ">
                {item.order?.paymentMethod}
              </Text>
            </View>
            <View className="flex-row items-center ">
              <Text className="   text-base text-gray-600 font-bold tracking-wide ">
                Date :{' '}
              </Text>
              <Text className="   text-base text-black font-bold tracking-wide ">
                {item.order?.date}
              </Text>
            </View>
            <FlatList
              data={item.order.product}
              keyExtractor={product => product.item.id}
              renderItem={({item}) => {
                return (
                  <View className="p-4 gap-1">
                    <Image
                      style={{width: 250, height: 250, borderRadius: 20}}
                      source={{uri: item.item.image}}
                    />
                    <Text className="   text-center text-sm font-semibold">
                      {item.item.name}
                    </Text>
                  </View>
                );
              }}
              horizontal
            />
          </View>
        )}
      />
    </View>
  );
};

export default DisplayOrder;
