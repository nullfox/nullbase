import React, { Fragment } from 'react';

import {
  Platform,
  SafeAreaView,
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import writeTestId from 'react-native-testid';

import { parsePaddingMargin } from '../style/size';
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
  ...rest
}) => (
  <Fragment>
    <SafeAreaView
      style={[
        styles.top,
        {
          backgroundColor: topInsetColor || palette.get('topInset')
        },
      ]}
    />
    <SafeAreaView
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
    </SafeAreaView>
  </Fragment>
);
