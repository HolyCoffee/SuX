import CreateStore from '../src/index';
import { StateInterface } from '../src/types/index';

const store = new CreateStore(
  {
    changeName(state: StateInterface, data: string) {
      return {
        ...state,
        name: data,
      };
    },
  },
  {
    name: 'Ivan',
  }
);

test('store initialization test', () => {
  expect(store.state.name).toEqual('Ivan');
});

test('dispatch chaneName', () => {
  store.dispatch('changeName', 'Petr');
  expect(store.state.name).toEqual('Petr');
});

test('throw exception from dispatcher', () => {
  expect(() => store.dispatch('test')).toThrow(ReferenceError);
});

test('subscribe to state change', () => {
  let currentName = null;
  function listener(state: StateInterface) {
    currentName = state.name;
  }
  store.subscribe(listener);
  store.dispatch('changeName', 'Semen');
  expect(currentName).toEqual('Semen');
});

test('unsubscribe from listener', () => {
  let currentName = null;
  function listener(state: StateInterface) {
    currentName = state.name;
  }
  const unsubscribe = store.subscribe(listener);
  unsubscribe();
  store.dispatch('changeName', 'Semen');
  expect(currentName).toEqual(null);
});

test('set watcher', async () => {
  let currentName: string = '';
  store.watch(
    (state) => {
      currentName = state.name;
    },
    ['name']
  );
  store.dispatch('changeName', 'Vasiliy');
  setTimeout(() => {
    expect(currentName).toEqual('Vasiliy');
  });
});

test('remove watcher', async () => {
  let currentName: string = '';
  const remove = store.watch(
    (state) => {
      currentName = state.name;
    },
    ['name']
  );
  remove();
  store.dispatch('changeName', 'Vasiliy');
  setTimeout(() => {
    expect(currentName).toEqual('');
  });
});
