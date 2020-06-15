# Fulgrim

Simple state manager for JavaScript apps.

[![npm version](https://img.shields.io/npm/v/fulgrim.svg?style=flat-square)](https://www.npmjs.org/package/fulgrim)
[![install size](https://packagephobia.com/badge?p=fulgrim)](https://packagephobia.com/result?p=fulgrim)
[![npm downloads](https://img.shields.io/npm/dm/fulgrim.svg?style=flat-square)](http://npm-stat.com/charts.html?package=fulgrim)

## Features

- Very simple and small
- Immutable state with watchers

## Installing

Using npm:

```bash
npm install fulgrim
```

## Menu

- [Creating new store](#creating)
- [Getting data from store](#getting)
- [Dispatching](#dispatching)
- [Listeners](#listeners)
- [Watchers](#watcher)

### <a name="creating" id="creating"></a>Creating new store

```javascript
import CreateStore from 'fulgrim';

/**
 * dispatchers - object with dispatchers functions (required)
 * initialState - object width initial state
 */
const store = new CreateStore(dispatchers, initialState);
```

### <a name="getting" id="getting"></a>Getting data from store

```javascript
const someData = store.state.someField;
```

### <a name="dispatching" id="dispatching"></a>Dispatching

Before dispatch data you must be set this dispatcher in object from first argument of "CreateStore" function. Like this.

```javascript
const store = new CreateStore({
  /**
   * state - current state from store
   * data - some data that you pass to the dispatcher call
   */
  someDispathcer: (state, newName) => {
    return {
      ...state,
      name: newName,
    };
  },
});
```

As a return value, dispatcher must return a new version of the state.

You can call the dispatcher in this way

```javascript
/**
 * someDispathcer - dispather name (required)
 * Dan - some data that gets into the dispatcher function as a second argument (required)
 */
store.dispatch('someDispathcer', 'Dan');
```

### <a name="listeners" id="listeners"></a>Listeners

You can subscribe to any change in the state of the store

```javascript
function someListener(state) {
  // some code
}

/**
 * someListener - function that will be called when the state is changed (this function takes the first argument as a modified state object)
 */
const unsubscribe = store.subscribe(someListener);
unsubscribe();
```

Also subscribe function return unsubscribe function. Call it if you want remove listener.

### <a name="watcher" id="watcher"></a>Watchers

You can set the watcher to certain fields in the state

```javascript
function someWatcher(state) {
  // some code
}

/**
 * someWatcher - function that will be called when certain state fields are changed
 * ['someField'] - array of fields from the first level of nesting state (when changing these fields, the function passed by the first argument will be called)
 */
const remove = store.watch(someWatcher, ['someField']);
remove();
```

Also watch function return remove function. Call it if you want remove watcher.

`Note!` In order not to block the execution of the rest of the program, the call of the watchers will be made on the next tick event loop.

TODO:

- Middlewares
- Speeding up the work of watchers
- Integrations with React
