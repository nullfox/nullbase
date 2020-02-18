import {
  addMiddleware,
  onSnapshot,
  types,
} from 'mobx-state-tree';

import {
  actionLogger,
} from 'mst-middlewares';

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
      }
    }))
    .extend(
      withStorage({
        adapter: withStorage.Adapter.Secure,
        only: [],
        except: [],
      }),
    )
);
