import * as mobx from 'mobx';
import * as mobxReact from 'mobx-react-lite';
import * as mst from 'mobx-state-tree';
import * as middleware from 'mst-middlewares';

import * as Color from './style/color';
import * as Size from './style/size';
import TextBuilder from './style/text';

import withStorage from './mst/withStorage';

import NavbarScreen from './component/NavbarScreen';
import Screen from './component/Screen';
import Text from './component/Text';
import View from './component/View';

const Style = {
  Color,
  Size,
  Text: TextBuilder,
};

const MST = {
  withStorage,

  ...middleware,
  ...mobx,
  ...mobxReact,
  ...mst,
};

const Component = {
  NavbarScreen,
  Screen,
  Text,
  View,
};

export {
  Style,
  MST,
  Component,
};
