export interface StateInterface {
  [key: string]: any;
}

export interface DispatchersInterface {
  [key: string]: (state: StateInterface, data: any) => StateInterface;
}

export interface WatchersInterface {
  [key: string]: Array<WatcherType>;
}

export type WatcherType = (state: StateInterface) => void;

export interface ListenersInterface extends Array<ListenerType> {}

export type ListenerType = (state: StateInterface) => void;
