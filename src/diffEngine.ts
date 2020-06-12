import { StateInterface } from './types/index';

function getObjectsDifferences(object: StateInterface = {}, oldObject: StateInterface = {}): Array<string> {
  let oldFields = oldObject;
  const diffs = [];

  for (const key in object) {
    if (!oldObject.hasOwnProperty(key) || compare(object[key], oldObject[key])) {
      diffs.push(key);
    }
    delete oldFields[key];
  }

  return [...diffs, ...Object.keys(oldFields)];
}

function compare(value: any, oldValue: any): boolean {
  const valueType = Object.prototype.toString.call(value);

  if (valueType !== Object.prototype.toString.call(oldValue)) {
    return true;
  }

  let result = true;

  switch (valueType) {
    case '[object Function]':
      result = value.toString() === oldValue.toString();
      break;
    case '[object Array]':
      result = compareArrays(value, oldValue);
      break;
    case '[object Object]':
      result = compareObjects(value, oldValue);
      break;
    default:
      result = value === oldValue;
      break;
  }

  return !result;
}

function compareObjects(firstObject: StateInterface, secondOnject: StateInterface): boolean {
  if (Object.keys(firstObject).length !== Object.keys(secondOnject).length) {
    return false;
  }

  for (const key in firstObject) {
    if (!secondOnject.hasOwnProperty(key) || compare(firstObject[key], secondOnject[key])) {
      return false;
    }

    return true;
  }
}

function compareArrays(firstArray: Array<any>, secondArray: Array<any>): boolean {
  const length = firstArray.length;

  if (length !== secondArray.length) {
    return false;
  }

  for (let index = 0; index < length; index++) {
    let result = compare(firstArray[index], secondArray[index]);

    if (result) {
      return false;
    }
  }

  return true;
}

export default getObjectsDifferences;
