import React from 'react';

import {
  TouchableOpacity,
} from 'react-native';

import { parsePaddingMargin } from '../style/size';
import { palette } from '../style/color';

import Text from './Text';

export default ({
  full = false,
  padding = 10,
  margin,
  style = {},
  text,
  onPress,
  backgroundColor,
  ...rest
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      {
        alignItems: 'center',
        borderRadius: full ? 0 : 4,
        backgroundColor: backgroundColor || palette.get('primary'),
      },
      margin ? parsePaddingMargin(margin, 'margin') : {},
      padding ? parsePaddingMargin(padding) : {},
    ].concat(style)}
  >
    <Text
      bold
      color="white"
      {...rest}
    >
      {text}
    </Text>
  </TouchableOpacity>
);