import {TextInput, View} from 'react-native';
import React from 'react';
import {theme} from '../constants/theme';

const InputField = ({
  placeholder,
  autoComplete,
  appendChild,
  containerStyles,
  value,
  innerStyles,
  onChangeText,
  maxLength,
  prependChild,
  secureTextEntry,
  iconStyle,
  keyboardType,
  editable,
}) => {
  return (
    <View
      style={[
        {backgroundColor: theme.secondaryBackground},
        {...containerStyles},
      ]}
      className="rounded-lg my-3 h-12">
      <View className="flex-row w-full px-5 items-center justify-between">
        <View style={{...iconStyle}}>{prependChild}</View>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={theme.secondaryDark}
          multiline={false}
          numberOfLines={1}
          style={{
            flex: 1,
            fontSize: 14,
            color: theme.darkColor,
            fontWeight: '600',
            paddingLeft: 12,
            ...innerStyles,
          }}
          autoCapitalize="none"
          keyboardAppearance="light"
          keyboardType={keyboardType}
          autoComplete={autoComplete}
          value={value}
          maxLength={maxLength}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          editable={editable}
        />
        {appendChild}
      </View>
    </View>
  );
};

export default React.memo(InputField);
