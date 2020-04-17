import React, { Fragment } from 'react';

import {
  Platform,
} from 'react-native';

import {
  useSafeArea,
} from 'react-native-safe-area-context';

import {
  KeyboardAwareScrollView,
} from 'react-native-keyboard-aware-scroll-view';

import writeTestId from 'react-native-testid';

import {
  percentWidth,
  percentHeight,
  parsePaddingMargin,
} from '../style/size';

import View from './View';

import { palette } from '../style/color';

const styles = {
  top: {
    flex: 0,
  },

  main: {
    flex: 1,
  },

  keyboardView: {
    backgroundColor: palette.get('background'),
    flex: 1,
  },
};

export default ({
  children,
  topInsetColor,
  backgroundColor,
  keyboardAware,
  keyboardOffset,
  pinch,
  pinchHorizontal,
  pinchVertical,
  margin,
  padding,
  style,
  testId,
  insetBottom = true,
  ...rest
}) => {
  const insets = useSafeArea();

  return (
    (
      <Fragment>
        <View
          style={[
            styles.top,
            {
              backgroundColor: topInsetColor || palette.get('topInset'),
              height: insets.top,
            },
          ]}
        />
        <View
          style={[
            styles.main,
            {
              backgroundColor: backgroundColor || palette.get('background'),
              paddingBottom: insetBottom ? insets.bottom : 0,
              paddingLeft: insets.left,
              paddingRight: insets.right,
            }
          ]}
        >
          <View
            {...testId ? writeTestId(testId) : {}}
            style={[
              styles.main,
              {
                backgroundColor: backgroundColor || palette.get('background'),
                paddingHorizontal: (pinch || pinchHorizontal) ? percentWidth(5) : 0,
                paddingVertical: (pinch || pinchVertical) ? percentHeight(2.5) : 0,
              },
              margin ? parsePaddingMargin(margin, 'margin') : {},
              padding ? parsePaddingMargin(padding) : {},
            ].concat(style)}
          >
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
                    {children}
                  </KeyboardAwareScrollView>
                )
                : children
              }
          </View>
        </View>
      </Fragment>
    )
  );
};
