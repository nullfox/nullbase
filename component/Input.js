import React, { forwardRef, useState } from 'react'

import {
  Input as RNEInput,
} from 'react-native-elements';

import _ from 'lodash';

import Text from './Text';
import View from './View';

import { palette } from '../style/color';
import { parsePaddingMargin } from '../style/size';
import TextBuilder from '../style/text';

const styles = {
  wrapper: {
    container: {
      marginBottom: 10,
      paddingHorizontal: 0,
      width: '100%',
    },
  
    wrapper: {
      alignItems: 'center',
      borderColor: 'rgb(179,173,165)',
      borderWidth: 1,
      borderRadius: 4,
      flexDirection: 'row',
      padding: 10,
      paddingVertical: 8,
    },
  
    wrapperError: {
      backgroundColor: 'rgb(255,230,230)',
      borderColor: 'rgb(214,48,28)',
    },
  },
};

const Wrapper = ({
  containerStyle,
  wrapperStyle,
  active,
  label,
  LabelComponent = Text,
  labelColor,
  error,
  errorColor = 'rgb(214,48,28)',
  children,
}) => (
  <View style={[styles.wrapper.container, containerStyle || {}]}>
    {
      label
        ? (
          <LabelComponent
            bold
            color={labelColor || TextBuilder.getDefaultStyles().color}
            size="0.8rem"
            padding="0 0 6 0"
          >
            {label}
          </LabelComponent>
        )
        : null
    }

    <View
      style={[
        styles.wrapper.wrapper,
        {
          backgroundColor: palette.get('background'),
        },
        parsePaddingMargin(2),
        active ? { borderColor: palette.get('primary') } : {},
        wrapperStyle || {},
        error ? styles.wrapper.wrapperError : {},
      ]}
    >
      {children}
    </View>

    {
      error
        ? (
          <Text
            bold
            color={errorColor}
            size="0.75rem"
            padding="2 0 0 2"
          >
            {error}
          </Text>
        )
        : null
    }
  </View>
);

const Input = forwardRef((
  {
    onFocus = _.noop,
    onBlur = _.noop,
    containerStyle = {},
    wrapperStyle = {},
    active = false,
    label,
    labelColor,
    error = null,
    errorColor,
    LabelComponent,
    BeforeComponent = null,
    AfterComponent = null,
    ...rest
  },
  ref,
) => {
  const [isActive, setIsActive] = useState(active);

  return (
    <Wrapper
      active={isActive}
      containerStyle={containerStyle}
      wrapperStyle={[{ padding: 0 }, wrapperStyle]}
      label={label}
      LabelComponent={LabelComponent}
      labelColor={labelColor}
      error={error}
      errorColor={errorColor}
    >
      {BeforeComponent}
      <RNEInput
        {...rest}
        ref={ref}
        inputContainerStyle={{ borderBottomWidth: 0 }}
        inputStyle={{
          ...TextBuilder.factory().toObject(),
          padding: 0,
          margin: 0,
        }}
        onFocus={() => {
          setIsActive(true);

          (onFocus || _.noop)();
        }}
        onBlur={() => {
          setIsActive(false);

          (onBlur || _.noop)();
        }}
      />
      {AfterComponent}
    </Wrapper>
  );
});

Input.Wrapper = Wrapper;

export default Input;
