import {
  flow,
  applyPatch,
  onSnapshot,
  getSnapshot,
  getType,
} from 'mobx-state-tree';

import _ from 'lodash';

import Secure from './adapter/secure';

const WithStorage = options => (
  (self) => {
    let disposer;

    let bootstrapped = false;

    const key = _.get(options, 'key', getType(self).name);
    const autoSave = _.get(options, 'autoSave', true);
    const adapter = _.get(options, 'adapter');
    const reviver = _.get(options, 'reviver', val => val);

    if (!adapter) {
      throw new Error('No adapter supplied');
    }

    if (!adapter.load || !adapter.save) {
      throw new Error('The supplied adapter does not have a valid load or save method');
    }

    const filterSnapshotKeys = (snapshot) => {
      // Serenity now
      if (!snapshot) {
        return snapshot;
      }

      // Cast madness
      const only = [].concat(_.get(options, 'only', []));
      const except = [].concat(_.get(options, 'except', []));

      // use the input if there's no filters
      if (only.length === 0 && except.length === 0) {
        return snapshot;
      }

      // Assign to whole snapshot if only is empty
      const result = only.length > 0
        ? _.pick(snapshot, only)
        : snapshot;

      // Omit some things
      return _.omit(result, except);
    };

    const enableSaving = () => {
      // eslint-disable-next-line
      disposer && disposer()
      disposer = onSnapshot(self, snapshot => adapter.save(key, filterSnapshotKeys(snapshot)));
    };

    return {
      actions: {
        hasBootstrapped() {
          return bootstrapped;
        },

        async fetch() {
          return adapter.load(key);
        },

        load: flow(function* load() {
          if (bootstrapped) {
            return self;
          }

          const data = yield adapter.load(key);

          if (data) {
            console.log('Loading data snapshot', data);

            // applySnapshot(self, data);
            const patches = Object.keys(data).map(patchKey => (
              {
                op: 'replace',
                path: `/${patchKey}`,
                value: reviver(data[patchKey]),
              }
            ));

            console.log('Applying patches', patches);

            applyPatch(self, patches);
          }

          applyPatch(
            self,
            [
              {
                op: 'replace',
                path: '/bootstrapped',
                value: true,
              },
            ],
          );

          bootstrapped = true;

          if (autoSave) {
            enableSaving();
          }

          return data;
        }),

        save: flow(function* save() {
          yield adapter.save(key, filterSnapshotKeys(getSnapshot(self)));
        }),

        beforeDetach() {
          // eslint-disable-next-line
          disposer && disposer()
        },
      },
    };
  }
);

WithStorage.Adapter = {
  Secure,
};

export default WithStorage;
