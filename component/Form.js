import React, {
  Component,
  createRef,
  Fragment,
} from 'react';

import {
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  View,
} from 'react-native';

import {
  Input,
} from 'react-native-elements';

import {
  Formik,
} from 'formik';

import * as Yup from 'yup';

import _ from 'lodash';

import Styles from '../Styles';

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
      backgroundColor: '#f1f1f1',
      borderBottomWidth: 0,
      borderRadius: 4,
      paddingTop: 2,
    },

    input: {
      ...Styles.Text.build()
        .size('0.875rem')
        .toObject(),
      paddingHorizontal: 10,
    },

    wrapper: {
      alignItems: 'center',
      flexDirection: 'row',
    },

    error: {
      ...Styles.Text.build()
        .color('#dd0000')
        .size('0.75rem')
        .toObject(),
    },
  },

  button: {
    container: {
      marginHorizontal: 10,
    },

    button: {
      backgroundColor: Styles.Color.primary,
    },

    title: {
      ...Styles.Text.build()
        .color('#f1f1f1')
        .bold()
        .size('1rem')
        .toObject(),
    },

    invert: {
      button: {
        backgroundColor: '#f1f1f1',
      },

      title: {
        color: Styles.Color.primary,
      },
    },
  },
};

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formErrors: {},
    };

    this.setupFields();
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
            }

            this.formikSubmit = props.submitForm;

            return (
              <KeyboardAvoidingView
                style={[styles.wrapper, containerStyle || {}]}
                {...(Platform.OS === 'ios' ? { behavior: 'padding' } : {})}
              >
                {
                  fieldKeys.map(key => (
                    <Fragment key={key}>
                      <View
                        style={[
                          styles.input.wrapper,
                          inputWrapperStyle || {},
                          fields[key].inputWrapperStyle || {},
                        ]}
                      >
                        {fields[key].leftView || null}

                        <Input
                          testID={`input-${key}`}
                          blurOnSubmit={!_.isUndefined(fields[key].blur) ? fields[key].blur : Platform.OS === 'android'}
                          ref={this.inputs.get(key)}
                          errorMessage={formErrors[key]}
                          placeholder={fields[key].placeholder}
                          containerStyle={[
                            styles.input.container,
                            containerStyle || {},
                            fields[key].containerStyle || {},
                          ]}
                          inputContainerStyle={[
                            styles.input.inputContainer,
                            inputContainerStyle || {},
                            fields[key].inputContainerStyle || {},
                          ]}
                          inputStyle={[styles.input.input, inputStyle || {}]}
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
              </KeyboardAvoidingView>
            );
          }
        }
      </Formik>
    );
  }
}

Form.Yup = Yup;

export default Form;
