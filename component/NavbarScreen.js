import React from 'react';

import {
  TouchableOpacity,
} from 'react-native';

import Navbar from 'react-native-navbar';

import {
  Icon as RNEIcon,
} from 'react-native-elements';

import {
  KeyboardAwareScrollView,
} from 'react-native-keyboard-aware-scroll-view';

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

  keyboardView: {
    backgroundColor: palette.get('background'),
    flex: 1,
  },
};

const IconButton = ({
  color,
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
    color={color || palette.get('background')}
    size={20}
    Component={TouchableOpacity}
    {...rest}
  />
);

const TextButton = ({
  color,
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
      color={color || palette.get('background')}
      padding="0 0 2 0"
      margin="0 2.5%w"
    >
      {text}
    </Text>
  </TouchableOpacity>
);

const BackButton = ({
  color,
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
        color={color || palette.get('background')}
        size={20}
      />

      <Text bold color={color || palette.get('background')}>{text}</Text>
    </View>
  </TouchableOpacity>
);

const NavbarScreen = ({
  children,
  backgroundColor,
  containerStyle,
  title = '',
  testId,
  navbarColor,
  keyboardAware,
  keyboardOffset,
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

  const innerChildren = (
    <View
      backgroundColor={backgroundColor || palette.get('background')}
      flex
      pinchHorizontal
      {...rest}
    >
      {children}
    </View>
  );

  return (
    <Screen
      testId={testId}
      containerStyle={containerStyle || {}}
      backgroundColor={backgroundColor || palette.get('background')}
      topInsetColor={navbarColor || palette.get('navbar')}
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
        tintColor={navbarColor || palette.get('navbar')}
        containerStyle={styles.container}
        leftButton={LeftComponent}
        rightButton={RightComponent}
      />

      {
        keyboardAware
        ? (
          <KeyboardAwareScrollView
            {...(Platform.OS === 'ios' ? { behavior: 'padding' } : {})}
            style={[
              styles.keyboardView,
              {
                backgroundColor: backgroundColor || palette.get('background'),
              },
            ]}
            keyboardOffset={keyboardOffset || 0}
          >
            {innerChildren}
          </KeyboardAwareScrollView>
        )
        : innerChildren
      }
    </Screen>
  );
};

NavbarScreen.Icon = IconButton;
NavbarScreen.Text = TextButton;
NavbarScreen.Back = BackButton;

export default NavbarScreen;