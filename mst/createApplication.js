import {
  addMiddleware,
  onSnapshot,
  types,
} from 'mobx-state-tree';

import {
  actionLogger,
} from 'mst-middlewares';

import {
  CommonActions,
} from '@react-navigation/native';

import withStorage from './withStorage';

export default (props = {}, name = 'Application') => (
  types.model(
    name,
    props,
  )
    .actions((self) => ({
      afterCreate() {
        addMiddleware(self, actionLogger);
        onSnapshot(self, console.log.bind(console, `${name} Snapshot:`));
      },
    }))
    .actions((self) => {
      let navigator = false;
      let resolver = false;

      return {
        setNavigator(nav) {
          navigator = nav;
        },

        setRouteResolver(res) {
          resolver = res;
        },
  
        navigate(name, params = {}) {
          if (!navigator) {
            return setImmediate(() => self.navigate(name, params));
          }
  
          return navigator.dispatch(
            CommonActions.navigate({ name, params }),
          );
        },
  
        navigateNext() {
          if (!navigator) {
            return setImmediate(() => self.navigateNext());
          }
  
          return resolver.resolve();
        },
  
        navigateBack() {
          if (!navigator) {
            return setImmediate(() => self.navigateBack());
          }
  
          return navigator.goBack();
        },
      };
    })
    .extend(
      withStorage({
        adapter: withStorage.Adapter.Secure,
        only: [],
        except: [],
      }),
    )
);
