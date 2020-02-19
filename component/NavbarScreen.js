import React from 'react';

import {
  TouchableOpacity,
} from 'react-native';

import Navbar from 'react-native-navbar';

import {
  Icon as RNEIcon,
} from 'react-native-elements';

import Screen from './Screen';
import Text from './Text';
import View from './View';

import TextBuilder from '../style/text';

import { percentWidth } from '../style/size';

import { palette } from '../style/color';

const styles = {
  button: {
    disabled: {
      opacity: 0.25,
    },

    icon: {
      height: '100%',
      justifyContent: 'center',
      width: 44,
    },

    back: {
      height: '100%',
      justifyContent: 'center',
      marginLeft: percentWidth(3),
      width: 24,
    },
  },

  container: {
    borderBottomWidth: 0,
  },
};

const IconButton = ({
  disabled,
  ...rest
}) => (
  <RNEIcon
    type="ionicon"
    containerStyle={[
      styles.button.icon,
      disabled ? styles.button.disabled : {},
      {
        height: 44,
      },
    ]}
    color={palette.get('background')}
    size={20}
    Component={TouchableOpacity}
    {...rest}
  />
);

const TextButton = ({
  disabled,
  text,
  onPress,
}) => (
  <TouchableOpacity
    disabled={disabled}
    onPress={onPress}
    style={[
      disabled ? styles.button.disabled : {},
      {
        height: 44,
      },
    ]}
  >
    <Text
      bold
      color={palette.get('background')}
      padding="0 0 2 0"
      margin="0 2.5%w"
    >
      {text}
    </Text>
  </TouchableOpacity>
);

const BackButton = ({
  disabled,
  text = 'Back',
  onPress,
  ...rest
}) => (
  <TouchableOpacity
    disabled={disabled}
    onPress={onPress}
    style={[
      disabled ? styles.button.disabled : {},
    ]}
  >
    <View
      row
      center
      height={44}
    >
      <RNEIcon
        type="ionicon"
        name="ios-arrow-back"
        {...rest}
        containerStyle={styles.button.back}
        color={palette.get('background')}
        size={20}
      />

      <Text bold color={palette.get('background')}>{text}</Text>
    </View>
  </TouchableOpacity>
);

const NavbarScreen = ({
  children,
  containerStyle,
  title = '',
  testId,
  TitleComponent,
  LeftComponent,
  RightComponent,
  ...rest
}) => {
  const titleConfig = {
    title,
    style: (
      TextBuilder.factory()
        .lightColor()
        .regular()
        .size('1.1rem')
        .center()
        .toObject()
    ),
  };

  return (
    <Screen
      testId={testId}
      containerStyle={containerStyle || {}}
      topInsetColor={palette.get('navbar')}
    >
      <Navbar
        title={(
          TitleComponent
            ? (
              React.cloneElement(
                TitleComponent,
                {
                  ...titleConfig,
                },
              )
            )
            : titleConfig
        )}
        statusBar={{
          hidden: true,
        }}
        tintColor={palette.get('navbar')}
        containerStyle={styles.container}
        leftButton={LeftComponent}
        rightButton={RightComponent}
      />

      <View
        flex
        pinchHorizontal
        {...rest}
      >
        {children}
      </View>
    </Screen>
  );
};

NavbarScreen.Icon = IconButton;
NavbarScreen.Text = TextButton;
NavbarScreen.Back = BackButton;

export default NavbarScreen;