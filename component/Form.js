import React, {
  Component,
  createRef,
  Fragment,
} from 'react';

import {
  Keyboard,
  Platform,
  View,
} from 'react-native';

import {
  Formik,
} from 'formik';

import * as Yup from 'yup';

import _ from 'lodash';

import Input from './Input';

import TextBuilder from '../style/text';

const styles = {
  wrapper: {
    // flex: 1,
    // width: '100%',
  },

  input: {
    container: {
      marginBottom: 10,
      paddingHorizontal: 0,
      width: '100%',
    },

    inputContainer: {
      borderBottomWidth: 0,
      borderRadius: 4,
      paddingTop: 2,
    },

    input: {
      ...TextBuilder.factory()
        .size('0.875rem')
        .toObject(),
      paddingHorizontal: 10,
    },

    wrapper: {
      alignItems: 'center',
      flexDirection: 'row',
    },

    error: {
      ...TextBuilder.factory()
        .color('#dd0000')
        .size('0.75rem')
        .toObject(),
    },
  },
};

let defaultStyles = {};

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formErrors: {},
    };

    this.setupFields();
  }

  static setDefaultStyles(styles = {}) {
    defaultStyles = styles;
  }

  setupFields() {
    const {
      fields,
    } = this.props;

    const fieldKeys = Object.keys(fields);

    this.inputs = new Map(fieldKeys.map(f => ([f, createRef()])));

    this.validation = Yup.object().shape(
      Object.assign(...fieldKeys.map(key => (
        {
          [key]: fields[key].validation,
        }
      ))),
    );

    this.initialValues = Object.assign(...fieldKeys.map(key => (
      {
        [key]: fields[key].initial || '',
      }
    )));
  }

  focus(field) {
    if (this.inputs.has(field)) {
      this.inputs.get(field).current.focus();
    }
  }

  submit() {
    this.formikSubmit();
  }

  render() {
    const {
      containerStyle,
      inputStyle,
      inputContainerStyle,
      inputWrapperStyle,
      fields,
      onSubmit,
      onError,
    } = this.props;

    const {
      formErrors,
    } = this.state;

    const fieldKeys = Object.keys(fields);

    return (
      <Formik
        enableReinitialize
        initialValues={this.initialValues}
        validationSchema={this.validation}
        onSubmit={(...rest) => {
          if (Platform.OS === 'android') {
            Keyboard.dismiss();
          }

          onSubmit(...rest);
        }}
      >
        {
          (props) => {
            if (props.isValidating && !_.isEqual(formErrors, props.errors)) {
              this.setState({
                formErrors: !props.isValid ? props.errors : {},
              });

              if (!props.isValid) {
                onError(props.errors);
              }
            }

            this.formikSubmit = props.submitForm;

            return (
              <View style={[styles.wrapper, defaultStyles.wrapper || {}, containerStyle || {}]}>
                {
                  fieldKeys.map(key => (
                    <Fragment key={key}>
                      <View
                        style={[
                          styles.input.wrapper,
                          defaultStyles.inputWrapperStyle || {},
                          inputWrapperStyle || {},
                          fields[key].inputWrapperStyle || {},
                        ]}
                      >
                        {fields[key].leftView || null}

                        <Input
                          testID={`input-${key}`}
                          label={fields[key].label}
                          blurOnSubmit={!_.isUndefined(fields[key].blur) ? fields[key].blur : Platform.OS === 'android'}
                          ref={this.inputs.get(key)}
                          error={formErrors[key]}
                          returnKeyType={key === _.last(fieldKeys) ? 'done' : 'next'}
                          placeholder={fields[key].placeholder}
                          containerStyle={[
                            styles.input.container,
                            defaultStyles.containerStyle || {},
                            containerStyle || {},
                            fields[key].containerStyle || {},
                          ]}
                          inputContainerStyle={[
                            styles.input.inputContainer,
                            defaultStyles.inputContainerStyle || {},
                            inputContainerStyle || {},
                            fields[key].inputContainerStyle || {},
                          ]}
                          inputStyle={[styles.input.input, defaultStyles.input || {}, inputStyle || {}]}
                          errorStyle={styles.input.error}
                          onChangeText={(text) => {
                            if (fields[key].onChange) {
                              fields[key].onChange(text);
                            }

                            props.handleChange(key)(text);
                          }}
                          onFocus={() => {
                            if (fields[key].onFocus) {
                              fields[key].onFocus();
                            }
                          }}
                          onBlur={() => {
                            if (fields[key].onBlur) {
                              fields[key].onBlur();
                            }

                            setTimeout(() => props.handleBlur(key), 1);
                          }}
                          onSubmitEditing={() => {
                            if (key !== _.last(fieldKeys)) {
                              this.inputs.get(
                                fieldKeys[_.indexOf(fieldKeys, key) + 1],
                              ).current.focus();
                            } else {
                              props.submitForm();
                            }
                          }}
                          value={props.values[key]}
                          secureTextEntry={fields[key].secure || false}
                          {...(fields[key].inputProps || {})}
                          {
                            ...(
                              fields[key].testID
                                ? {
                                  testID: fields[key].testID,
                                  accessible: true,
                                  accessibilityLabel: fields[key].testID,
                                }
                                : {}
                            )
                          }
                        />

                        {fields[key].rightView || null}
                      </View>

                      {fields[key].afterView || null}
                    </Fragment>
                  ))
                }
              </View>
            );
          }
        }
      </Formik>
    );
  }
}

Form.Yup = Yup;

export default Form;
