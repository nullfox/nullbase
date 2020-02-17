import * as mobx from 'mobx';
import * as mobxReact from 'mobx-react-lite';
import * as mst from 'mobx-state-tree';
import * as middleware from 'mst-middlewares';

import * as Color from './style/color';
import * as Size from './style/size';
import Text from './style/text';

import withStorage from './mst/withStorage';

import Screen from './component/Screen';
import View from './component/View';

const Style = {
  Color,
  Size,
  Text,
};

const MST = {
  withStorage,

  ...middleware,
  ...mobx,
  ...mobxReact,
  ...mst,
};

const Component = {
  Screen,
  View,
};

export {
  Style,
  MST,
  Component,
};
