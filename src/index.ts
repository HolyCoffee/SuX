import getObjectsDifferences from './diffEngine';
import {
  WatcherType,
  ListenerType,
  StateInterface,
  WatchersInterface,
  ListenersInterface,
  DispatchersInterface,
} from './types/index';

class CreateStore {
  state: StateInterface = {};
  private watchers: WatchersInterface = {};
  private listeners: ListenersInterface = [];
  private dispatchers: DispatchersInterface = {};

  constructor(dispatchers: DispatchersInterface = {}, initialState: StateInterface = {}) {
    this.state = initialState;
    this.dispatchers = dispatchers;
  }

  dispatch(dispatcher: string, data?: any): void {
    const dispatchFunction = dispatcher && this.dispatchers[dispatcher];

    if (!dispatchFunction) {
      throw new ReferenceError(`${dispatcher} is not defined`);
    }

    const oldState = { ...this.state };
    this.state = dispatchFunction(this.state, data);

    for (const listener of this.listeners) {
      listener(this.state);
    }

    setTimeout(() => {
      this.getDiff(oldState);
    });
  }

  subscribe(listener: ListenerType): () => void {
    this.listeners.push(listener);

    return () => {
      const listenerIndex = this.listeners.indexOf(listener);
      this.listeners.splice(listenerIndex, 1);
    };
  }

  watch(watcher: WatcherType, fields: Array<string> = []): void {
    for (const field of fields) {
      const findedWatcher = this.watchers[field];

      if (findedWatcher) {
        findedWatcher.push(watcher);
      } else {
        this.watchers[field] = [watcher];
      }
    }
  }

  private getDiff(oldState: StateInterface): void {
    const diff = getObjectsDifferences(this.state, oldState);

    for (const field of diff) {
      const watchers = this.watchers[field];

      if (watchers) {
        setTimeout(() => {
          this.notify(watchers);
        });
      }
    }
  }

  private notify(watchers: Array<WatcherType>): void {
    for (const watcher of watchers) {
      watcher(this.state);
    }
  }
}

export default CreateStore;
