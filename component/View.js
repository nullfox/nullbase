import React from 'react';

import {
  View as RNView,
} from 'react-native';

import _ from 'lodash';

import {
  percentHeight,
  percentWidth,
  parsePaddingMargin,
} from '../style/size';

export default ({
  pinch,
  pinchHorizontal,
  pinchVertical,
  center,
  centerHorizontal,
  centerVertical,
  flex,
  row,
  spaceBetween,
  backgroundColor,
  padding,
  margin,
  style = {},
  children,
  ...rest
}) => (
  <RNView
    {...rest}
    style={[
      {
        backgroundColor,
        paddingHorizontal: (pinch || pinchHorizontal) ? percentWidth(5) : 0,
        paddingVertical: (pinch || pinchVertical) ? percentHeight(2.5) : 0,
      },
      (
        flex
          ? { flex: _.isInteger(flex) ? flex : 1 }
          : {}
      ),
      (
        row
          ? { flexDirection: 'row' }
          : {}
      ),
      (
        center || centerVertical
          ? {
            [row ? 'alignItems' : 'justifyContent']: 'center',
          }
          : {}
      ),
      (
        center || centerHorizontal
          ? {
            [!row ? 'alignItems' : 'justifyContent']: 'center',
          }
          : {}
      ),
      (
        spaceBetween
          ? { justifyContent: 'space-between' }
          : {}
      ),
      margin ? parsePaddingMargin(margin, 'margin') : {},
      padding ? parsePaddingMargin(padding) : {},
    ].concat(style)}
  >
    {children}
  </RNView>
);