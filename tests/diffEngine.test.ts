import getObjectsDifferences from '../src/diffEngine';

test('test with empty objects', () => {
  expect(getObjectsDifferences()).toEqual([]);
});

test('test without difference', () => {
  expect(getObjectsDifferences({ a: 1 }, { a: 1 })).toEqual([]);
});

test('test with difference in same fields', () => {
  expect(getObjectsDifferences({ a: 1 }, { a: 2 })).toEqual(['a']);
});

test('test with difference in various fields', () => {
  expect(getObjectsDifferences({ a: 1 }, { a: 2, b: 1 })).toEqual(['a', 'b']);
});

test('test with difference in various fields 2', () => {
  expect(getObjectsDifferences({ a: 1, b: 2 }, { a: 2 })).toEqual(['a', 'b']);
});

test('test with various types', () => {
  expect(
    getObjectsDifferences(
      { a: 1, b: 'test', c: { c2: 'test' }, d: [1, 2, 3], e: () => {}, f: null, g: undefined },
      {
        a: 2,
        b: 'test2',
        c: { c3: 'test' },
        d: [3, 2, 1],
        e: () => {
          return 'test';
        },
        f: null,
        g: undefined,
      }
    )
  ).toEqual(['a', 'b', 'c', 'd', 'e']);
});

test('test with various types 2', () => {
  expect(
    getObjectsDifferences(
      { a: 1, b: 'test', c: { c2: 'test' }, d: [1, 2, 3], e: () => {}, f: null, g: undefined },
      { a: 1, b: 'test', c: { c2: 'test' }, d: [1, 2, 3], e: () => {}, f: null, g: undefined }
    )
  ).toEqual([]);
});

test('test with nested objects', () => {
  expect(getObjectsDifferences({ a: { a: { a: { a: 1 } } } }, { a: { a: { a: { a: 2 } } } })).toEqual(['a']);
});

test('test with nested objects 2', () => {
  expect(getObjectsDifferences({ a: { a: { a: { a: 1 } } } }, { a: { a: { a: { a: 1 } } } })).toEqual([]);
});

test('test with nested objects 3', () => {
  expect(getObjectsDifferences({ a: { a: 1, b: 1 } }, { a: { a: 1 } })).toEqual(['a']);
});

test('test with nested objects 4', () => {
  expect(getObjectsDifferences({ a: { a: 1 } }, { a: { a: 1, b: 1 } })).toEqual(['a']);
});
