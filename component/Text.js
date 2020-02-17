import React from 'react';

import {
  Text,
} from 'react-native';

import _ from 'lodash';

import { parsePaddingMargin } from '../style/size';

import TextBuilder from '../style/text';

const propertyNames = Object.getOwnPropertyNames(TextBuilder.factory().constructor.prototype);

export default ({
  padding,
  margin,
  style = {},
  children,
  ...rest
}) => (
  <Text
    style={[
      {
        ...(
          (
            Object.keys(rest).reduce(
              (builder, key) => {
                if (propertyNames.includes(key) && !_.isUndefined(rest[key])) {
                  return builder[key](rest[key]);
                }

                return builder;
              },
              TextBuilder.factory(),
            )
          ).toObject()
        ),
      },
      margin ? parsePaddingMargin(margin, 'margin') : {},
      padding ? parsePaddingMargin(padding) : {},
    ].concat(style)}
    {...rest}
  >
    {children}
  </Text>
);