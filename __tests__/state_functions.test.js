import { helloWorld, goodbyeWorld, makeFetchHappen } from '../public/javascripts/modules/testHelpers';

test('helloWorld returns a string with World! at the end of it', () => {
  const stringStart = 'Hello';
  const finalString = helloWorld(stringStart);
  expect(finalString).toEqual('Hello World!');
});

test('goodbyeWorld returns a string with Goodbye in front of it and World! at the end', () => {
  const stringStart = 'cruel';
  const finalString = goodbyeWorld(stringStart);
  expect(finalString).toEqual('Goodbye cruel World!');
});

// test('makeFetchHappen returns Matt Nelsons name', () => {
//   const name = makeFetchHappen();
//   expect(name).toEqual('Matt Nelson');
// })
