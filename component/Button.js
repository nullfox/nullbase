import React from 'react';

import {
  Button,
} from 'react-native-elements';

import { parsePaddingMargin } from '../style/size';
import { palette } from '../style/color';
import TextBuilder from '../style/text';

export default ({
  fill = false,
  full = false,
  margin,
  color = 'white',
  size = '1.1rem',
  backgroundColor,
  ...rest
}) => (
  <Button
    {...rest}
    buttonStyle={[
      {
        borderRadius: full ? 0 : 6,
        backgroundColor: backgroundColor || palette.get('primary'),
      },
    ]}
    containerStyle={[
      fill ? { alignSelf: 'stretch' } : {},
      margin ? parsePaddingMargin(margin, 'margin') : {},
    ]}
    titleStyle={[
      TextBuilder.factory()
        .bold()
        .color(color)
        .size(size)
        .toObject(),
    ]}
  />
);